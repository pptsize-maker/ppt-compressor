/**
 * 导航栏组件
 * 支持多语言、用户登录状态、语言切换
 */
class Navbar {
    constructor(options = {}) {
        this.container = options.container || document.body;
        this.lang = options.lang || {}; // 语言对象
        // 从 i18n 获取当前语言代码（统一管理）
        this.currentLang = (typeof window.i18n !== 'undefined') ? window.i18n.getCurrentLangCode() : 'zh';
        // 认证相关
        this.authInstance = null;
        this.currentUser = null;
        this.authUnsubscribe = null; // 用于取消认证监听，防止重复
        // 事件处理器引用
        this._userInfoBtnHandler = null;
        this._logoutBtnHandler = null;
        this._userDropdownClickOutsideAttached = false;
        // 防止重复获取用户数据
        this._fetchingUserData = false;
        // 🔥 标记认证是否已初始化（避免初始化时触发状态变化事件）
        this._authInitialized = false;
    }

    /**
     * 初始化 Navbar（在渲染之前调用）
     * 优先初始化用户认证状态
     */
    async init() {
        console.log('🚀 Navbar 开始初始化...');
        
        // 1. 首先初始化 Supabase（如果还没有初始化）
        if (typeof supabaseConfig !== 'undefined' && !supabaseConfig.initialized) {
            console.log('  ⏳ 正在初始化 Supabase...');
            await supabaseConfig.initialize();
            console.log('  ✅ Supabase 初始化完成');
        }
        
        // 2. 初始化认证监听
        console.log('  ⏳ 正在初始化用户认证...');
        this._initAuth();
        
        console.log('  ✅ 用户认证初始化完成');
        console.log('✅ Navbar 初始化完成');
        
        return this;
    }

    /**
     * 渲染导航栏
     */
    render() {
        const navHTML = `
            <!-- 移动端菜单遮罩层 -->
            <div class="mobile-menu-overlay" id="mobileMenuOverlay"></div>
            
            <nav class="navbar" id="navbar">
                <div class="container">
                    <div class="logo">
                        <a href="${this.currentLang === 'zh' ? '/' : '/' + this.currentLang + '/'}">
                            <img src="${this.currentLang === 'zh' ? '/logo.png' : '../logo.png'}" alt="pptsize" class="logo-image">
                            <span class="logo-text">ppt<strong>size</strong></span>
                        </a>
                    </div>
                    
                    <div class="nav-menu" id="navMenu">
                        <!-- 导航链接 -->
                        <div class="nav-links">
                            <a href="/pricing.html" class="nav-link">
                                ${this.lang.auth?.pricing || '定价'}
                            </a>
                        </div>
                        
                        <!-- 用户认证按钮 -->
                        <div class="auth-section" id="authSection">
                            <button class="auth-login-btn" id="loginBtn">
                                ${this.lang.auth?.login || '登录'}
                            </button>
                        </div>
                        
                        <div class="lang-switcher">
                            <button class="lang-btn" id="currentLang">
                                ${this._getLangIcon(this.currentLang)} ${this._getLangName(this.currentLang)}
                                <span class="dropdown-icon">▼</span>
                            </button>
                            <div class="lang-dropdown" id="langDropdown">
                                <a href="/" class="lang-option" data-lang="zh">
                                    <span class="flag">🇨🇳</span> 简体中文
                                </a>
                                <a href="/en/" class="lang-option" data-lang="en">
                                    <span class="flag">🇺🇸</span> English
                                </a>
                                <a href="/hi/" class="lang-option" data-lang="hi">
                                    <span class="flag">🇮🇳</span> हिंदी
                                </a>
                                <a href="/ja/" class="lang-option" data-lang="ja">
                                    <span class="flag">🇯🇵</span> 日本語
                                </a>
                                <a href="/ko/" class="lang-option" data-lang="ko">
                                    <span class="flag">🇰🇷</span> 한국어
                                </a>
                                <a href="/de/" class="lang-option" data-lang="de">
                                    <span class="flag">🇩🇪</span> Deutsch
                                </a>
                                <a href="/fr/" class="lang-option" data-lang="fr">
                                    <span class="flag">🇫🇷</span> Français
                                </a>
                                <a href="/es/" class="lang-option" data-lang="es">
                                    <span class="flag">🇪🇸</span> Español
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 移动端菜单按钮 -->
                    <button class="mobile-menu-btn" id="mobileMenuBtn">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>
        `;

        // 插入到容器
        if (this.container === document.body) {
            this.container.insertAdjacentHTML('afterbegin', navHTML);
        } else {
            this.container.innerHTML = navHTML;
        }

        this._attachEventListeners();
        this._initScrollEffect();
        
        // 如果在 render 之前没有调用 init，则在这里初始化认证
        // 这是为了兼容性，但推荐使用 init() -> render() 的流程
        if (!this.authInstance) {
            this._initAuth();
        }
        
        // 更新认证 UI（如果已经有用户登录）
        if (this.currentUser) {
            this._updateAuthUI();
        }
    }


    /**
     * 绑定事件监听器
     */
    _attachEventListeners() {
        // 语言切换器
        const langBtn = document.getElementById('currentLang');
        const langDropdown = document.getElementById('langDropdown');
        
        if (langBtn && langDropdown) {
            langBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                langDropdown.classList.toggle('show');
            });

            // 点击外部关闭下拉菜单
            document.addEventListener('click', () => {
                langDropdown.classList.remove('show');
            });
        }

        // 移动端菜单
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        
        if (mobileMenuBtn && navMenu && mobileMenuOverlay) {
            // 切换菜单
            mobileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // 阻止事件冒泡
                const isActive = navMenu.classList.contains('active');
                
                if (isActive) {
                    this._closeMobileMenu();
                } else {
                    this._openMobileMenu();
                }
            });
            
            // 点击遮罩层关闭菜单
            mobileMenuOverlay.addEventListener('click', () => {
                this._closeMobileMenu();
            });
            
            // 点击菜单内部不关闭菜单
            navMenu.addEventListener('click', (e) => {
                e.stopPropagation();
            });
            
            // 点击页面其他区域关闭菜单（仅在菜单打开时）
            document.addEventListener('click', (e) => {
                if (navMenu.classList.contains('active')) {
                    // 检查点击是否在菜单或按钮外部
                    if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                        this._closeMobileMenu();
                    }
                }
            });
        }

        // 登录按钮
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                if (this.authInstance) {
                    this.authInstance.showLoginModal();
                }
            });
        }

        // 登出按钮（动态添加）- 使用事件委托
        document.addEventListener('click', (e) => {
            // 使用 closest 方法确保点击按钮内任何元素都能触发
            const logoutBtn = e.target.closest('#logoutBtn');
            if (logoutBtn) {
                console.log('🔵 检测到退出按钮点击');
                e.preventDefault();
                e.stopPropagation();
                this._handleLogout();
            }
        });
    }

    /**
     * 打开移动端菜单
     */
    _openMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        
        if (mobileMenuBtn && navMenu && mobileMenuOverlay) {
            mobileMenuBtn.classList.add('active');
            navMenu.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            
            // 禁止页面滚动
            document.body.style.overflow = 'hidden';
        }
    }
    
    /**
     * 关闭移动端菜单
     */
    _closeMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        
        if (mobileMenuBtn && navMenu && mobileMenuOverlay) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            
            // 恢复页面滚动
            document.body.style.overflow = '';
        }
    }

    /**
     * 初始化滚动效果
     */
    _initScrollEffect() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }


    /**
     * 获取语言图标（使用 i18n 统一方法）
     */
    _getLangIcon(lang) {
        return (typeof window.i18n !== 'undefined') ? window.i18n.getLangFlag(lang) : '🌐';
    }

    /**
     * 获取语言名称（使用 i18n 统一方法）
     */
    _getLangName(lang) {
        return (typeof window.i18n !== 'undefined') ? window.i18n.getLangName(lang) : 'Language';
    }

    /**
     * 获取本地化路径
     * 中文（默认）：/ + path
     * 其他语言：/lang/ + path
     */
    _getLocalePath(path) {
        if (this.currentLang === 'zh') {
            return '/' + path;
        }
        return '/' + this.currentLang + '/' + path;
    }

    /**
     * 初始化认证
     */
    _initAuth() {
        // 如果已经初始化过，不要重复初始化
        if (this.authInstance) {
            console.log('⚠️ Auth 已经初始化，跳过重复初始化');
            return;
        }
        
        // 创建 Auth 实例
        if (typeof Auth !== 'undefined') {
            this.authInstance = new Auth({
                lang: this.lang,
                onAuthChange: (user) => this._onAuthChange(user)
            });
        }
    }

    /**
     * 认证状态变化回调
     */
    _onAuthChange(user) {
        // 判断用户状态是否真的发生了变化
        const userChanged = this._hasUserChanged(user);
        
        if (!userChanged) {
            return;
        }
        
        // 🔥 检查是否为初始化阶段
        const isInitializing = !this._authInitialized;
        if (isInitializing) {
            console.log('🔵 认证初始化：检测到用户状态，但不触发变化事件');
            this._authInitialized = true; // 标记初始化完成
            this.currentUser = user;
            this._updateAuthUI(); // 只更新UI，不触发事件
            
            // 如果已登录，静默获取用户数据
            if (user && !this._fetchingUserData) {
                this._fetchUserData().then(() => {
                    this._updateAuthUI();
                });
            }
            return; // 初始化阶段不触发事件
        }
        
        // 🔥 真正的状态变化（非初始化）
        console.log('🔔 检测到真正的认证状态变化');
        this.currentUser = user;
        
        // 立即更新 UI（显示 Supabase 的用户信息：头像、名字）
        this._updateAuthUI();
        
        // 如果用户已登录，异步获取用户数据（VIP、次数）
        if (user) {
            // 防止重复获取用户数据
            if (this._fetchingUserData) {
                return;
            }
            
            this._fetchUserData().then(() => {
                // 数据获取成功后，再次更新 UI（更新 VIP 和次数信息）
                this._updateAuthUI();
                
                // 🔥 触发全局认证状态变化事件（用户登录）
                console.log('🔔 触发用户登录事件');
                window.dispatchEvent(new CustomEvent('userAuthChanged', { 
                    detail: { user, isLogin: true }
                }));
            });
        } else {
            // 用户退出登录，清除用户数据缓存
            localStorage.removeItem('userData');
            this._fetchingUserData = false;
            
            // 🔥 触发全局认证状态变化事件（用户登出）
            console.log('🔔 触发用户登出事件');
            window.dispatchEvent(new CustomEvent('userAuthChanged', { 
                detail: { user: null, isLogin: false }
            }));
        }
    }

    /**
     * 检查用户状态是否发生变化
     */
    _hasUserChanged(newUser) {
        // 情况1：从无到有（登录）
        if (!this.currentUser && newUser) {
            return true;
        }
        
        // 情况2：从有到无（登出）
        if (this.currentUser && !newUser) {
            return true;
        }
        
        // 情况3：用户 ID 改变（切换账号）
        if (this.currentUser && newUser && this.currentUser.uid !== newUser.uid) {
            return true;
        }
        
        // 其他情况：用户状态未变化
        return false;
    }

    /**
     * 更新认证 UI
     */
    _updateAuthUI() {
        const authSection = document.getElementById('authSection');
        if (!authSection) return;

        if (this.currentUser) {
            // 已登录：显示用户下拉菜单
            const displayName = this.currentUser.displayName || this.currentUser.email?.split('@')[0] || 'User';
            const photoURL = this.currentUser.photoURL || '';
            
            // 获取用户数据
            const userData = this._getUserData();
            
            // 检查是否已经渲染过用户信息（避免重复渲染导致下拉菜单闪烁）
            const existingDropdown = authSection.querySelector('.user-dropdown-wrapper');
            
            if (existingDropdown) {
                // 已经渲染过，只更新用户数据部分（次数和VIP状态）
                this._updateUserDataOnly(userData);
            } else {
                // 首次渲染，完整渲染用户信息
                this._renderUserDropdown(displayName, photoURL, userData);
            }
        } else {
            // 未登录：显示登录按钮
            authSection.innerHTML = `
                <button class="auth-login-btn" id="loginBtn">
                    ${this.lang.auth?.login || '登录'}
                </button>
            `;
            
            // 重新绑定登录按钮事件
            const loginBtn = document.getElementById('loginBtn');
            if (loginBtn) {
                loginBtn.addEventListener('click', () => {
                    if (this.authInstance) {
                        this.authInstance.showLoginModal();
                    }
                });
            }
        }
    }

    /**
     * 渲染用户下拉菜单（完整渲染）
     */
    _renderUserDropdown(displayName, photoURL, userData) {
        const authSection = document.getElementById('authSection');
        if (!authSection) return;

        authSection.innerHTML = `
            <div class="user-dropdown-wrapper">
                <button class="user-info-btn" id="userInfoBtn">
                    ${photoURL ? `<img src="${photoURL}" alt="Avatar" class="user-avatar">` : 
                      `<div class="user-avatar-placeholder">${displayName.charAt(0).toUpperCase()}</div>`}
                    <span class="user-name">${displayName}</span>
                    <span class="dropdown-icon">▼</span>
                </button>
                <div class="user-dropdown" id="userDropdown">
                    <div class="user-dropdown-header">
                        <div class="user-dropdown-name">${displayName}</div>
                        <div class="user-dropdown-email">${this.currentUser.email || ''}</div>
                    </div>
                    <div class="user-dropdown-divider"></div>
                    <div class="user-dropdown-item">
                        <span class="user-dropdown-label">${this.lang.auth?.usageCount || '使用次数'}:</span>
                        <span class="user-dropdown-value" id="userUsageCount">${userData.usageCount} ${this.lang.auth?.times || '次'}</span>
                    </div>
                    <div class="user-dropdown-item">
                        <span class="user-dropdown-label">${this.lang.auth?.myAccount || '账户类型'}:</span>
                        <span class="user-dropdown-value ${userData.isPremium ? 'premium' : 'free'}" id="userAccountType">
                            ${userData.isPremium ? (this.lang.auth?.premiumUser || '付费用户') : (this.lang.auth?.freeUser || '免费用户')}
                        </span>
                    </div>
                    <a href="/works.html" class="user-dropdown-item user-dropdown-item-clickable">
                        <span class="user-dropdown-label">${this.lang.auth?.myWorks || '我的任务'}:</span>
                        <span class="user-dropdown-value" id="userWorksCount">${userData.worksCount || 0} ${this.lang.auth?.tasks || '个'}</span>
                    </a>
                    ${userData.isPremium ? `
                    <div class="user-dropdown-divider"></div>
                    <button class="user-dropdown-item user-dropdown-item-clickable" id="manageSubscriptionBtn">
                        <span class="user-dropdown-label">${this.lang.auth?.manageSubscription || '管理订阅'}</span>
                        <svg class="user-dropdown-icon-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    ` : ''}
                    <div class="user-dropdown-divider"></div>
                    <button class="user-dropdown-logout" id="logoutBtn">
                        ${this.lang.auth?.logout || '退出'}
                    </button>
                </div>
            </div>
        `;

        // 绑定用户下拉菜单事件
        this._attachUserDropdownEvents();
        
        // 直接绑定退出按钮事件
        this._attachLogoutButtonEvent();
        
        // 绑定管理订阅按钮事件
        this._attachManageSubscriptionEvent();
    }

    /**
     * 只更新用户数据部分（次数和VIP状态）
     */
    _updateUserDataOnly(userData) {
        // 更新使用次数
        const usageCountEl = document.getElementById('userUsageCount');
        if (usageCountEl) {
            usageCountEl.textContent = `${userData.usageCount} ${this.lang.auth?.times || '次'}`;
        }

        // 更新账户类型
        const accountTypeEl = document.getElementById('userAccountType');
        if (accountTypeEl) {
            accountTypeEl.className = `user-dropdown-value ${userData.isPremium ? 'premium' : 'free'}`;
            accountTypeEl.textContent = userData.isPremium ? 
                (this.lang.auth?.premiumUser || '付费用户') : 
                (this.lang.auth?.freeUser || '免费用户');
        }
        
        // 更新任务次数
        const worksCountEl = document.getElementById('userWorksCount');
        if (worksCountEl) {
            worksCountEl.textContent = `${userData.worksCount || 0} ${this.lang.auth?.tasks || '个'}`;
        }
    }

    /**
     * 从后端获取用户数据
     */
    async _fetchUserData() {
        if (typeof userAPI === 'undefined') {
            console.warn('userAPI 未加载');
            return;
        }

        // 设置标志位，防止重复请求
        if (this._fetchingUserData) {
            return;
        }

        this._fetchingUserData = true;

        try {
            const result = await userAPI.getUserInfo();
            
            if (result.success) {
                // 解析用户数据
                const userData = userAPI.parseUserData(result.data);
                
                // 保存到 localStorage 作为缓存
                localStorage.setItem('userData', JSON.stringify(userData));
                
                // 更新 Request 的 VIP 状态
                request.updateVipStatus(userData.isPremium, userData.usageCount);
            } else {
                console.error('获取用户数据失败:', result.error);
            }
        } catch (error) {
            console.error('获取用户数据异常:', error);
        } finally {
            // 请求完成，清除标志位
            this._fetchingUserData = false;
        }
    }

    /**
     * 获取用户数据（从缓存）
     */
    _getUserData() {
        // 从 localStorage 获取缓存数据
        const cachedData = localStorage.getItem('userData');
        if (cachedData) {
            try {
                return JSON.parse(cachedData);
            } catch (e) {
                console.error('解析用户数据失败:', e);
            }
        }
        
        // 默认数据
        return {
            usageCount: 0,
            isPremium: false,
            worksCount: 0,
            vipEndTime: null
        };
    }

    /**
     * 绑定用户下拉菜单事件
     */
    _attachUserDropdownEvents() {
        const userInfoBtn = document.getElementById('userInfoBtn');
        const userDropdown = document.getElementById('userDropdown');
        
        if (userInfoBtn && userDropdown) {
            // 移除旧的监听器（如果存在）
            if (this._userInfoBtnHandler) {
                userInfoBtn.removeEventListener('click', this._userInfoBtnHandler);
            }
            
            // 创建并保存新的处理函数
            this._userInfoBtnHandler = (e) => {
                e.stopPropagation();
                userDropdown.classList.toggle('show');
            };
            
            userInfoBtn.addEventListener('click', this._userInfoBtnHandler);

            // 点击外部关闭下拉菜单（使用一次性标记避免重复添加）
            if (!this._userDropdownClickOutsideAttached) {
                this._userDropdownClickOutsideAttached = true;
                
                document.addEventListener('click', (e) => {
                    const userDropdownEl = document.getElementById('userDropdown');
                    if (userDropdownEl && !e.target.closest('.user-dropdown-wrapper')) {
                        userDropdownEl.classList.remove('show');
                    }
                });
            }
        }
    }
    
    /**
     * 绑定退出按钮事件（直接绑定）
     */
    _attachLogoutButtonEvent() {
        const logoutBtn = document.getElementById('logoutBtn');
        
        if (logoutBtn) {
            // 移除旧的监听器（如果存在）
            if (this._logoutBtnHandler) {
                logoutBtn.removeEventListener('click', this._logoutBtnHandler);
            }
            
            // 创建并保存新的处理函数
            this._logoutBtnHandler = (e) => {
                e.preventDefault();
                e.stopPropagation();
                this._handleLogout();
            };
            
            logoutBtn.addEventListener('click', this._logoutBtnHandler);
        }
    }

    /**
     * 绑定管理订阅按钮事件
     */
    _attachManageSubscriptionEvent() {
        const manageSubscriptionBtn = document.getElementById('manageSubscriptionBtn');
        
        if (manageSubscriptionBtn) {
            manageSubscriptionBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this._handleManageSubscription();
            });
        }
    }

    /**
     * 处理管理订阅
     */
    _handleManageSubscription() {
        if (!this.currentUser || !this.currentUser.email) {
            console.error('❌ 缺少用户邮箱');
            return;
        }

        // 调用 userAPI 打开 Customer Portal
        if (typeof userAPI !== 'undefined') {
            userAPI.openCustomerPortal(this.currentUser.email);
        } else {
            console.error('❌ userAPI 未加载');
        }
    }

    /**
     * 处理登出
     */
    async _handleLogout() {
        if (!this.authInstance) {
            console.error('❌ authInstance 未初始化');
            return;
        }

        const result = await this.authInstance.signOut();
        
        if (result.success) {
            // 清除用户数据
            localStorage.removeItem('userData');
            
            // 🔥 重置 Request 的 VIP 状态
            if (typeof request !== 'undefined') {
                request.updateVipStatus(false, 0);
            }
            
            // 关闭移动端菜单（如果打开的话）
            this._closeMobileMenu();
        } else {
            console.error('❌ 登出失败:', result.error);
        }
    }

    /**
     * 刷新用户数据（从后端重新获取）
     */
    async refreshUserData() {
        if (this.currentUser) {
            await this._fetchUserData();
            this._updateAuthUI();
        }
    }

    /**
     * 手动更新用户数据（仅用于本地测试）
     * @param {Object} data - { usageCount, isPremium }
     */
    updateUserData(data) {
        const currentData = this._getUserData();
        const newData = { ...currentData, ...data };
        localStorage.setItem('userData', JSON.stringify(newData));
        
        // 刷新 UI
        this._updateAuthUI();
    }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Navbar;
}

