/**
 * Supabase 配置和初始化
 * 提供 Supabase Authentication 服务
 * 
 * 注意：请替换为你的 Supabase 项目配置
 */

class SupabaseConfig {
    constructor() {
        // Supabase 配置信息 - 根据环境自动选择
        this.supabaseConfig = this._getSupabaseConfig();
        
        this.client = null;
        this.initialized = false;
    }

    /**
     * 根据环境获取 Supabase 配置
     */
    _getSupabaseConfig() {
        // 生产环境配置
        const productionConfig = {
            url: 'https://dpivmhgpibduwtcyueka.supabase.co',
            anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwaXZtaGdwaWJkdXd0Y3l1ZWthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwMjgyMzUsImV4cCI6MjA3NTYwNDIzNX0.QdHOivx7-KvZ1k86i_6c0-Q0k45Zk4XfSEmuVMemV48'
        };

        // 开发/测试环境配置
        const developmentConfig = {
            url: 'https://iqfpuaftdmoiiihsilfx.supabase.co',
            anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxZnB1YWZ0ZG1vaWlpaHNpbGZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxNDcxNDMsImV4cCI6MjA3NTcyMzE0M30.ag7n-KHPb0w1mFCEOs89C9J4c3RBLlv_mocqnYC_JLY'
        };

        // 检查 envConfig 是否已加载
        if (typeof envConfig !== 'undefined' && envConfig.isProduction()) {
            return productionConfig;
        }

        // 默认使用开发配置
        return developmentConfig;
    }

    /**
     * 初始化 Supabase
     */
    async initialize() {
        try {
            // 检查 Supabase SDK 是否已加载
            if (typeof supabase === 'undefined') {
                console.error('Supabase SDK 未加载，请在 HTML 中引入 Supabase SDK');
                return false;
            }

            // 初始化 Supabase Client
            this.client = supabase.createClient(
                this.supabaseConfig.url, 
                this.supabaseConfig.anonKey
            );
            
            // 处理 OAuth 回调（如果有）
            await this._handleOAuthCallback();
            
            this.initialized = true;
            
            if (envConfig && envConfig.isDevelopment()) {
                console.log('✅ Supabase 初始化成功');
            }
            
            return true;
        } catch (error) {
            console.error('❌ Supabase 初始化失败:', error);
            return false;
        }
    }

    /**
     * 处理 OAuth 回调
     * OAuth 登录后，URL 中会包含 access_token 和 refresh_token
     * Supabase SDK 会自动解析这些参数并建立会话
     * 我们需要等待这个过程完成，然后清理 URL
     */
    async _handleOAuthCallback() {
        const hash = window.location.hash;
        
        // 检查 URL 中是否有 OAuth 参数
        if (hash && (hash.includes('access_token') || hash.includes('refresh_token'))) {
            console.log('🔐 检测到 OAuth 回调参数，正在处理...');
            
            return new Promise((resolve) => {
                let resolved = false;
                
                // 监听认证状态变化，等待 OAuth 会话建立
                const { data: { subscription } } = this.client.auth.onAuthStateChange((event, session) => {
                    console.log('🔐 认证事件:', event);
                    
                    if (event === 'SIGNED_IN' && session) {
                        console.log('✅ OAuth 登录成功，用户:', session.user.email);
                        
                        // 清理 URL 中的认证参数
                        const cleanUrl = window.location.pathname + window.location.search;
                        window.history.replaceState({}, document.title, cleanUrl);
                        console.log('✅ URL 已清理');
                        
                        // 取消订阅、清除超时并完成
                        if (!resolved) {
                            resolved = true;
                            clearTimeout(timeoutId);
                            subscription.unsubscribe();
                            resolve(true);
                        }
                    } else if (event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION') {
                        // 这些事件也表示会话已建立
                        if (session) {
                            console.log('✅ OAuth 会话已建立');
                            const cleanUrl = window.location.pathname + window.location.search;
                            window.history.replaceState({}, document.title, cleanUrl);
                            
                            if (!resolved) {
                                resolved = true;
                                clearTimeout(timeoutId);
                                subscription.unsubscribe();
                                resolve(true);
                            }
                        }
                    }
                });
                
                // 设置超时，防止无限等待
                const timeoutId = setTimeout(() => {
                    if (!resolved) {
                        resolved = true;
                        console.warn('⚠️ OAuth 回调处理超时');
                        subscription.unsubscribe();
                        resolve(false);
                    }
                }, 5000);
            });
        }
        
        return Promise.resolve(true);
    }

    /**
     * 检测当前页面语言代码
     */
    _detectLanguage() {
        const path = window.location.pathname;
        if (path === '/' || path.startsWith('/index')) {
            return 'zh';
        }
        const match = path.match(/^\/([a-z]{2})\//);
        return match ? match[1] : 'zh';
    }

    /**
     * 获取 Auth 实例（兼容性方法）
     */
    getAuth() {
        if (!this.initialized) {
            console.warn('Supabase 未初始化，请先调用 initialize()');
            return null;
        }
        return this.client.auth;
    }

    /**
     * 获取当前用户（异步）
     */
    async getCurrentUser() {
        if (!this.client) return null;
        
        try {
            // Supabase 的 getUser() 是异步的，会验证 token
            const { data: { user }, error } = await this.client.auth.getUser();
            
            if (error) {
                console.error('获取用户失败:', error);
                return null;
            }
            
            return user;
        } catch (error) {
            console.error('获取用户异常:', error);
            return null;
        }
    }

    /**
     * 获取用户 ID Token
     */
    async getUserToken() {
        if (!this.client) return null;
        
        try {
            const { data: { session } } = await this.client.auth.getSession();
            return session?.access_token || null;
        } catch (error) {
            console.error('获取用户 Token 失败:', error);
            return null;
        }
    }

    /**
     * 监听认证状态变化
     */
    onAuthStateChanged(callback) {
        if (!this.client) {
            console.warn('Supabase Auth 未初始化');
            return () => {};
        }
        
        // Supabase 的认证状态监听
        const { data: authListener } = this.client.auth.onAuthStateChange((event, session) => {
            const user = session?.user || null;
            
            // 转换为类似 Firebase 的用户对象格式
            if (user) {
                const formattedUser = {
                    uid: user.id,
                    email: user.email,
                    displayName: user.user_metadata?.display_name || 
                                 user.user_metadata?.full_name || 
                                 user.email?.split('@')[0],
                    photoURL: user.user_metadata?.avatar_url || 
                             user.user_metadata?.picture || null,
                    emailVerified: user.email_confirmed_at !== null
                };
                callback(formattedUser);
            } else {
                callback(null);
            }
        });

        // 返回取消订阅的函数
        return () => {
            authListener?.subscription?.unsubscribe();
        };
    }

    /**
     * 邮箱密码注册
     */
    async signUpWithEmail(email, password) {
        try {
            const { data, error } = await this.client.auth.signUp({
                email,
                password
            });

            if (error) throw error;

            // 转换为统一格式
            return {
                success: true,
                user: {
                    uid: data.user.id,
                    email: data.user.email,
                    displayName: email.split('@')[0],
                    photoURL: null,
                    emailVerified: data.user.email_confirmed_at !== null
                }
            };
        } catch (error) {
            return { success: false, error: this._handleAuthError(error) };
        }
    }

    /**
     * 邮箱密码登录
     */
    async signInWithEmail(email, password) {
        try {
            const { data, error } = await this.client.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            return {
                success: true,
                user: {
                    uid: data.user.id,
                    email: data.user.email,
                    displayName: data.user.user_metadata?.display_name || 
                                 data.user.user_metadata?.full_name ||
                                 email.split('@')[0],
                    photoURL: data.user.user_metadata?.avatar_url || 
                             data.user.user_metadata?.picture || null,
                    emailVerified: data.user.email_confirmed_at !== null
                }
            };
        } catch (error) {
            return { success: false, error: this._handleAuthError(error) };
        }
    }

    /**
     * Google 登录
     */
    async signInWithGoogle() {
        try {
            // 获取当前页面的 URL，确保使用正确的协议
            const currentUrl = window.location.href;
            
            const { data, error } = await this.client.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: currentUrl
                }
            });

            if (error) throw error;

            // OAuth 登录会重定向，所以这里返回 pending 状态
            return { success: true, pending: true };
        } catch (error) {
            // 检查是否是用户取消操作
            const isCancelled = error.message?.includes('popup') || 
                              error.message?.includes('cancel');
            
            return { 
                success: false, 
                error: this._handleAuthError(error),
                cancelled: isCancelled 
            };
        }
    }

    /**
     * Microsoft 登录
     */
    async signInWithMicrosoft() {
        try {
            // 获取当前页面的 URL，确保使用正确的协议
            const currentUrl = window.location.href;
            
            const { data, error } = await this.client.auth.signInWithOAuth({
                provider: 'azure',  // Supabase 使用 'azure' 作为 Microsoft 的 provider
                options: {
                    redirectTo: currentUrl,
                    scopes: 'email'
                }
            });

            if (error) throw error;

            // OAuth 登录会重定向，所以这里返回 pending 状态
            return { success: true, pending: true };
        } catch (error) {
            // 检查是否是用户取消操作
            const isCancelled = error.message?.includes('popup') || 
                              error.message?.includes('cancel');
            
            return { 
                success: false, 
                error: this._handleAuthError(error),
                cancelled: isCancelled 
            };
        }
    }

    /**
     * 发送密码重置邮件
     */
    async sendPasswordResetEmail(email) {
        try {
            // 构建重置密码的重定向 URL
            const protocol = window.location.protocol;
            const host = window.location.host;
            const resetUrl = `${protocol}//${host}/reset-password.html`;
            
            const { error } = await this.client.auth.resetPasswordForEmail(email, {
                redirectTo: resetUrl
            });

            if (error) throw error;

            return { success: true };
        } catch (error) {
            return { success: false, error: this._handleAuthError(error) };
        }
    }

    /**
     * 发送邮箱验证（兼容性方法）
     */
    async sendEmailVerification() {
        try {
            const { data: { user } } = await this.client.auth.getUser();
            
            if (!user) {
                return { success: false, error: '用户未登录' };
            }

            // Supabase 会在注册时自动发送验证邮件
            // 这里可以重新发送
            const { error } = await this.client.auth.resend({
                type: 'signup',
                email: user.email
            });

            if (error) throw error;

            return { success: true };
        } catch (error) {
            return { success: false, error: this._handleAuthError(error) };
        }
    }

    /**
     * 登出
     */
    async signOut() {
        try {
            const { error } = await this.client.auth.signOut();

            if (error) throw error;

            // 清除本地存储
            if (typeof request !== 'undefined') {
                request.setToken(null);
            }
            localStorage.removeItem('userData');
            
            return { success: true };
        } catch (error) {
            console.error('登出失败:', error);
            return { success: false, error: this._handleAuthError(error) };
        }
    }

    /**
     * 更新用户资料（兼容性方法）
     */
    async updateProfile(displayName, photoURL) {
        try {
            const updates = {};
            
            if (displayName) {
                updates.display_name = displayName;
            }
            
            if (photoURL) {
                updates.avatar_url = photoURL;
            }

            const { error } = await this.client.auth.updateUser({
                data: updates
            });

            if (error) throw error;

            return { success: true };
        } catch (error) {
            return { success: false, error: this._handleAuthError(error) };
        }
    }

    /**
     * 处理 Supabase 认证错误
     */
    _handleAuthError(error) {
        const errorMessages = {
            'Invalid login credentials': {
                zh: '邮箱或密码错误',
                en: 'Invalid email or password',
                hi: 'अमान्य ईमेल या पासवर्ड',
                ja: 'メールアドレスまたはパスワードが無効です',
                ko: '잘못된 이메일 또는 비밀번호'
            },
            'Email not confirmed': {
                zh: '邮箱未验证',
                en: 'Email not confirmed',
                hi: 'ईमेल की पुष्टि नहीं हुई',
                ja: 'メールが確認されていません',
                ko: '이메일이 확인되지 않았습니다'
            },
            'User already registered': {
                zh: '该邮箱已被注册',
                en: 'Email already registered',
                hi: 'ईमेल पहले से पंजीकृत है',
                ja: 'メールアドレスは既に登録されています',
                ko: '이메일이 이미 등록되었습니다'
            },
            'Password should be at least 6 characters': {
                zh: '密码至少需要6个字符',
                en: 'Password must be at least 6 characters',
                hi: 'पासवर्ड कम से कम 6 वर्ण होना चाहिए',
                ja: 'パスワードは少なくとも6文字である必要があります',
                ko: '비밀번호는 최소 6자 이상이어야 합니다'
            },
            'Invalid email': {
                zh: '邮箱格式不正确',
                en: 'Invalid email format',
                hi: 'अमान्य ईमेल प्रारूप',
                ja: '無効なメール形式',
                ko: '잘못된 이메일 형식'
            },
            'Email rate limit exceeded': {
                zh: '请求过于频繁，请稍后再试',
                en: 'Too many requests, please try again later',
                hi: 'बहुत सारे अनुरोध, कृपया बाद में पुन: प्रयास करें',
                ja: 'リクエストが多すぎます。後でもう一度お試しください',
                ko: '너무 많은 요청이 있습니다. 나중에 다시 시도하십시오'
            },
            'Network request failed': {
                zh: '网络连接失败',
                en: 'Network connection failed',
                hi: 'नेटवर्क कनेक्शन विफल',
                ja: 'ネットワーク接続に失敗しました',
                ko: '네트워크 연결 실패'
            }
        };

        const lang = this._detectLanguage();
        const errorMessage = error.message || error.error_description || '';
        
        // 尝试匹配错误消息
        for (const [key, translations] of Object.entries(errorMessages)) {
            if (errorMessage.includes(key)) {
                return translations[lang] || translations['en'];
            }
        }

        return errorMessage || '发生未知错误';
    }
}

// 创建全局单例
const supabaseConfig = new SupabaseConfig();

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SupabaseConfig, supabaseConfig };
}

