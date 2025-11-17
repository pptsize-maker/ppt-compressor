/**
 * Firebase 配置和初始化
 * 提供 Firebase Authentication 服务
 */

class FirebaseConfig {
    constructor() {
        // Firebase 配置信息 - 根据环境自动选择
        this.firebaseConfig = this._getFirebaseConfig();

        this.app = null;
        this.auth = null;
        this.initialized = false;
    }

    /**
     * 根据环境获取 Firebase 配置
     */
    _getFirebaseConfig() {
        // 生产环境配置
        const productionConfig = {
            apiKey: "AIzaSyB0Wm7p88K8rE__c-fhm894v45GvWmH35Y",
            authDomain: "pptsize-52f09.firebaseapp.com",
            projectId: "pptsize-52f09",
            storageBucket: "pptsize-52f09.firebasestorage.app",
            messagingSenderId: "518736396137",
            appId: "1:518736396137:web:0e0c517eba3dc62c6687f8",
            measurementId: "G-212XLQ40Z3"
        };

        // 开发/测试环境配置
        const developmentConfig = {
            apiKey: "AIzaSyB0Wm7p88K8rE__c-fhm894v45GvWmH35Y",
            authDomain: "pptsize-52f09.firebaseapp.com",
            projectId: "pptsize-52f09",
            storageBucket: "pptsize-52f09.firebasestorage.app",
            messagingSenderId: "518736396137",
            appId: "1:518736396137:web:f6feb30640d5227a6687f8",
            measurementId: "G-J6VRXS8FFN"
        };

        // 检查 envConfig 是否已加载
        if (typeof envConfig !== 'undefined' && envConfig.isProduction()) {
            return productionConfig;
        }

        // 默认使用开发配置
        return developmentConfig;
    }

    /**
     * 初始化 Firebase
     */
    async initialize() {
        try {
            // 检查 Firebase SDK 是否已加载
            if (typeof firebase === 'undefined') {
                console.error('Firebase SDK 未加载，请在 HTML 中引入 Firebase SDK');
                return false;
            }

            // 初始化 Firebase
            this.app = firebase.initializeApp(this.firebaseConfig);
            this.auth = firebase.auth();
            
            // 设置语言代码（根据当前页面语言）
            const lang = this._detectLanguage();
            this.auth.languageCode = lang;
            
            this.initialized = true;
            
            if (envConfig && envConfig.isDevelopment()) {
                console.log('✅ Firebase 初始化成功');
            }
            
            return true;
        } catch (error) {
            console.error('❌ Firebase 初始化失败:', error);
            return false;
        }
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
     * 获取 Auth 实例
     */
    getAuth() {
        if (!this.initialized) {
            console.warn('Firebase 未初始化，请先调用 initialize()');
            return null;
        }
        return this.auth;
    }

    /**
     * 获取当前用户
     */
    getCurrentUser() {
        return this.auth ? this.auth.currentUser : null;
    }

    /**
     * 获取用户 ID Token
     */
    async getUserToken() {
        const user = this.getCurrentUser();
        if (!user) return null;
        
        try {
            const token = await user.getIdToken();
            return token;
        } catch (error) {
            console.error('获取用户 Token 失败:', error);
            return null;
        }
    }

    /**
     * 监听认证状态变化
     */
    onAuthStateChanged(callback) {
        if (!this.auth) {
            console.warn('Firebase Auth 未初始化');
            return () => {};
        }
        
        return this.auth.onAuthStateChanged(callback);
    }

    /**
     * 邮箱密码注册
     */
    async signUpWithEmail(email, password) {
        try {
            const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            return { success: false, error: this._handleAuthError(error) };
        }
    }

    /**
     * 邮箱密码登录
     */
    async signInWithEmail(email, password) {
        try {
            const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            return { success: false, error: this._handleAuthError(error) };
        }
    }

    /**
     * Google 登录
     */
    async signInWithGoogle() {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            // 设置语言
            provider.setCustomParameters({
                'display': 'popup'
            });
            const userCredential = await this.auth.signInWithPopup(provider);
            return { success: true, user: userCredential.user };
        } catch (error) {
            // 检查是否是用户取消操作
            const isCancelled = error.code === 'auth/popup-closed-by-user' || 
                              error.code === 'auth/cancelled-popup-request' ||
                              error.code === 'auth/user-cancelled';
            
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
            const provider = new firebase.auth.OAuthProvider('microsoft.com');
            // 设置语言和其他参数
            provider.setCustomParameters({
                'prompt': 'select_account'
            });
            const userCredential = await this.auth.signInWithPopup(provider);
            return { success: true, user: userCredential.user };
        } catch (error) {
            // 检查是否是用户取消操作
            const isCancelled = error.code === 'auth/popup-closed-by-user' || 
                              error.code === 'auth/cancelled-popup-request' ||
                              error.code === 'auth/user-cancelled';
            
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
            await this.auth.sendPasswordResetEmail(email);
            return { success: true };
        } catch (error) {
            return { success: false, error: this._handleAuthError(error) };
        }
    }

    /**
     * 发送邮箱验证
     */
    async sendEmailVerification() {
        try {
            const user = this.getCurrentUser();
            if (!user) {
                return { success: false, error: '用户未登录' };
            }
            
            await user.sendEmailVerification();
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
            await this.auth.signOut();
            // 清除本地存储的 token
            if (typeof request !== 'undefined') {
                request.setToken(null);
            }
            return { success: true };
        } catch (error) {
            return { success: false, error: this._handleAuthError(error) };
        }
    }

    /**
     * 更新用户资料
     */
    async updateProfile(displayName, photoURL) {
        try {
            const user = this.getCurrentUser();
            if (!user) {
                return { success: false, error: '用户未登录' };
            }

            await user.updateProfile({
                displayName: displayName || user.displayName,
                photoURL: photoURL || user.photoURL
            });

            return { success: true };
        } catch (error) {
            return { success: false, error: this._handleAuthError(error) };
        }
    }

    /**
     * 处理 Firebase 认证错误
     */
    _handleAuthError(error) {
        const errorMessages = {
            'auth/email-already-in-use': {
                zh: '该邮箱已被注册',
                en: 'Email already in use',
                hi: 'ईमेल पहले से उपयोग में है',
                ja: 'このメールアドレスは既に使用されています',
                ko: '이메일이 이미 사용 중입니다'
            },
            'auth/invalid-email': {
                zh: '邮箱格式不正确',
                en: 'Invalid email format',
                hi: 'अमान्य ईमेल प्रारूप',
                ja: '無効なメール形式',
                ko: '잘못된 이메일 형식'
            },
            'auth/operation-not-allowed': {
                zh: '操作不被允许',
                en: 'Operation not allowed',
                hi: 'संचालन की अनुमति नहीं है',
                ja: '操作が許可されていません',
                ko: '작업이 허용되지 않습니다'
            },
            'auth/weak-password': {
                zh: '密码强度太弱（至少6位）',
                en: 'Password is too weak (minimum 6 characters)',
                hi: 'पासवर्ड बहुत कमजोर है (कम से कम 6 अक्षर)',
                ja: 'パスワードが弱すぎます（最低6文字）',
                ko: '비밀번호가 너무 약합니다 (최소 6자)'
            },
            'auth/user-disabled': {
                zh: '该账户已被禁用',
                en: 'User account has been disabled',
                hi: 'उपयोगकर्ता खाता अक्षम कर दिया गया है',
                ja: 'ユーザーアカウントが無効になっています',
                ko: '사용자 계정이 비활성화되었습니다'
            },
            'auth/user-not-found': {
                zh: '用户不存在',
                en: 'User not found',
                hi: 'उपयोगकर्ता नहीं मिला',
                ja: 'ユーザーが見つかりません',
                ko: '사용자를 찾을 수 없습니다'
            },
            'auth/wrong-password': {
                zh: '密码错误',
                en: 'Incorrect password',
                hi: 'गलत पासवर्ड',
                ja: 'パスワードが間違っています',
                ko: '잘못된 비밀번호'
            },
            'auth/too-many-requests': {
                zh: '请求过于频繁，请稍后再试',
                en: 'Too many requests, please try again later',
                hi: 'बहुत सारे अनुरोध, कृपया बाद में पुन: प्रयास करें',
                ja: 'リクエストが多すぎます。後でもう一度お試しください',
                ko: '너무 많은 요청이 있습니다. 나중에 다시 시도하십시오'
            },
            'auth/network-request-failed': {
                zh: '网络连接失败',
                en: 'Network connection failed',
                hi: 'नेटवर्क कनेक्शन विफल',
                ja: 'ネットワーク接続に失敗しました',
                ko: '네트워크 연결 실패'
            }
        };

        const lang = this._detectLanguage();
        const errorCode = error.code;
        const errorMap = errorMessages[errorCode];

        if (errorMap) {
            return errorMap[lang] || errorMap['en'];
        }

        return error.message || '发生未知错误';
    }
}

// 创建全局单例
const firebaseConfig = new FirebaseConfig();

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FirebaseConfig, firebaseConfig };
}

