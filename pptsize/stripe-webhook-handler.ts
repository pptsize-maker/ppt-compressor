// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import Stripe from 'npm:stripe@12.0.0'
import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Redis } from 'https://esm.sh/@upstash/redis@1.28.0'

interface FirebaseUser {
  email: string
  vip_end_time?: string
  counts?: number
}

interface PaymentData {
  retrieveId: string      // 用于获取产品信息的 ID (session_id 或 subscription_id)
  orderId: string         // 用于订单表的唯一 ID (session_id 或 invoice_id)
  email: string
  amount: number | null
  currency: string | null
  isRenewal: boolean      // 是否为续费
}

// 初始化 Stripe
const stripe = new Stripe(Deno.env.get('STRIPE_API_KEY') as string, {
  apiVersion: '2024-06-20'
})

const cryptoProvider = Stripe.createSubtleCryptoProvider()

console.log('✅ Stripe Webhook Function booted!')

Deno.serve(async (request) => {
  try {
    const signature = request.headers.get('Stripe-Signature')
    const body = await request.text()

    let event: Stripe.Event
    try {
      event = await stripe.webhooks.constructEventAsync(
        body,
        signature!,
        Deno.env.get('STRIPE_WEBHOOK_SIGNING_SECRET')!,
        undefined,
        cryptoProvider
      )
    } catch (err) {
      console.error('❌ Webhook signature verification failed:', err.message)
      return new Response(err.message, { status: 400 })
    }

    console.log(`📥 Event: ${event.type} (${event.id})`)

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const redis = new Redis({
      url: Deno.env.get('UPSTASH_REDIS_REST_URL')!,
      token: Deno.env.get('UPSTASH_REDIS_REST_TOKEN')!,
    })

    // 提取支付数据
    let paymentData: PaymentData | null = null

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      paymentData = {
        retrieveId: session.id,
        orderId: session.id,
        email: session.customer_email || session.customer_details?.email || '',
        amount: session.amount_total,
        currency: session.currency,
        isRenewal: false
      }
    } else if (event.type === 'invoice.payment_succeeded' || event.type === 'invoice.paid') {
      const invoice = event.data.object as Stripe.Invoice
      const subscriptionId = invoice.subscription as string
      
      if (!subscriptionId) {
        console.log('⏭️  No subscription, skipping')
        return new Response(JSON.stringify({ received: true, skipped: true }), { status: 200 })
      }

      paymentData = {
        retrieveId: subscriptionId,
        orderId: invoice.id,
        email: invoice.customer_email || '',
        amount: invoice.amount_paid,
        currency: invoice.currency,
        isRenewal: true
      }
    }

    if (!paymentData || !paymentData.email) {
      console.log('🔄 Skipped:', event.type)
      return new Response(JSON.stringify({ received: true, skipped: true }), { status: 200 })
    }

    // 使用分布式锁
    const lockKey = `lock:stripe:${event.id}`
    const lockValue = crypto.randomUUID()
    const acquired = await redis.set(lockKey, lockValue, { nx: true, ex: 30 })

    if (!acquired) {
      console.log('⏭️  Lock already held')
      return new Response(JSON.stringify({ received: true, note: 'Processing elsewhere' }), { status: 200 })
    }

    try {
      const result = await processPayment(stripe, supabase, paymentData)
      return new Response(JSON.stringify({ received: true, ...result }), { 
        headers: { 'Content-Type': 'application/json' },
        status: 200 
      })
    } finally {
      await redis.eval(
        `if redis.call("get", KEYS[1]) == ARGV[1] then return redis.call("del", KEYS[1]) else return 0 end`,
        [lockKey],
        [lockValue]
      )
    }

  } catch (error) {
    console.error('❌ Error:', error)
    return new Response(JSON.stringify({ error: error.message }), { 
      headers: { 'Content-Type': 'application/json' },
      status: 500 
    })
  }
})

/**
 * 统一处理支付（首次购买 + 订阅续费）
 */
async function processPayment(
  stripe: Stripe, 
  supabase: SupabaseClient, 
  data: PaymentData
) {
  console.log(`💳 Processing: ${data.isRenewal ? 'Renewal' : 'Purchase'} - ${data.email}`)

  // 🔍 检查订单是否已处理
  const { data: existingOrder } = await supabase
    .from('orders')
    .select('stripe_session_id, status')
    .eq('stripe_session_id', data.orderId)
    .single()

  if (existingOrder?.status === 'paid') {
    console.log('⏭️  Already processed')
    return { processed: false, reason: 'already_paid' }
  }

  // 🔍 获取产品信息
  let productType = 'one-time'
  let counts = 1

  if (data.isRenewal) {
    // 续费：从订阅获取产品信息
    const subscription = await stripe.subscriptions.retrieve(data.retrieveId, {
      expand: ['items.data.price.product']
    })

    const item = subscription.items.data[0]
    if (item.price?.product && typeof item.price.product === 'object') {
      const product = item.price.product as Stripe.Product
      productType = product.metadata?.productType || 'subscribe'
      counts = parseInt(product.metadata?.counts || '30')
      console.log(`📦 Subscription metadata:`, product.metadata)
    }

    if (subscription.metadata && Object.keys(subscription.metadata).length > 0) {
      productType = subscription.metadata.productType || productType
      counts = parseInt(subscription.metadata.counts || counts.toString())
    }
  } else {
    // 首次购买：从 session 获取产品信息
    const session = await stripe.checkout.sessions.retrieve(data.retrieveId, {
      expand: ['line_items', 'line_items.data.price.product']
    })

    const lineItems = session.line_items?.data
    if (!lineItems || lineItems.length === 0) {
      console.error('❌ No line items')
      return { processed: false, error: 'No line items' }
    }

    const item = lineItems[0]
    const quantity = item.quantity || 1

    if (item.price?.product && typeof item.price.product === 'object') {
      const product = item.price.product as Stripe.Product
      productType = product.metadata?.productType || 'one-time'
      counts = parseInt(product.metadata?.counts || '1')
      console.log(`📦 Product metadata:`, product.metadata)
    }

    if (session.metadata && Object.keys(session.metadata).length > 0) {
      productType = session.metadata.productType || productType
      counts = parseInt(session.metadata.counts || counts.toString())
    }

    counts = counts * quantity
  }

  console.log(`📦 Type: ${productType}, Counts: ${counts}`)

  // 🔍 获取用户
  const { data: user, error: userError } = await supabase
    .from('firebase_user')
    .select('*')
    .eq('email', data.email)
    .single()

  if (userError || !user) {
    console.error('❌ User not found:', data.email)
    
    await supabase.from('orders').insert({
      stripe_session_id: data.orderId,
      email: data.email,
      product_type: productType,
      counts: counts,
      currency: data.currency,
      amount: data.amount,
      status: 'failed',
    })
    
    return { processed: false, error: 'User not found' }
  }

  // 🎁 发放福利
  const updates: Partial<FirebaseUser> = {}

  if (productType === 'one-time') {
    updates.counts = (user.counts || 0) + counts
    console.log(`➕ Counts: ${user.counts || 0} → ${updates.counts} (+${counts})`)
  } else if (productType === 'subscribe') {
    const now = new Date()
    const currentEnd = user.vip_end_time ? new Date(user.vip_end_time) : null
    const base = currentEnd && currentEnd > now ? currentEnd : now
    const newEnd = new Date(base)
    newEnd.setDate(newEnd.getDate() + counts)
    
    updates.vip_end_time = newEnd.toISOString()
    console.log(`📅 VIP: +${counts}天 → ${updates.vip_end_time}`)
  } else {
    console.error(`❌ Unknown product_type: ${productType}`)
    return { processed: false, error: `Unknown product_type: ${productType}` }
  }

  // 更新用户
  await supabase.from('firebase_user').update(updates).eq('email', data.email)

  // 📝 创建订单
  await supabase.from('orders').insert({
    stripe_session_id: data.orderId,
    email: data.email,
    product_type: productType,
    counts: counts,
    currency: data.currency,
    amount: data.amount,
    status: 'paid',
    paid_at: new Date().toISOString(),
  })

  console.log(`✅ ${data.isRenewal ? 'Renewal' : 'Payment'} processed`)
  return { 
    processed: true, 
    email: data.email, 
    product_type: productType, 
    counts: counts,
    is_renewal: data.isRenewal
  }
}

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 数据库表结构
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CREATE TABLE orders (
  stripe_session_id text PRIMARY KEY,
  email text NOT NULL,
  product_type text NOT NULL,
  counts int NOT NULL,
  currency text,
  amount bigint,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  paid_at timestamptz,
  CONSTRAINT orders_status_check CHECK (status IN ('pending', 'paid', 'failed'))
);

CREATE INDEX idx_orders_email ON orders(email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 环境变量
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STRIPE_API_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SIGNING_SECRET=whsec_xxxxx
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXXXXxxxxxx
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 Stripe 产品配置
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

在 metadata 中添加：
- productType: one-time 或 subscribe
- counts: 10 (次数或天数)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 部署
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

mkdir -p supabase/functions/stripe-webhook
cp stripe-webhook-handler.ts supabase/functions/stripe-webhook/index.ts
supabase functions deploy stripe-webhook --no-verify-jwt

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔄 工作流程
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

首次购买：
- 事件：checkout.session.completed
- retrieveId = session_id (用于获取产品信息)
- orderId = session_id (用于订单表主键)

订阅续费：
- 事件：invoice.payment_succeeded 或 invoice.paid
- retrieveId = subscription_id (用于获取产品信息)
- orderId = invoice_id (用于订单表主键)

注意：同时监听 invoice.payment_succeeded 和 invoice.paid 以确保不漏单
分布式锁会自动处理重复事件，避免重复发放福利

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 需要在 Stripe Webhook 配置中启用的事件
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- checkout.session.completed (首次购买)
- invoice.payment_succeeded (订阅续费)
- invoice.paid (订阅续费备份)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/
