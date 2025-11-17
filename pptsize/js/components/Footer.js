/**
 * 页脚组件
 * 支持多语言
 */
class Footer {
    constructor(options = {}) {
        this.container = options.container || document.body;
        this.lang = options.lang || {}; // 语言对象
    }

    /**
     * 渲染页脚
     */
    render() {
        const translations = this._getTranslations();
        const currentYear = new Date().getFullYear();
        
        const footerHTML = `
            <footer class="footer">
                <div class="container">
                    <div class="footer-content">
                        <!-- 关于我们 -->
                        <div class="footer-section">
                            <h3>${translations.aboutUs}</h3>
                            <p>${translations.aboutDesc}</p>
                            <p class="footer-contact">
                                ${translations.fromText} <a href="https://${translations.fromLink}" target="_blank" rel="noopener noreferrer">${translations.fromLink}</a>
                            </p>
                            <p class="footer-contact">
                                ${translations.contactText} <a href="mailto:${translations.contactEmail}">${translations.contactEmail}</a>
                            </p>
                        </div>
                        
                        <!-- 法律信息 -->
                        <div class="footer-section">
                            <h3>${translations.legal}</h3>
                            <ul class="footer-links">
                                <li><a href="/privacy.html">${translations.privacy}</a></li>
                                <li><a href="/terms.html">${translations.terms}</a></li>
                                <li><a href="/cookies.html">${translations.cookies}</a></li>
                                <li><a href="/security.html">${translations.security}</a></li>
                            </ul>
                        </div>
                    </div>

                    <div class="footer-bottom">
                        <p>&copy; ${currentYear} pptsize.com 鄂ICP备2024050325号-6  ${translations.copyright}</p>
                        <p style="margin-top: 10px; font-size: 12px; color: #95a5a6;">
                            ${translations.madeWith} ❤️ ${translations.madeIn}
                        </p>
                    </div>
                </div>
            </footer>
        `;

        // 插入到容器
        if (this.container === document.body) {
            this.container.insertAdjacentHTML('beforeend', footerHTML);
        } else {
            this.container.innerHTML = footerHTML;
        }

        this._attachEventListeners();
    }

    /**
     * 绑定事件监听器
     */
    _attachEventListeners() {
        // 平滑滚动到顶部
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };

        // 可以添加"返回顶部"按钮的事件监听
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', scrollToTop);
        }

        // 社交链接点击统计（可选）
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // 这里可以添加统计代码
                console.log('Social link clicked:', link.getAttribute('title'));
            });
        });
    }

    /**
     * 添加"返回顶部"按钮
     */
    addBackToTopButton() {
        const btnHTML = `
            <button id="backToTop" class="back-to-top" title="${this._getTranslations().backToTop}">
                ↑
            </button>
        `;
        
        document.body.insertAdjacentHTML('beforeend', btnHTML);
        
        const btn = document.getElementById('backToTop');
        
        // 显示/隐藏按钮
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                btn.classList.add('show');
            } else {
                btn.classList.remove('show');
            }
        });

        // 点击返回顶部
        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /**
     * 获取翻译文本
     */
    _getTranslations() {
        return this.lang.footer || {};
    }
    
    /**
     * 获取翻译
     */
    t(key) {
        if (this.lang.footer && this.lang.footer[key]) {
            return this.lang.footer[key];
        }
        return key;
    }

    /**
     * 获取本地化路径
     * 根据当前语言判断
     */
    _getLocalePath(path) {
        // 检查是否在中文页面（根目录）
        const isZh = window.location.pathname === '/' || window.location.pathname.startsWith('/index');
        
        if (isZh) {
            return '/' + path;
        }
        
        // 从 URL 中提取语言
        const match = window.location.pathname.match(/^\/([a-z]{2})\//);
        const lang = match ? match[1] : 'en';
        
        return '/' + lang + '/' + path;
    }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Footer;
}

