/**
 * 认证组件
 * 支持登录、注册、忘记密码功能
 * 基于 Supabase Authentication
 */
class Auth {
    constructor(options = {}) {
        this.lang = options.lang || {}; // 语言对象
        this.onAuthChange = options.onAuthChange || null; // 认证状态变化回调
        this.currentUser = null;
        this.modalOpen = false;
        
        // 初始化 Supabase 并监听认证状态
        this._initSupabase();
    }

    /**
     * 初始化 Supabase
     */
    async _initSupabase() {
        if (typeof supabaseConfig === 'undefined') {
            console.error('Supabase 配置未加载，请先引入 supabase-config.js');
            return;
        }

        // 如果 Supabase 还没有初始化，则初始化（避免重复初始化）
        if (!supabaseConfig.initialized) {
            await supabaseConfig.initialize();
        }
        
        // 监听认证状态变化
        supabaseConfig.onAuthStateChanged(async (user) => {
            this.currentUser = user;
            
            if (user) {
                // 用户已登录，获取 token 并保存
                const token = await supabaseConfig.getUserToken();
                if (token && typeof request !== 'undefined') {
                    request.setToken(token);
                }
            } else {
                // 用户已登出，清除 token
                if (typeof request !== 'undefined') {
                    request.setToken(null);
                }
            }
            
            // 触发回调
            if (this.onAuthChange) {
                this.onAuthChange(user);
            }
        });
    }

    /**
     * 获取当前用户
     */
    async getCurrentUser() {
        // 如果有缓存的用户，直接返回
        if (this.currentUser) {
            return this.currentUser;
        }
        
        // 否则从 Supabase 获取
        if (typeof supabaseConfig !== 'undefined') {
            this.currentUser = await supabaseConfig.getCurrentUser();
            return this.currentUser;
        }
        
        return null;
    }

    /**
     * 显示登录模态框
     */
    showLoginModal() {
        this._showModal('login');
    }

    /**
     * 显示注册模态框
     */
    showSignupModal() {
        this._showModal('signup');
    }

    /**
     * 显示忘记密码模态框
     */
    showForgotPasswordModal() {
        this._showModal('forgot-password');
    }

    /**
     * 显示模态框
     */
    _showModal(type) {
        // 如果模态框已存在，先移除
        this._removeModal();

        const modalHTML = this._getModalHTML(type);
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // 添加事件监听
        this._attachModalEvents(type);
        
        this.modalOpen = true;
        
        // 添加显示动画
        setTimeout(() => {
            const modal = document.getElementById('authModal');
            if (modal) {
                modal.classList.add('show');
            }
        }, 10);
    }

    /**
     * 隐藏模态框
     */
    _hideModal() {
        const modal = document.getElementById('authModal');
        if (modal) {
            modal.classList.remove('show');
            // 记录当前模态框的实例，防止误删除
            const modalToRemove = modal;
            setTimeout(() => {
                // 只删除当前这个模态框实例
                if (modalToRemove.parentNode) {
                    modalToRemove.remove();
                }
            }, 300);
        }
        this.modalOpen = false;
    }

    /**
     * 移除模态框
     */
    _removeModal() {
        const modal = document.getElementById('authModal');
        if (modal) {
            modal.remove();
        }
    }

    /**
     * 获取模态框 HTML
     */
    _getModalHTML(type) {
        const lang = this.lang.auth || {};
        
        let title, content, submitText, footerLink;
        
        if (type === 'login') {
            title = lang.login || '登录';
            submitText = lang.loginBtn || '登录';
            content = `
                <!-- 第三方登录按钮 -->
                <div class="auth-social-buttons">
                    <button type="button" class="auth-google-btn" id="googleLoginBtn">
                        <svg class="google-icon" viewBox="0 0 24 24" width="18" height="18">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        ${lang.continueWithGoogle || '使用 Google 账号登录'}
                    </button>
                    
                    <button type="button" class="auth-microsoft-btn" id="microsoftLoginBtn">
                        <svg class="microsoft-icon" viewBox="0 0 24 24" width="18" height="18">
                            <path fill="#f25022" d="M1 1h10v10H1z"/>
                            <path fill="#00a4ef" d="M13 1h10v10H13z"/>
                            <path fill="#7fba00" d="M1 13h10v10H1z"/>
                            <path fill="#ffb900" d="M13 13h10v10H13z"/>
                        </svg>
                        ${lang.continueWithMicrosoft || '使用 Microsoft 账号登录'}
                    </button>
                </div>

                <div class="auth-divider">
                    <span>${lang.or || '或'}</span>
                </div>

                <div class="auth-form-group">
                    <label for="authEmail">${lang.email || '邮箱'}</label>
                    <input type="email" id="authEmail" class="auth-input" placeholder="${lang.emailPlaceholder || '请输入邮箱'}" required>
                </div>
                <div class="auth-form-group">
                    <label for="authPassword">${lang.password || '密码'}</label>
                    <input type="password" id="authPassword" class="auth-input" placeholder="${lang.passwordPlaceholder || '请输入密码'}" required>
                </div>
                <div class="auth-form-footer">
                    <a href="#" class="auth-link" id="forgotPasswordLink">${lang.forgotPassword || '忘记密码？'}</a>
                </div>
            `;
            footerLink = `
                <p class="auth-footer-text">
                    ${lang.noAccount || '还没有账号？'}
                    <a href="#" class="auth-link" id="switchToSignup">${lang.signupNow || '立即注册'}</a>
                </p>
            `;
        } else if (type === 'signup') {
            title = lang.signup || '注册';
            submitText = lang.signupBtn || '注册';
            content = `
                <!-- 第三方登录按钮 -->
                <div class="auth-social-buttons">
                    <button type="button" class="auth-google-btn" id="googleLoginBtn">
                        <svg class="google-icon" viewBox="0 0 24 24" width="18" height="18">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        ${lang.continueWithGoogle || '使用 Google 账号注册'}
                    </button>
                    
                    <button type="button" class="auth-microsoft-btn" id="microsoftLoginBtn">
                        <svg class="microsoft-icon" viewBox="0 0 24 24" width="18" height="18">
                            <path fill="#f25022" d="M1 1h10v10H1z"/>
                            <path fill="#00a4ef" d="M13 1h10v10H13z"/>
                            <path fill="#7fba00" d="M1 13h10v10H1z"/>
                            <path fill="#ffb900" d="M13 13h10v10H13z"/>
                        </svg>
                        ${lang.continueWithMicrosoft || '使用 Microsoft 账号注册'}
                    </button>
                </div>

                <div class="auth-divider">
                    <span>${lang.or || '或'}</span>
                </div>

                <div class="auth-form-group">
                    <label for="authEmail">${lang.email || '邮箱'}</label>
                    <input type="email" id="authEmail" class="auth-input" placeholder="${lang.emailPlaceholder || '请输入邮箱'}" required>
                </div>
                <div class="auth-form-group">
                    <label for="authPassword">${lang.password || '密码'}</label>
                    <input type="password" id="authPassword" class="auth-input" placeholder="${lang.passwordPlaceholder || '请输入密码（至少6位）'}" required>
                </div>
                <div class="auth-form-group">
                    <label for="authPasswordConfirm">${lang.confirmPassword || '确认密码'}</label>
                    <input type="password" id="authPasswordConfirm" class="auth-input" placeholder="${lang.confirmPasswordPlaceholder || '请再次输入密码'}" required>
                </div>
            `;
            footerLink = `
                <p class="auth-footer-text">
                    ${lang.hasAccount || '已有账号？'}
                    <a href="#" class="auth-link" id="switchToLogin">${lang.loginNow || '立即登录'}</a>
                </p>
            `;
        } else if (type === 'forgot-password') {
            title = lang.resetPassword || '重置密码';
            submitText = lang.sendResetEmail || '发送重置邮件';
            content = `
                <div class="auth-form-group">
                    <label for="authEmail">${lang.email || '邮箱'}</label>
                    <input type="email" id="authEmail" class="auth-input" placeholder="${lang.emailPlaceholder || '请输入注册邮箱'}" required>
                </div>
                <div class="auth-info-text">
                    ${lang.resetPasswordInfo || '我们将向您的邮箱发送密码重置链接'}
                </div>
            `;
            footerLink = `
                <p class="auth-footer-text">
                    <a href="#" class="auth-link" id="switchToLogin">${lang.backToLogin || '返回登录'}</a>
                </p>
            `;
        }

        return `
            <div class="auth-modal" id="authModal">
                <div class="auth-modal-overlay" id="authModalOverlay"></div>
                <div class="auth-modal-content">
                    <div class="auth-modal-header">
                        <h2 class="auth-modal-title">${title}</h2>
                        <button class="auth-modal-close" id="authModalClose">&times;</button>
                    </div>
                    <div class="auth-modal-body">
                        <form class="auth-form" id="authForm">
                            ${content}
                            <div class="auth-error" id="authError"></div>
                            <button type="submit" class="auth-submit-btn" id="authSubmitBtn">
                                ${submitText}
                            </button>
                        </form>
                        ${footerLink}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 绑定模态框事件
     */
    _attachModalEvents(type) {
        // 关闭按钮
        const closeBtn = document.getElementById('authModalClose');
        const overlay = document.getElementById('authModalOverlay');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this._hideModal());
        }
        
        if (overlay) {
            overlay.addEventListener('click', () => this._hideModal());
        }

        // 表单提交
        const form = document.getElementById('authForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this._handleFormSubmit(type);
            });
        }

        // Google 登录按钮
        const googleLoginBtn = document.getElementById('googleLoginBtn');
        if (googleLoginBtn) {
            googleLoginBtn.addEventListener('click', () => {
                this._handleGoogleLogin();
            });
        }

        // Microsoft 登录按钮
        const microsoftLoginBtn = document.getElementById('microsoftLoginBtn');
        if (microsoftLoginBtn) {
            microsoftLoginBtn.addEventListener('click', () => {
                this._handleMicrosoftLogin();
            });
        }

        // 切换模态框类型
        const switchToSignup = document.getElementById('switchToSignup');
        const switchToLogin = document.getElementById('switchToLogin');
        const forgotPasswordLink = document.getElementById('forgotPasswordLink');

        if (switchToSignup) {
            switchToSignup.addEventListener('click', (e) => {
                e.preventDefault();
                this._hideModal();
                this.showSignupModal()
                //setTimeout(() => this.showSignupModal(), 300);
            });
        }

        if (switchToLogin) {
            switchToLogin.addEventListener('click', (e) => {
                e.preventDefault();
                this._hideModal();
                this.showLoginModal()
                //setTimeout(() => this.showLoginModal(), 300);
            });
        }

        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener('click', (e) => {
                e.preventDefault();
                this._hideModal();
                this.showForgotPasswordModal()
                //setTimeout(() => this.showForgotPasswordModal(), 300);
            });
        }
    }

    /**
     * 处理表单提交
     */
    async _handleFormSubmit(type) {
        const email = document.getElementById('authEmail')?.value.trim();
        const password = document.getElementById('authPassword')?.value;
        const submitBtn = document.getElementById('authSubmitBtn');
        const errorDiv = document.getElementById('authError');

        // 清除之前的错误
        this._clearError();

        // 基本验证
        if (!email) {
            this._showError(this.lang.auth?.emailRequired || '请输入邮箱');
            return;
        }

        if (type !== 'forgot-password' && !password) {
            this._showError(this.lang.auth?.passwordRequired || '请输入密码');
            return;
        }

        // 注册时验证密码确认
        if (type === 'signup') {
            const passwordConfirm = document.getElementById('authPasswordConfirm')?.value;
            if (password !== passwordConfirm) {
                this._showError(this.lang.auth?.passwordMismatch || '两次密码输入不一致');
                return;
            }
        }

        // 禁用提交按钮
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            submitBtn.textContent = this.lang.auth?.processing || '处理中...';
        }

        try {
            let result;

            if (type === 'login') {
                result = await supabaseConfig.signInWithEmail(email, password);
            } else if (type === 'signup') {
                result = await supabaseConfig.signUpWithEmail(email, password);
            } else if (type === 'forgot-password') {
                result = await supabaseConfig.sendPasswordResetEmail(email);
            }

            if (result.success) {
                if (type === 'forgot-password') {
                    this._showSuccess(this.lang.auth?.resetEmailSent || '重置邮件已发送，请查收');
                    setTimeout(() => this._hideModal(), 1500);
                } else {
                    this._showSuccess(this.lang.auth?.[type === 'login' ? 'loginSuccess' : 'signupSuccess'] || '成功');
                    // 登录/注册成功后立即关闭，UI 会自动更新
                    this._hideModal();
                }
            } else {
                this._showError(result.error);
            }
        } catch (error) {
            this._showError(error.message || this.lang.auth?.unknownError || '发生未知错误');
        } finally {
            // 恢复提交按钮
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                const lang = this.lang.auth || {};
                submitBtn.textContent = type === 'login' ? (lang.loginBtn || '登录') : 
                                       type === 'signup' ? (lang.signupBtn || '注册') : 
                                       (lang.sendResetEmail || '发送重置邮件');
            }
        }
    }

    /**
     * 显示错误消息
     */
    _showError(message) {
        const errorDiv = document.getElementById('authError');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.classList.add('show');
            errorDiv.classList.remove('success');
        }
    }

    /**
     * 显示成功消息
     */
    _showSuccess(message) {
        const errorDiv = document.getElementById('authError');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.classList.add('show', 'success');
        }
    }

    /**
     * 清除错误消息
     */
    _clearError() {
        const errorDiv = document.getElementById('authError');
        if (errorDiv) {
            errorDiv.textContent = '';
            errorDiv.classList.remove('show', 'success');
        }
    }

    /**
     * 处理 Google 登录
     */
    async _handleGoogleLogin() {
        const googleBtn = document.getElementById('googleLoginBtn');
        
        // 清除之前的错误
        this._clearError();

        // 禁用按钮，显示加载状态
        if (googleBtn) {
            googleBtn.disabled = true;
            googleBtn.classList.add('loading');
        }

        try {
            // 显示正在跳转的提示
            this._showSuccess(this.lang.auth?.redirecting || '正在跳转到 Google 授权页面...');
            
            const result = await supabaseConfig.signInWithGoogle();
            
            if (result.success) {
                // OAuth 登录会跳转，所以不需要关闭模态框
                // 模态框会随着页面跳转自动消失
                // 注意：这里不调用 _hideModal()
            } else {
                // 如果失败了，恢复按钮状态
                if (googleBtn) {
                    googleBtn.disabled = false;
                    googleBtn.classList.remove('loading');
                }
                
                // 如果是用户取消操作，不显示错误提示
                if (!result.cancelled) {
                    this._showError(result.error);
                }
            }
        } catch (error) {
            // 恢复按钮状态
            if (googleBtn) {
                googleBtn.disabled = false;
                googleBtn.classList.remove('loading');
            }
            
            // 检查是否是用户取消操作的错误
            const isCancelled = error.code === 'auth/popup-closed-by-user' || 
                              error.code === 'auth/cancelled-popup-request' ||
                              error.code === 'auth/user-cancelled';
            
            if (!isCancelled) {
                this._showError(error.message || this.lang.auth?.unknownError || '发生未知错误');
            }
        }
    }

    /**
     * 处理 Microsoft 登录
     */
    async _handleMicrosoftLogin() {
        const microsoftBtn = document.getElementById('microsoftLoginBtn');
        
        // 清除之前的错误
        this._clearError();

        // 禁用按钮，显示加载状态
        if (microsoftBtn) {
            microsoftBtn.disabled = true;
            microsoftBtn.classList.add('loading');
        }

        try {
            // 显示正在跳转的提示
            this._showSuccess(this.lang.auth?.redirecting || '正在跳转到 Microsoft 授权页面...');
            
            const result = await supabaseConfig.signInWithMicrosoft();
            
            if (result.success) {
                // OAuth 登录会跳转，所以不需要关闭模态框
                // 模态框会随着页面跳转自动消失
                // 注意：这里不调用 _hideModal()
            } else {
                // 如果失败了，恢复按钮状态
                if (microsoftBtn) {
                    microsoftBtn.disabled = false;
                    microsoftBtn.classList.remove('loading');
                }
                
                // 如果是用户取消操作，不显示错误提示
                if (!result.cancelled) {
                    this._showError(result.error);
                }
            }
        } catch (error) {
            // 恢复按钮状态
            if (microsoftBtn) {
                microsoftBtn.disabled = false;
                microsoftBtn.classList.remove('loading');
            }
            
            // 检查是否是用户取消操作的错误
            const isCancelled = error.code === 'auth/popup-closed-by-user' || 
                              error.code === 'auth/cancelled-popup-request' ||
                              error.code === 'auth/user-cancelled';
            
            if (!isCancelled) {
                this._showError(error.message || this.lang.auth?.unknownError || '发生未知错误');
            }
        }
    }

    /**
     * 登出
     */
    async signOut() {
        const result = await supabaseConfig.signOut();
        if (result.success) {
            // 刷新页面或更新 UI
            if (this.onAuthChange) {
                this.onAuthChange(null);
            }
        }
        return result;
    }

    /**
     * 发送邮箱验证
     */
    async sendEmailVerification() {
        return await supabaseConfig.sendEmailVerification();
    }

    /**
     * 更新用户资料
     */
    async updateProfile(displayName, photoURL) {
        return await supabaseConfig.updateProfile(displayName, photoURL);
    }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Auth;
}

