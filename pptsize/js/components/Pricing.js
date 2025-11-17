/**
 * 定价页面组件
 * 显示定价方案和功能对比
 */

export class Pricing {
    constructor(containerId, lang, navbar) {
        this.container = document.getElementById(containerId);
        this.lang = lang || {};
        this.navbar = navbar; // 用于访问认证状态和触发登录弹框
    }

    /**
     * 获取翻译文本
     */
    t(key) {
        const keys = key.split('.');
        let value = this.lang;
        for (const k of keys) {
            value = value?.[k];
            if (value === undefined) return key;
        }
        return value || key;
    }

    /**
     * 渲染组件
     */
    async render() {
        if (!this.container) {
            console.error('容器元素不存在');
            return;
        }

        this.container.innerHTML = this._renderContent();
        this._attachEvents();
    }

    /**
     * 渲染内容
     */
    _renderContent() {
        return `
            <div class="pricing-page">
                <!-- 头部 -->
                <div class="pricing-header">
                    <h1 class="pricing-title">${this.t('pricing.title')}</h1>
                    <p class="pricing-subtitle">${this.t('pricing.subtitle')}</p>
                </div>

                <!-- 定价卡片 -->
                <div class="pricing-cards">
                    ${this._renderPricingCard('payPerUse', 0)}
                    ${this._renderPricingCard('weekly', 1)}
                    ${this._renderPricingCard('yearly', 2)}
                </div>

                <!-- 功能对比表 -->
                <div class="comparison-section">
                    <h2 class="comparison-title">${this.t('pricing.comparisonTable.title')}</h2>
                    ${this._renderComparisonTable()}
                </div>

                <!-- FAQ -->
                <div class="faq-section">
                    <h2 class="faq-title">${this.t('pricing.faq.title')}</h2>
                    <div class="faq-list">
                        ${this._renderFAQ()}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 渲染定价卡片
     */
    _renderPricingCard(planKey, index) {
        const plan = this.t(`pricing.plans.${planKey}`);
        const isPopular = planKey === 'weekly';
        const isBestValue = planKey === 'yearly';

        return `
            <div class="pricing-card ${isPopular ? 'popular' : ''} ${isBestValue ? 'best-value' : ''}" data-plan="${planKey}">
                ${isPopular ? `<div class="badge badge-popular">${this.t('pricing.mostPopular')}</div>` : ''}
                ${isBestValue ? `<div class="badge badge-value">${this.t('pricing.bestValue')}</div>` : ''}
                
                <div class="plan-header">
                    <h3 class="plan-name">${plan.name}</h3>
                    <div class="plan-price">
                        <span class="price">${plan.price}</span>
                        <span class="price-unit">${plan.priceUnit}</span>
                    </div>
                    <p class="plan-description">${plan.description}</p>
                </div>

                <div class="plan-features">
                    <h4 class="features-title">${this.t('pricing.features')}</h4>
                    <ul class="features-list">
                        ${plan.features.map(feature => `
                            <li class="feature-item">
                                <svg class="feature-icon" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                </svg>
                                <span>${feature}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                ${plan.savings ? `<div class="plan-savings">${plan.savings}</div>` : ''}

                <button class="btn-select-plan" data-plan="${planKey}">
                    ${this.t('pricing.selectPlan')}
                </button>
            </div>
        `;
    }

    /**
     * 渲染功能对比表
     */
    _renderComparisonTable() {
        const features = this.t('pricing.comparisonTable.features');
        const note = this.t('pricing.comparisonTable.note');
        
        return `
            <div class="comparison-table">
                <div class="comparison-row comparison-header">
                    <div class="comparison-cell"></div>
                    <div class="comparison-cell">${this.t('pricing.comparisonTable.free')}</div>
                    <div class="comparison-cell highlight">${this.t('pricing.comparisonTable.premium')}</div>
                </div>
                
                <div class="comparison-row">
                    <div class="comparison-cell feature-name">${features.fileSize}</div>
                    <div class="comparison-cell">${features.fileSizeFree}</div>
                    <div class="comparison-cell highlight">${features.fileSizePremium}</div>
                </div>
                
                <div class="comparison-row">
                    <div class="comparison-cell feature-name">${features.taskStorage}</div>
                    <div class="comparison-cell">${features.taskStorageFree}</div>
                    <div class="comparison-cell highlight">${features.taskStoragePremium}</div>
                </div>
                
                <div class="comparison-row">
                    <div class="comparison-cell feature-name">${features.channel}</div>
                    <div class="comparison-cell">${features.channelFree}</div>
                    <div class="comparison-cell highlight">${features.channelPremium}</div>
                </div>
                
                <div class="comparison-row">
                    <div class="comparison-cell feature-name">${features.speed}</div>
                    <div class="comparison-cell">${features.speedFree}</div>
                    <div class="comparison-cell highlight">${features.speedPremium}</div>
                </div>
                
                <div class="comparison-row">
                    <div class="comparison-cell feature-name">${features.support}</div>
                    <div class="comparison-cell">${features.supportFree}</div>
                    <div class="comparison-cell highlight">${features.supportPremium}</div>
                </div>
            </div>
            ${note ? `<div class="comparison-note">${note}</div>` : ''}
        `;
    }

    /**
     * 渲染 FAQ
     */
    _renderFAQ() {
        const questions = this.t('pricing.faq.questions');
        
        return questions.map((item, index) => `
            <div class="faq-item">
                <div class="faq-question">
                    <h3>${item.q}</h3>
                    <svg class="faq-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                </div>
                <div class="faq-answer">
                    <p>${item.a}</p>
                </div>
            </div>
        `).join('');
    }

    /**
     * 绑定事件
     */
    _attachEvents() {
        // 选择方案按钮
        const selectButtons = this.container.querySelectorAll('.btn-select-plan');
        selectButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const plan = e.target.getAttribute('data-plan');
                this._handleSelectPlan(plan);
            });
        });

        // FAQ 折叠展开
        const faqItems = this.container.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });
    }

    /**
     * 处理选择方案
     */
    _handleSelectPlan(plan) {
        console.log('选择的方案:', plan);
        
        // 检查用户是否登录
        const isLoggedIn = this.navbar && this.navbar.authInstance && this.navbar.authInstance.currentUser;
        
        if (!isLoggedIn) {
            // 未登录，显示登录弹框
            if (this.navbar && this.navbar.authInstance) {
                this.navbar.authInstance.showLoginModal();
            } else {
                alert(this.t('pricing.loginRequired'));
            }
            return;
        }

        // 已登录：跳转到对应的 Stripe Payment Link，并拼接 locked_prefilled_email
        const userEmail = this.navbar.currentUser?.email || '';
        const links = window.ENV?.getStripePaymentLinks?.() || window.ENV?.getConfig?.().stripePaymentLinks || {};
        const lang = window.i18n.getCurrentLangCode();
        let target = '';
        if (plan === 'payPerUse') {
            target = links.oneTime;
        } else if (plan === 'weekly') {
            target = links.weekly;
        } else if (plan === 'yearly') {
            target = links.yearly;
        }

        if (!target) {
            console.error('未配置对应的支付链接:', plan, links);
            alert('支付链接未配置，请稍后重试');
            return;
        }

        const url = new URL(target);
        if (userEmail) {
            url.searchParams.set('locked_prefilled_email', userEmail);
        }
        if(lang){
            url.searchParams.set('locale', lang);
        }
        window.location.href = url.toString();
    }
}

