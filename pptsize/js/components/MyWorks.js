/**
 * 我的任务组件
 * 显示用户的文件处理任务列表
 */

export class MyWorks {
    constructor(containerId, lang) {
        this.container = document.getElementById(containerId);
        this.lang = lang || {};
        this.works = [];
        this.loading = false;
        this._authListenerAttached = false; // 防止重复绑定事件
        this._refreshTimer = null; // 定时刷新计时器
        this._refreshInterval = 30000; // 刷新间隔：10秒
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

        // 🔥 确保事件监听器已设置（无论登录状态如何）
        this._setupAuthListener();

        // 🔥 检查用户是否登录（从全局状态获取）
        const isLoggedIn = await this._checkLoginStatus();
        
        if (!isLoggedIn) {
            // 未登录，显示登录提示
            console.log('⚠️ 用户未登录，显示登录提示');
            this.container.innerHTML = this._renderLoginPrompt();
            return;
        }

        // 已登录，正常加载任务列表
        console.log('✅ 用户已登录，加载任务列表');
        this.container.innerHTML = this._renderLoading();
        await this.loadWorks();
    }

    /**
     * 加载任务列表
     */
    async loadWorks() {
        this.loading = true;

        try {
            const result = await worksAPI.getWorks();
            
            if (result.success) {
                this.works = result.data || [];
                this.container.innerHTML = this._renderContent();
                this._attachEvents();
                
                // 🔄 启动定时刷新（只有在成功加载后才启动）
                this._startAutoRefresh();
            } else {
                this.container.innerHTML = this._renderError(result.error);
                // 加载失败时停止定时刷新
                this._stopAutoRefresh();
            }
        } catch (error) {
            console.error('加载任务列表失败:', error);
            this.container.innerHTML = this._renderError(error.message);
            // 加载失败时停止定时刷新
            this._stopAutoRefresh();
        } finally {
            this.loading = false;
        }
    }

    /**
     * 渲染加载状态
     */
    _renderLoading() {
        return `
            <div class="works-container">
                <div class="works-loading">
                    <div class="spinner"></div>
                    <p>${this.t('works.loading')}</p>
                </div>
            </div>
        `;
    }

    /**
     * 渲染错误状态
     */
    _renderError(errorMsg) {
        return `
            <div class="works-container">
                <div class="works-error">
                    <p>❌ ${this.t('works.loadError')}: ${errorMsg}</p>
                    <button class="btn-retry" onclick="location.reload()">
                        ${this.t('works.retry')}
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * 渲染主内容
     */
    _renderContent() {
        if (!this.works || this.works.length === 0) {
            return this._renderEmpty();
        }

        return `
            <div class="works-container">
                <p class="works-notice">
                    ⚠️ ${this.t('works.notice')}
                </p>
                <div class="works-list">
                    ${this.works.map((work, index) => this._renderWorkItem(work, index)).join('')}
                </div>
            </div>
        `;
    }

    /**
     * 渲染空状态
     */
    _renderEmpty() {
        return `
            <div class="works-container">
                <div class="works-empty">
                    <div class="empty-icon">📝</div>
                    <p class="empty-text">${this.t('works.empty')}</p>
                    <p class="empty-hint">${this.t('works.emptyHint')}</p>
                </div>
            </div>
        `;
    }

    /**
     * 渲染单个任务项
     */
    _renderWorkItem(work, index) {
        const statusInfo = worksAPI.getStatusInfo(work.status);
        const statusText = this.t(`works.status.${statusInfo.text}`);
        const createTime = worksAPI.formatDate(work.createTime);
        const canDownload = work.status === 2; // 只有成功状态可以下载
        const isProcessing = work.status === 1; // 判断是否为处理中状态
        
        // 计算压缩率（只有当两个字段都存在时才显示）
        const hasCompressionInfo = work.ssize != null && work.esize != null;
        let compressionInfo = '';
        
        if (hasCompressionInfo) {
            const originalSize = work.ssize;
            const compressedSize = work.esize;
            const savedPercent = this._calculateSavedPercent(originalSize, compressedSize);
            const originalSizeStr = this._formatFileSize(originalSize);
            const compressedSizeStr = this._formatFileSize(compressedSize);
            
            compressionInfo = `
                <span class="work-compression">
                    ${originalSizeStr} → ${compressedSizeStr} 
                    <span class="compression-rate">(${this.t('works.saved') || '节省'} ${savedPercent}%)</span>
                </span>
            `;
        }

        return `
            <div class="work-item" data-index="${index}">
                <div class="work-main">
                    <div class="work-info">
                        <div class="work-name" title="${work.orgName}">
                            📄 ${work.orgName || this.t('works.unknownFile')}
                        </div>
                        <div class="work-meta">
                            <span class="work-time">🕐 ${createTime}</span>
                            <span class="work-status work-status-${statusInfo.color}">
                                <span class="${isProcessing ? 'work-status-processing-icon' : ''}">${statusInfo.icon}</span> ${statusText}
                            </span>
                            ${compressionInfo}
                        </div>
                    </div>
                    <div class="work-actions">
                        ${canDownload ? `
                            <button class="btn-download" data-index="${index}">
                                ⬇️ ${this.t('works.download')}
                            </button>
                        ` : `
                            <button class="btn-download" disabled>
                                ${statusInfo.icon} ${statusText}
                            </button>
                        `}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 绑定事件
     */
    _attachEvents() {
        // 下载按钮事件
        const downloadBtns = this.container.querySelectorAll('.btn-download:not([disabled])');
        downloadBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this._handleDownload(index);
            });
        });
    }

    /**
     * 处理下载
     */
    async _handleDownload(index) {
        const work = this.works[index];
        if (!work || work.status !== 2) {
            return;
        }

        const btn = this.container.querySelector(`.btn-download[data-index="${index}"]`);
        if (!btn) return;

        // 检查下载路径
        if (!work.downloadPath) {
            console.error('没有可下载的文件');
            alert(this.t('works.downloadError') || '下载链接不存在');
            return;
        }

        // 保存原始按钮文本
        const originalText = btn.innerHTML;
        
        // 更新按钮状态为下载中
        btn.disabled = true;
        btn.textContent = `⏳ ${this.t('works.downloading')}...`;

        try {
            // 使用通用下载管理器
            await downloadManager.download({
                downloadPath: work.downloadPath,
                fileName: work.orgName || 'download.pptx',
                addCompressedSuffix: true,
                openInNewTab: true,
                onSuccess: (fileName) => {
                    // 成功回调
                    btn.textContent = `✅ ${this.t('works.downloadSuccess')}`;
                    setTimeout(() => {
                        btn.disabled = false;
                        btn.innerHTML = originalText;
                    }, 2000);
                },
                onError: (error) => {
                    // 失败回调
                    btn.textContent = `❌ ${this.t('works.downloadError')}`;
                    setTimeout(() => {
                        btn.disabled = false;
                        btn.textContent = `⬇️ ${this.t('works.download')}`;
                    }, 2000);
                }
            });
        } catch (error) {
            console.error('下载失败:', error);
            btn.textContent = `❌ ${this.t('works.downloadError')}`;
            setTimeout(() => {
                btn.disabled = false;
                btn.textContent = `⬇️ ${this.t('works.download')}`;
            }, 2000);
        }
    }

    /**
     * 刷新列表
     */
    async refresh() {
        await this.loadWorks();
    }

    /**
     * 销毁组件（清理定时器）
     */
    destroy() {
        console.log('🗑️ 销毁 MyWorks 组件');
        this._stopAutoRefresh();
    }

    /**
     * 计算节省的百分比
     */
    _calculateSavedPercent(originalSize, compressedSize) {
        if (originalSize === 0 || !originalSize || !compressedSize) return 0;
        const saved = originalSize - compressedSize;
        return Math.round((saved / originalSize) * 100);
    }

    /**
     * 格式化文件大小
     */
    _formatFileSize(bytes) {
        if (!bytes || bytes === 0) return '0 B';
        
        const units = ['B', 'KB', 'MB', 'GB'];
        const k = 1024;
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const size = bytes / Math.pow(k, i);
        
        return size.toFixed(2) + ' ' + units[i];
    }

    /**
     * 🔥 检查用户是否登录
     */
    async _checkLoginStatus() {
        if (typeof supabaseConfig !== 'undefined') {
            try {
                const user = await supabaseConfig.getCurrentUser();
                return !!user;
            } catch (error) {
                console.error('❌ 检查登录状态失败:', error);
                return false;
            }
        }
        console.warn('⚠️ supabaseConfig 未定义');
        return false;
    }

    /**
     * 🔥 渲染登录提示
     */
    _renderLoginPrompt() {
        return `
            <div class="works-container">
                <div class="works-empty">
                    <div class="empty-icon">🔒</div>
                    <p class="empty-text">${this.t('works.loginRequired')}</p>
                    <p class="empty-hint">${this.t('works.loginHint')}</p>
                    <button class="auth-login-btn" onclick="document.getElementById('loginBtn')?.click()">
                        ${this.t('auth.login')}
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * 🔥 监听认证状态变化
     */
    _setupAuthListener() {
        // 防止重复绑定
        if (this._authListenerAttached) {
            return;
        }
        
        this._authListenerAttached = true;
        
        window.addEventListener('userAuthChanged', (e) => {
            const { isLogin } = e.detail;
            console.log('🔔 MyWorks 收到认证状态变化:', isLogin ? '已登录' : '已登出');
            
            if (isLogin) {
                // 用户登录后，重新渲染页面（加载任务列表）
                this.render();
            } else {
                // 用户登出后，停止定时刷新，清空任务列表并重新渲染
                this._stopAutoRefresh();
                this.works = [];
                this.loading = false;
                this.render();
            }
        });
        
        console.log('👂 MyWorks 已设置认证状态监听器');
    }

    /**
     * 🔄 启动自动刷新
     */
    _startAutoRefresh() {
        // 先清除旧的定时器（防止重复）
        this._stopAutoRefresh();
        
        console.log(`⏰ 启动定时刷新，间隔: ${this._refreshInterval / 1000}秒`);
        
        this._refreshTimer = setInterval(async () => {
            // 检查用户是否仍然登录
            const isLoggedIn = await this._checkLoginStatus();
            if (!isLoggedIn) {
                console.log('⚠️ 用户未登录，停止定时刷新');
                this._stopAutoRefresh();
                return;
            }
            
            // 如果正在加载中，跳过本次刷新
            if (this.loading) {
                console.log('⏭️ 正在加载中，跳过本次刷新');
                return;
            }
            
            console.log('🔄 定时刷新任务列表...');
            await this._silentRefresh();
        }, this._refreshInterval);
    }

    /**
     * 🛑 停止自动刷新
     */
    _stopAutoRefresh() {
        if (this._refreshTimer) {
            console.log('⏸️ 停止定时刷新');
            clearInterval(this._refreshTimer);
            this._refreshTimer = null;
        }
    }

    /**
     * 🔄 静默刷新（不显示加载动画）
     */
    async _silentRefresh() {
        try {
            const result = await worksAPI.getWorks();
            
            if (result.success) {
                const newWorks = result.data || [];
                
                // 检查是否有变化
                if (JSON.stringify(this.works) !== JSON.stringify(newWorks)) {
                    console.log('✅ 任务列表已更新');
                    this.works = newWorks;
                    this.container.innerHTML = this._renderContent();
                    this._attachEvents();
                } else {
                    console.log('ℹ️ 任务列表无变化');
                }
            }
        } catch (error) {
            console.error('❌ 静默刷新失败:', error);
            // 失败时不做任何处理，等待下次刷新
        }
    }
}

// 导出
if (typeof window !== 'undefined') {
    window.MyWorks = MyWorks;
}

