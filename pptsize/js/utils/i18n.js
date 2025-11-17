/**
 * 国际化（i18n）语言管理工具
 * 负责语言的加载、切换、存储
 */

class I18n {
    constructor() {
        // 支持的语言列表
        this.supportedLangs = ['zh', 'en', 'ja', 'ko', 'hi', 'de', 'fr', 'es'];
        
        // 默认语言（中文）
        this.defaultLang = 'zh';
        
        // 语言数据缓存
        this.langData = null;
        
        // 当前语言代码
        this.currentLangCode = null;
    }

    /**
     * 获取用户选择的语言（从 localStorage）
     * @returns {string|null} 语言代码
     */
    getStoredLang() {
        return localStorage.getItem('userLanguage');
    }

    /**
     * 保存用户选择的语言到 localStorage
     * @param {string} langCode - 语言代码
     */
    setStoredLang(langCode) {
        if (this.supportedLangs.includes(langCode)) {
            localStorage.setItem('userLanguage', langCode);
        }
    }

    /**
     * 检测浏览器语言
     * @returns {string|null} 语言代码
     */
    detectBrowserLang() {
        const browserLang = navigator.language || navigator.userLanguage;
        const shortLang = browserLang.split('-')[0]; // 'zh-CN' → 'zh'
        
        // 如果浏览器语言在支持列表中，返回它
        return this.supportedLangs.includes(shortLang) ? shortLang : null;
    }

    /**
     * 从 URL 路径检测语言
     * @returns {string|null} 语言代码
     */
    detectLangFromUrl() {
        const path = window.location.pathname;
        
        // 检查路径是否以 /语言代码/ 开头
        for (const lang of this.supportedLangs) {
            if (path.startsWith(`/${lang}/`) || path === `/${lang}`) {
                return lang;
            }
        }
        
        // 如果是根路径 /，则是中文
        if (path === '/' || path === '/index.html') {
            return 'zh';
        }
        
        return null;
    }

    /**
     * 获取当前应该使用的语言代码
     * 优先级：URL 路径 > localStorage > 浏览器语言 > 默认语言（中文）
     * @returns {string} 语言代码
     */
    getCurrentLangCode() {
        if (this.currentLangCode) {
            return this.currentLangCode;
        }

        // 1. 尝试从 URL 路径获取（优先级最高）
        const urlLang = this.detectLangFromUrl();
        if (urlLang) {
            this.currentLangCode = urlLang;
            // 更新 localStorage（URL 优先级最高）
            this.setStoredLang(urlLang);
            return urlLang;
        }

        // 2. 尝试从 localStorage 获取
        const storedLang = this.getStoredLang();
        if (storedLang && this.supportedLangs.includes(storedLang)) {
            this.currentLangCode = storedLang;
            return storedLang;
        }

        // 3. 尝试检测浏览器语言
        const browserLang = this.detectBrowserLang();
        if (browserLang) {
            this.currentLangCode = browserLang;
            // 保存到 localStorage
            this.setStoredLang(browserLang);
            return browserLang;
        }

        // 4. 使用默认语言（中文）
        this.currentLangCode = this.defaultLang;
        this.setStoredLang(this.defaultLang);
        return this.defaultLang;
    }

    /**
     * 加载语言包（同步方式）
     * @param {string} langCode - 语言代码（可选，不传则使用当前语言）
     * @returns {Object} 语言数据对象
     */
    loadLanguage(langCode) {
        // 如果没有指定语言，使用当前语言
        if (!langCode) {
            langCode = this.getCurrentLangCode();
        }

        // 验证语言代码
        if (!this.supportedLangs.includes(langCode)) {
            console.warn(`不支持的语言: ${langCode}，使用默认语言: ${this.defaultLang}`);
            langCode = this.defaultLang;
        }

        // 更新当前语言代码
        this.currentLangCode = langCode;

        // 保存到 localStorage
        this.setStoredLang(langCode);

        // 返回语言数据（需要在 HTML 中已经加载对应的语言文件）
        // 这里假设语言文件已经通过 <script> 标签加载，并定义了全局变量
        // 例如：zh.js 定义了 window.zh, en.js 定义了 window.en
        if (typeof window[langCode] !== 'undefined') {
            this.langData = window[langCode];
            return this.langData;
        }

        console.error(`❌ 语言包未加载: ${langCode}`);
        console.error('可用的语言包:', Object.keys(window).filter(key => this.supportedLangs.includes(key)));
        return null;
    }

    /**
     * 获取当前语言数据
     * @returns {Object} 语言数据对象
     */
    getLangData() {
        if (!this.langData) {
            this.loadLanguage();
        }
        return this.langData;
    }

    /**
     * 切换语言
     * @param {string} langCode - 语言代码
     */
    switchLanguage(langCode) {
        if (!this.supportedLangs.includes(langCode)) {
            console.warn(`不支持的语言: ${langCode}`);
            return;
        }

        // 保存语言偏好
        this.setStoredLang(langCode);
        
        // 根据语言代码跳转到对应的页面
        const langPath = langCode === 'zh' ? '/' : `/${langCode}/`;
        const currentPath = window.location.pathname;
        
        // 如果当前不在目标语言的页面，则跳转
        if (langCode === 'zh' && currentPath !== '/') {
            window.location.href = '/';
        } else if (langCode !== 'zh' && !currentPath.startsWith(`/${langCode}/`)) {
            window.location.href = langPath;
        }
    }

    /**
     * 获取语言显示名称
     * @param {string} langCode - 语言代码
     * @returns {string} 语言名称
     */
    getLangName(langCode) {
        const langNames = {
            'zh': '中文',
            'en': 'English',
            'ja': '日本語',
            'ko': '한국어',
            'hi': 'हिन्दी',
            'de': 'Deutsch',
            'fr': 'Français',
            'es': 'Español'
        };
        return langNames[langCode] || langCode;
    }

    /**
     * 获取语言旗帜图标
     * @param {string} langCode - 语言代码
     * @returns {string} 旗帜 emoji
     */
    getLangFlag(langCode) {
        const langFlags = {
            'zh': '🇨🇳',
            'en': '🇺🇸',
            'ja': '🇯🇵',
            'ko': '🇰🇷',
            'hi': '🇮🇳',
            'de': '🇩🇪',
            'fr': '🇫🇷',
            'es': '🇪🇸'
        };
        return langFlags[langCode] || '🌐';
    }

    /**
     * 获取所有支持的语言列表
     * @returns {Array} 语言列表
     */
    getSupportedLanguages() {
        return this.supportedLangs.map(code => ({
            code: code,
            name: this.getLangName(code),
            flag: this.getLangFlag(code)
        }));
    }
}

// 创建全局单例
if (typeof window !== 'undefined') {
    if (!window.i18n) {
        window.i18n = new I18n();
    }
} else {
    // Node.js 环境
    var i18n = new I18n();
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { I18n, i18n: window.i18n };
}

