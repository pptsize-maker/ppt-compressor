/**
 * 法律页面通用组件
 * 用于隐私政策、服务条款、Cookie政策、安全说明等页面
 */

export class LegalPage {
    constructor(containerId, lang, pageType) {
        this.container = document.getElementById(containerId);
        this.lang = lang || {};
        this.pageType = pageType; // 'privacy', 'terms', 'cookies', 'security'
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
     * 渲染页面
     */
    render() {
        if (!this.container) {
            console.error('LegalPage: 容器元素不存在');
            return;
        }

        const pageData = this.lang[this.pageType];
        if (!pageData) {
            console.error(`LegalPage: 未找到 ${this.pageType} 的翻译数据`);
            return;
        }

        const currentDate = this._formatDate();

        this.container.innerHTML = `
            <div class="legal-page">
                <div class="legal-header">
                    <h1 class="legal-title">${pageData.pageTitle || ''}</h1>
                    <p class="legal-updated">${pageData.lastUpdated || 'Last Updated'}: ${currentDate}</p>
                </div>
                
                <div class="legal-content">
                    ${this._renderSections(pageData.sections)}
                </div>
            </div>
        `;
    }

    /**
     * 渲染各个部分
     */
    _renderSections(sections) {
        if (!sections) return '';

        let html = '';

        for (const [key, section] of Object.entries(sections)) {
            html += this._renderSection(section, key);
        }

        return html;
    }

    /**
     * 渲染单个部分
     */
    _renderSection(section, key) {
        let html = `<section class="legal-section" id="${key}">`;

        // 标题
        if (section.title) {
            html += `<h2 class="legal-section-title">${section.title}</h2>`;
        }

        // 内容
        if (section.content) {
            html += `<p class="legal-text">${section.content}</p>`;
        }

        // 列表项
        if (section.items && Array.isArray(section.items)) {
            html += `<ul class="legal-list">`;
            section.items.forEach(item => {
                html += `<li>${item}</li>`;
            });
            html += `</ul>`;
        }

        // 特殊处理：Cookie类型、安全措施等嵌套结构
        if (this.pageType === 'cookies' && key === 'types') {
            html += this._renderCookieTypes(section);
        }

        if (this.pageType === 'cookies' && key === 'manage' && section.note) {
            html += `<p class="legal-note">${section.note}</p>`;
        }

        if (this.pageType === 'security' && key === 'measures') {
            html += this._renderSecurityMeasures(section);
        }

        if (this.pageType === 'security' && key === 'practice') {
            html += this._renderSecurityPractice(section);
        }

        html += `</section>`;

        return html;
    }

    /**
     * 渲染Cookie类型
     */
    _renderCookieTypes(section) {
        let html = '';

        if (section.essential) {
            html += `
                <div class="legal-subsection">
                    <h3 class="legal-subsection-title">${section.essential.title}</h3>
                    <p class="legal-text">${section.essential.description}</p>
                    <ul class="legal-list">
                        ${section.essential.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        if (section.functional) {
            html += `
                <div class="legal-subsection">
                    <h3 class="legal-subsection-title">${section.functional.title}</h3>
                    <p class="legal-text">${section.functional.description}</p>
                    <ul class="legal-list">
                        ${section.functional.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        return html;
    }

    /**
     * 渲染安全措施
     */
    _renderSecurityMeasures(section) {
        let html = '';

        if (section.encryption) {
            html += `
                <div class="legal-subsection">
                    <h3 class="legal-subsection-title">${section.encryption.title}</h3>
                    <ul class="legal-list">
                        ${section.encryption.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        if (section.access) {
            html += `
                <div class="legal-subsection">
                    <h3 class="legal-subsection-title">${section.access.title}</h3>
                    <ul class="legal-list">
                        ${section.access.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        if (section.infrastructure) {
            html += `
                <div class="legal-subsection">
                    <h3 class="legal-subsection-title">${section.infrastructure.title}</h3>
                    <ul class="legal-list">
                        ${section.infrastructure.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        return html;
    }

    /**
     * 渲染安全最佳实践
     */
    _renderSecurityPractice(section) {
        let html = '';

        if (section.user) {
            html += `
                <div class="legal-subsection">
                    <h3 class="legal-subsection-title">${section.user.title}</h3>
                    <ul class="legal-list">
                        ${section.user.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        return html;
    }

    /**
     * 格式化日期
     */
    _formatDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}

