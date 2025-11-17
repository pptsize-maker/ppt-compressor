/**
 * PPT压缩组件
 * 统一处理文件上传、压缩、下载
 */

export class PPTCompressor {
    constructor(containerId, lang) {
        this.container = document.getElementById(containerId);
        this.currentFile = null;
        this.originalFile = null; // 保存原始上传的文件对象
        this.state = 'idle'; // idle, uploading, compressing, completed, error
        this.lang = lang || {}; // 语言对象
    }

    /**
     * 获取翻译文本（支持占位符替换）
     */
    t(key, params = {}) {
        let text = key;
        if (this.lang.compressor && this.lang.compressor[key]) {
            text = this.lang.compressor[key];
        }
        
        // 替换占位符
        // 默认占位符：{size} -> 从 envConfig 获取文件大小限制
        if (text.includes('{size}') && !params.size) {
            params.size = envConfig.formatMaxFileSize();
        }
        
        // 替换所有占位符
        Object.keys(params).forEach(paramKey => {
            text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), params[paramKey]);
        });
        
        return text;
    }

    /**
     * 渲染组件
     */
    render() {
        console.log('🎨 PPTCompressor render() 开始执行');
        console.log('容器元素:', this.container);
        
        if (!this.container) {
            console.error('❌ 容器元素不存在！');
            return;
        }
        
        this.container.innerHTML = `
            <div class="ppt-compressor">
                <!-- 上传区域 -->
                <div class="upload-section" id="uploadSection">
                    <div class="upload-area" id="uploadArea">
                        
                         <!-- <h1 class="upload-title">${this.t('title')}</h1> -->
                        
                        <input type="file" 
                               id="fileInput" 
                               accept=".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                               style="display: none">
                        
                        <button class="btn-upload" id="selectFileBtn">
                            ${this.t('upload')}
                        </button>
                        
                        <p class="upload-hint">${this.t('supported')} · ${this.t('limit')}</p>
                    </div>
                </div>

                <!-- 文件预览区域 -->
                <div class="file-preview-section" id="filePreviewSection" style="display: none;">
                    <!-- 文件卡片 -->
                    <div class="file-card">
                        <div class="file-card-icon">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <rect x="8" y="4" width="24" height="32" rx="2" stroke="currentColor" stroke-width="2"/>
                                <path d="M12 12h16M12 18h16M12 24h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <div class="file-card-info">
                            <div class="file-card-name" id="fileCardName">document.pptx</div>
                            <div class="file-card-size" id="fileCardSize">0 MB</div>
                        </div>
                        <button class="file-card-remove" id="removeFileBtn" title="${this.t('removeFile')}">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M5 5L15 15M5 15L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </button>
                        
                        <!-- 进度条（压缩时显示） -->
                        <div class="file-card-progress" id="fileCardProgress" style="display: none;">
                            <div class="file-card-progress-bar">
                                <div class="file-card-progress-fill" id="progressFill"></div>
                            </div>
                            <div class="file-card-progress-text" id="progressText">${this.t('uploading')} 0%</div>
                        </div>
                    </div>
                    
                    <!-- 压缩选项（包含兼容设备和压缩等级） -->
                    <div class="compress-options">
                        <!-- 兼容设备选项（仅 pptx 格式显示，在压缩等级上面） -->
                        <div id="compatibilityOptions" style="display: none;">
                            <div class="option-title-main">${this.t('deviceCompatibility')}</div>
                            
                            <div class="level-options-horizontal">
                                <label class="level-option">
                                    <input type="radio" name="deviceCompatibility" value="any" checked>
                                    <div class="level-content">
                                        <div class="level-header">
                                            <span class="level-name">${this.t('anyDevice')}</span>
                                        </div>
                                    </div>
                                </label>
                                
                                <label class="level-option">
                                    <input type="radio" name="deviceCompatibility" value="pc-mac">
                                    <div class="level-content">
                                        <div class="level-header">
                                            <span class="level-name">${this.t('pcMacDevice')}</span>
                                            <button type="button" class="level-info-btn" data-tip="${this.t('pcMacDeviceTip')}">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/>
                                                    <path d="M8 7v4M8 5v.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </label>
                            </div>
                            
                            <!-- 分隔线 -->
                            <div class="options-divider"></div>
                        </div>
                        
                        <!-- 压缩等级选项 -->
                        <div class="option-title-main">${this.t('compressionLevel')}</div>
                        
                        <label class="level-option">
                            <input type="radio" name="compressionLevel" value="1">
                            <div class="level-content">
                                <div class="level-header">
                                    <span class="level-name">${this.t('levelStandard')}</span>
                                </div>
                            </div>
                        </label>
                        
                        <label class="level-option">
                            <input type="radio" name="compressionLevel" value="2" checked>
                            <div class="level-content">
                                <div class="level-header">
                                    <span class="level-name">${this.t('levelAdvanced')}</span>
                                    <span class="level-badge recommended">${this.t('recommended')}</span>
                                    <button type="button" class="level-info-btn" data-tip="${this.t('levelAdvancedTip')}">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/>
                                            <path d="M8 7v4M8 5v.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </label>
                        
                        <label class="level-option">
                            <input type="radio" name="compressionLevel" value="3">
                            <div class="level-content">
                                <div class="level-header">
                                    <span class="level-name">${this.t('levelMaximum')}</span>
                                    <button type="button" class="level-info-btn" data-tip="${this.t('levelMaximumTip')}">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/>
                                            <path d="M8 7v4M8 5v.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </label>
                    </div>
                    
                    <!-- 底部操作按钮 -->
                    <div class="bottom-actions">
                        <button class="btn-compress" id="startCompressBtn">
                            ${this.t('startCompress')}
                        </button>
                    </div>
                </div>

                <!-- 结果区域 -->
                <div class="result-section" id="resultSection" style="display: none;">
                    <div class="result-success-icon">
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                            <circle cx="30" cy="30" r="28" stroke="#22c55e" stroke-width="4"/>
                            <path d="M18 30L26 38L42 22" stroke="#22c55e" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    
                    <h3 class="result-title">ok</h3>
                    
                    <!-- 文件卡片（完成状态） -->
                    <div class="file-card result">
                        <div class="file-card-icon">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <rect x="8" y="4" width="24" height="32" rx="2" stroke="currentColor" stroke-width="2"/>
                                <path d="M12 12h16M12 18h16M12 24h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <div class="file-card-info">
                            <div class="file-card-name" id="resultFileName">document.pptx</div>
                            <div class="file-card-stats">
                                <span id="resultOriginalSize">0 MB</span>
                                <span class="arrow">→</span>
                                <span class="compressed" id="resultCompressedSize">0 MB</span>
                                <span class="saved" id="resultSaved">(节省 0%)</span>
                            </div>
                        </div>
                        <!-- 下载图标按钮 -->
                        <button class="file-card-download" id="downloadBtn" title="${this.t('download')}">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12 4L12 16M12 16L8 12M12 16L16 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M4 20h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </button>
                    </div>
                    
                    <!-- 压缩其他文件按钮 -->
                    <div class="bottom-actions">
                        <button class="btn-another" id="compressAnotherBtn">
                            ${this.t('uploadAnother')}
                        </button>
                    </div>
                </div>

                <!-- 错误区域 -->
                <div class="error-section" id="errorSection" style="display: none;">
                    <div class="result-error-icon">
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                            <circle cx="30" cy="30" r="28" stroke="#ef4444" stroke-width="4"/>
                            <path d="M22 22L38 38M22 38L38 22" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <h3 class="error-title">${this.t('failed')}</h3>
                    <p class="error-message" id="errorMessage">错误信息</p>
                    <div class="bottom-actions">
                        <button class="btn-compress" id="tryAgainBtn">
                            ${this.t('tryAgain')}
                        </button>
                    </div>
                </div>
            </div>
        `;

        console.log('🎨 HTML 已渲染，准备绑定事件');
        
        // 立即绑定事件
        this.attachEvents();
        
        console.log('✅ PPTCompressor render() 完成');
    }

    /**
     * 绑定事件
     */
    attachEvents() {
        console.log('🔗 attachEvents() 开始执行');
        const selectFileBtn = document.getElementById('selectFileBtn');
        console.log('selectFileBtn 元素:', selectFileBtn);
        const fileInput = document.getElementById('fileInput');
        console.log('fileInput 元素:', fileInput);
        const uploadArea = document.getElementById('uploadArea');
        const removeFileBtn = document.getElementById('removeFileBtn');
        const startCompressBtn = document.getElementById('startCompressBtn');
        const downloadBtn = document.getElementById('downloadBtn');
        const compressAnotherBtn = document.getElementById('compressAnotherBtn');
        const tryAgainBtn = document.getElementById('tryAgainBtn');

        // 选择文件按钮
        if (selectFileBtn) {
            console.log('✅ 绑定选择文件按钮事件');
            
            // 测试：立即验证按钮是否可点击
            console.log('按钮属性检查:', {
                disabled: selectFileBtn.disabled,
                style: selectFileBtn.style.cssText,
                pointerEvents: window.getComputedStyle(selectFileBtn).pointerEvents
            });
            
            selectFileBtn.addEventListener('click', (e) => {
                console.log('🖱️ 点击事件触发！事件对象:', e);
                e.preventDefault();
                e.stopPropagation();
                console.log('准备打开文件选择框');
                if (fileInput) {
                    console.log('调用 fileInput.click()');
                    fileInput.click();
                    console.log('fileInput.click() 已调用');
                } else {
                    console.error('❌ fileInput 不存在');
                }
            }, true); // 使用捕获阶段
            
            // 添加其他事件监听以调试
            selectFileBtn.addEventListener('mousedown', () => {
                console.log('🖱️ mousedown 事件触发');
            });
            selectFileBtn.addEventListener('mouseup', () => {
                console.log('🖱️ mouseup 事件触发');
            });
            
        } else {
            console.error('❌ selectFileBtn 不存在，无法绑定事件');
        }

        // 文件选择
        fileInput?.addEventListener('change', (e) => {
            console.log('文件选择事件触发');
            const file = e.target.files[0];
            if (file) {
                console.log('选择的文件:', file.name, '大小:', file.size);
                this.handleFile(file);
            }
        });

        // 拖拽上传
        uploadArea?.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });

        uploadArea?.addEventListener('dragleave', () => {
            uploadArea.classList.remove('drag-over');
        });

        uploadArea?.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            const file = e.dataTransfer.files[0];
            if (file) {
                console.log('拖拽的文件:', file.name);
                this.handleFile(file);
            }
        });

        // 移除文件按钮
        removeFileBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('🗑️ 点击移除文件按钮');
            this.reset();
        });

        // 开始压缩按钮
        startCompressBtn?.addEventListener('click', async () => {
            console.log('点击开始压缩按钮');
            if (this.currentFile) {
                // 显示加载状态
                this.setButtonLoading(startCompressBtn, true);
                
                try {
                    await this.uploadAndCompress(this.currentFile);
                } catch (error) {
                    console.error('压缩失败:', error);
                    // 根据错误类型显示友好的错误信息
                    let errorMessage = error.message || this.t('errorServer');
                    
                    // 特殊错误处理
                    if (error.message && error.message.includes('413')) {
                        errorMessage = this.t('error413');
                    } else if (error.message && error.message.includes('网络')) {
                        errorMessage = this.t('errorNetwork');
                    } else if (error.message && error.message.includes('服务器')) {
                        errorMessage = this.t('errorServer');
                    }
                    
                    this.showError(errorMessage);
                } finally {
                    // 恢复按钮状态
                    this.setButtonLoading(startCompressBtn, false);
                }
            }
        });

        // 下载按钮
        downloadBtn?.addEventListener('click', () => this.handleDownload());

        // 压缩其他文件
        compressAnotherBtn?.addEventListener('click', () => this.reset());

        // 重试
        tryAgainBtn?.addEventListener('click', () => this.retry());
    }

    /**
     * 处理文件
     */
    async handleFile(file) {
        console.log('处理文件:', file);
        this.currentFile = file;
        this.originalFile = file; // 保存原始文件，供重试使用

        // 验证文件类型
        const validTypes = [
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        ];
        
        if (!validTypes.includes(file.type) && !file.name.match(/\.(ppt|pptx)$/i)) {
            alert(this.t('errorType'));
            this.currentFile = null;
            this.originalFile = null;
            this._resetFileInput(); // 清空文件输入框
            return;
        }

        // 验证文件大小（从配置获取）
        const maxSize = envConfig.getMaxFileSizeBytes();
        if (file.size > maxSize) {
            // 检查用户权限
            const canUpload = this.checkUserPermission();
            
            if (!canUpload.allowed) {
                // 不是高级用户，显示付费弹框
                this.showUpgradePrompt('file_size_limit');
                
                this.currentFile = null;
                this.originalFile = null;
                this._resetFileInput(); // 清空文件输入框
                return;
            }
            
            // 如果用户有权限（付费用户且有使用次数），允许上传大文件
            console.log('✅ 付费用户，允许上传大文件');
        }

        // 显示文件选择界面（带删除字体选项）
        this.showFileSelected(file);
    }

    /**
     * 检查用户权限
     * @returns {Object} { allowed: boolean, reason: string }
     */
    checkUserPermission() {
        // 1. 检查是否登录
        // 从 navbar 的 Auth 实例中获取当前用户（同步访问）
        let currentUser = null;
        if (typeof navbar !== 'undefined' && navbar.authInstance) {
            currentUser = navbar.authInstance.currentUser;
        }
        
        if (!currentUser) {
            return { 
                allowed: false, 
                reason: 'not_logged_in' 
            };
        }

        // 2. 获取用户数据
        const userData = this.getUserData();
        console.log('userData',userData);
        // 3. 检查是否付费用户
        if (!userData.isPremium && userData.usageCount <= 0) {
            return { 
                allowed: false, 
                reason: 'not_premium' 
            };
        }

        // 4. 检查使用次数
        // if (userData.usageCount <= 0) {
        //     return { 
        //         allowed: false, 
        //         reason: 'no_usage_count' 
        //     };
        // }

        // 所有检查通过
        return { allowed: true };
    }

    /**
     * 获取用户数据
     */
    getUserData() {
        try {
            const cachedData = localStorage.getItem('userData');
            if (cachedData) {
                return JSON.parse(cachedData);
            }
        } catch (e) {
            console.error('解析用户数据失败:', e);
        }
        
        // 默认数据
        return {
            usageCount: 0,
            isPremium: false
        };
    }

    /**
     * 重置文件输入框（允许重复选择同一文件）
     */
    _resetFileInput() {
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.value = '';
        }
    }

    /**
     * 设置按钮加载状态
     * @param {HTMLButtonElement} button - 按钮元素
     * @param {boolean} isLoading - 是否加载中
     */
    setButtonLoading(button, isLoading) {
        if (!button) return;
        
        if (isLoading) {
            // 保存原始文本
            button.dataset.originalText = button.innerHTML;
            
            // 设置加载状态
            button.disabled = true;
            button.innerHTML = `
                <div class="spinner"></div>
                <span>${this.t('processing') || '处理中...'}</span>
            `;
        } else {
            // 恢复原始状态
            button.disabled = false;
            if (button.dataset.originalText) {
                button.innerHTML = button.dataset.originalText;
            }
        }
    }

    /**
     * 显示升级提示
     */
    showUpgradePrompt(reason) {
        // 获取升级提示的多语言配置
        const upgradeConfig = this.lang.compressor?.upgrade || {};
        
        let title, message, actionText;
        
        // 根据原因映射到对应的多语言配置
        let reasonKey;
        switch (reason) {
            case 'file_size_limit':
                reasonKey = 'fileSizeLimit';
                break;
            case 'not_logged_in':
                reasonKey = 'notLoggedIn';
                break;
            case 'not_premium':
                reasonKey = 'notPremium';
                break;
            case 'no_usage_count':
                reasonKey = 'noUsageCount';
                break;
            default:
                reasonKey = 'default';
        }
        
        // 获取对应的多语言文案
        const config = upgradeConfig[reasonKey] || upgradeConfig.default || {};
        title = config.title || '无法上传';
        message = config.message || '文件大小超出限制，请升级账户或联系客服。';
        actionText = config.action || '了解更多';

        // 创建自定义模态框
        const modalHTML = `
            <div class="upgrade-modal" id="upgradeModal">
                <div class="upgrade-modal-overlay"></div>
                <div class="upgrade-modal-content">
                    <div class="upgrade-modal-header">
                        <h3 class="upgrade-modal-title">${title}</h3>
                        <button class="upgrade-modal-close" id="upgradeModalClose">&times;</button>
                    </div>
                    <div class="upgrade-modal-body">
                        <div class="upgrade-icon">
                            ${reason === 'not_logged_in' ? 
                                '<svg width="60" height="60" viewBox="0 0 60 60" fill="none"><circle cx="30" cy="30" r="15" stroke="#a31e22" stroke-width="3"/><path d="M30 20v10M30 35v2" stroke="#a31e22" stroke-width="3" stroke-linecap="round"/></svg>' :
                                '<svg width="60" height="60" viewBox="0 0 60 60" fill="none"><path d="M30 10l8 16h16l-13 13 5 17-16-10-16 10 5-17-13-13h16z" fill="#fbbf24"/></svg>'
                            }
                        </div>
                        <p class="upgrade-message">${message}</p>
                    </div>
                    <div class="upgrade-modal-footer">
                        <button class="btn-upgrade" id="upgradeActionBtn">${actionText}</button>
                        <button class="btn-cancel" id="upgradeCancelBtn">${upgradeConfig.cancel || '取消'}</button>
                    </div>
                </div>
            </div>
        `;

        // 添加到页面
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // 添加样式（如果还没有）
        if (!document.getElementById('upgradeModalStyles')) {
            const styles = `
                <style id="upgradeModalStyles">
                    .upgrade-modal {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        z-index: 10001;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        animation: fadeIn 0.3s ease;
                    }
                    
                    .upgrade-modal-overlay {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(0, 0, 0, 0.6);
                        backdrop-filter: blur(4px);
                    }
                    
                    .upgrade-modal-content {
                        position: relative;
                        background: white;
                        border-radius: 16px;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                        width: 90%;
                        max-width: 440px;
                        animation: slideUp 0.3s ease;
                    }
                    
                    @keyframes slideUp {
                        from { transform: translateY(30px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                    
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    
                    @keyframes fadeOut {
                        from { opacity: 1; }
                        to { opacity: 0; }
                    }
                    
                    @keyframes slideDown {
                        from { transform: translateY(0); opacity: 1; }
                        to { transform: translateY(30px); opacity: 0; }
                    }
                    
                    .upgrade-modal.closing {
                        animation: fadeOut 0.3s ease forwards;
                    }
                    
                    .upgrade-modal.closing .upgrade-modal-content {
                        animation: slideDown 0.3s ease forwards;
                    }
                    
                    .upgrade-modal-header {
                        padding: 24px 24px 0;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                    
                    .upgrade-modal-title {
                        font-size: 22px;
                        font-weight: 700;
                        color: #111827;
                        margin: 0;
                    }
                    
                    .upgrade-modal-close {
                        width: 32px;
                        height: 32px;
                        border: none;
                        background: #f3f4f6;
                        color: #6b7280;
                        border-radius: 50%;
                        font-size: 24px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        line-height: 1;
                    }
                    
                    .upgrade-modal-close:hover {
                        background: #fef2f2;
                        color: #a31e22;
                        transform: rotate(90deg);
                    }
                    
                    .upgrade-modal-body {
                        padding: 32px 24px;
                        text-align: center;
                    }
                    
                    .upgrade-icon {
                        margin-bottom: 20px;
                    }
                    
                    .upgrade-icon svg {
                        display: inline-block;
                    }
                    
                    .upgrade-message {
                        font-size: 16px;
                        color: #374151;
                        line-height: 1.6;
                        margin: 0;
                    }
                    
                    .upgrade-modal-footer {
                        padding: 0 24px 24px;
                        display: flex;
                        gap: 12px;
                    }
                    
                    .btn-upgrade {
                        flex: 1;
                        padding: 12px 24px;
                        background: linear-gradient(135deg, #a31e22 0%, #d32f2f 100%);
                        color: white;
                        border: none;
                        border-radius: 50px;
                        font-size: 15px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        box-shadow: 0 4px 15px rgba(163, 30, 34, 0.3);
                    }
                    
                    .btn-upgrade:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 25px rgba(163, 30, 34, 0.4);
                    }
                    
                    .btn-cancel {
                        flex: 1;
                        padding: 12px 24px;
                        background: white;
                        color: #6b7280;
                        border: 2px solid #e5e7eb;
                        border-radius: 50px;
                        font-size: 15px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }
                    
                    .btn-cancel:hover {
                        border-color: #a31e22;
                        color: #a31e22;
                        background: #fef2f2;
                    }
                </style>
            `;
            document.head.insertAdjacentHTML('beforeend', styles);
        }

        // 绑定事件
        const modal = document.getElementById('upgradeModal');
        const closeBtn = document.getElementById('upgradeModalClose');
        const actionBtn = document.getElementById('upgradeActionBtn');
        const cancelBtn = document.getElementById('upgradeCancelBtn');

        const closeModal = () => {
            // 添加 closing class 来触发关闭动画
            modal.classList.add('closing');
            // 等待动画完成后再移除元素
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.remove();
                }
            }, 300);
        };

        closeBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);
        modal.querySelector('.upgrade-modal-overlay').addEventListener('click', closeModal);

        actionBtn.addEventListener('click', () => {
            closeModal();
            // 跳转到定价页面
            window.location.href = '/pricing.html';
        });
    }

    /**
     * 显示文件已选择界面（显示压缩等级选项）
     */
    showFileSelected(file) {
        console.log('显示文件选择界面');
        document.getElementById('uploadSection').style.display = 'none';
        document.getElementById('filePreviewSection').style.display = 'block';
        
        document.getElementById('fileCardName').textContent = file.name;
        document.getElementById('fileCardSize').textContent = this.formatFileSize(file.size);
        
        // 隐藏进度条
        const fileCardProgress = document.getElementById('fileCardProgress');
        const fileCard = document.querySelector('.file-card');
        if (fileCardProgress) {
            fileCardProgress.style.display = 'none';
            if (fileCard) fileCard.classList.remove('has-progress');
        }
        
        // 重置压缩等级为默认（高级-推荐）
        const advancedRadio = document.querySelector('input[name="compressionLevel"][value="2"]');
        if (advancedRadio) advancedRadio.checked = true;
        
        // 根据文件类型显示/隐藏兼容性选项
        const isPptx = file.name.toLowerCase().endsWith('.pptx');
        const compatibilityOptions = document.getElementById('compatibilityOptions');
        if (compatibilityOptions) {
            compatibilityOptions.style.display = isPptx ? 'block' : 'none';
            
            // 如果是 pptx，重置兼容性选项为默认值
            if (isPptx) {
                const anyDeviceRadio = document.querySelector('input[name="deviceCompatibility"][value="any"]');
                if (anyDeviceRadio) anyDeviceRadio.checked = true;
            }
        }
        
        this.state = 'file-selected';
    }

    /**
     * 上传并压缩文件（调用真实 API）
     */
    async uploadAndCompress(file) {
        try {
            console.log('开始上传和压缩');
            // 记录原始文件大小
            const originalSize = file.size;
            
            // 显示进度条
            const fileCardProgress = document.getElementById('fileCardProgress');
            const fileCard = document.querySelector('.file-card');
            if (fileCardProgress) {
                fileCardProgress.style.display = 'block';
                if (fileCard) fileCard.classList.add('has-progress');
            }
            
            // 获取选中的压缩等级
            const levelRadio = document.querySelector('input[name="compressionLevel"]:checked');
            const level = levelRadio ? parseInt(levelRadio.value) : 2;
            
            // 获取选中的设备兼容性（仅对 pptx 文件有效）
            const deviceRadio = document.querySelector('input[name="deviceCompatibility"]:checked');
            let device = 0; // 默认值：通用模式
            if (deviceRadio) {
                // 'any' -> 0 (通用模式), 'pc-mac' -> 1 (高画质模式)
                device = deviceRadio.value === 'pc-mac' ? 1 : 0;
            }
            
            console.log('压缩参数:', { level, device });
            
            this.state = 'uploading';
            
            // 调用 PPT 压缩 API（上传+处理一体）
            const result = await pptApi.compress(file, level, device, (percent) => {
                // 更新上传进度
                const status = percent < 100 ? this.t('uploading') : this.t('compressing');
                this.updateProgress(percent, status);
                
                // 上传完成后，切换到压缩状态
                if (percent === 100 && this.state === 'uploading') {
                    this.state = 'compressing';
                    
                    // 检查是否为高级用户且文件超过100M
                    const userData = this.getUserData();
                    const fileSizeLimit = 30 * 1024 * 1024; // 100MB && file.size > fileSizeLimit
                    if ((userData.isPremium || userData.usageCount >0) && file.size > fileSizeLimit ) {
                        // 高级用户且文件大于100M：延迟2秒后跳转到我的任务页面
                        setTimeout(() => {
                            window.location.href = '/works.html';
                        }, 5000);
                    }
                }
            });

            console.log('result',result)

            // 检查是否成功
            if (!result.success) {
                throw new Error(result.message || '压缩失败');
            }

            // 保存压缩结果
            this.currentFile = {
                fileName: result.data.name,
                originalSize: originalSize,
                compressedSize: result.data.sizeBytes,
                format: result.data.format,
                path: result.data.path,
                absPath: result.data.absPath,
                download: result.data.download,
                // 构建完整的下载 URL
                downloadUrl: envConfig.getDownloadUrl(result.data.download)
            };

            // 显示结果
            this.showResult(this.currentFile);

        } catch (error) {
            console.error('处理失败:', error);
            throw error;
        }
    }

    /**
     * 更新进度
     */
    updateProgress(percent, text) {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (progressFill) progressFill.style.width = percent + '%';
        
        // 当上传完成（100%）时，不显示百分比，并添加动画类
        if (progressText) {
            if (percent === 100) {
                progressText.textContent = text;
                progressText.classList.add('compressing-animation');
            } else {
                progressText.textContent = `${text} ${percent}%`;
                progressText.classList.remove('compressing-animation');
            }
        }
    }

    /**
     * 显示结果
     */
    showResult(fileInfo) {
        this.state = 'completed';
        
        document.getElementById('filePreviewSection').style.display = 'none';
        document.getElementById('resultSection').style.display = 'block';

        // 显示文件名和大小对比
        document.getElementById('resultFileName').textContent = fileInfo.fileName;
        document.getElementById('resultOriginalSize').textContent = 
            this.formatFileSize(fileInfo.originalSize);
        document.getElementById('resultCompressedSize').textContent = 
            this.formatFileSize(fileInfo.compressedSize);

        const saved = fileInfo.originalSize - fileInfo.compressedSize;
        const savedPercent = Math.round((saved / fileInfo.originalSize) * 100);
        
        document.getElementById('resultSaved').textContent = `(节省 ${savedPercent}%)`;
    }

    /**
     * 显示错误
     */
    showError(message) {
        this.state = 'error';
        
        document.getElementById('filePreviewSection').style.display = 'none';
        document.getElementById('errorSection').style.display = 'block';
        document.getElementById('errorMessage').textContent = message;
    }

    /**
     * 处理下载
     */
    async handleDownload() {
        if (!this.currentFile || !this.currentFile.downloadUrl) {
            console.error('没有可下载的文件');
            alert('下载链接不存在，请重新压缩');
            return;
        }

        try {
            // 使用通用下载管理器
            await downloadManager.download({
                downloadPath: this.currentFile.downloadUrl,
                fileName: this.currentFile.fileName,
                addCompressedSuffix: true,
                openInNewTab: true,
                onSuccess: (fileName) => {
                    console.log('✅ 下载成功:', fileName);
                },
                onError: (error) => {
                    console.error('❌ 下载失败:', error);
                    alert(error || '下载失败，请重试');
                }
            });
        } catch (error) {
            console.error('下载失败:', error);
            alert(error.message || '下载失败，请重试');
        }
    }

    /**
     * 重置
     */
    reset() {
        console.log('重置组件');
        
        this.currentFile = null;
        this.originalFile = null; // 清除原始文件
        this.state = 'idle';
        
        // 重置文件输入
        const fileInput = document.getElementById('fileInput');
        if (fileInput) fileInput.value = '';
        
        // 重置压缩等级为默认值（高级-推荐）
        const advancedRadio = document.querySelector('input[name="compressionLevel"][value="2"]');
        if (advancedRadio) advancedRadio.checked = true;
        
        // 重置兼容性选项为默认值
        const anyDeviceRadio = document.querySelector('input[name="deviceCompatibility"][value="any"]');
        if (anyDeviceRadio) anyDeviceRadio.checked = true;
        
        // 隐藏兼容性选项
        const compatibilityOptions = document.getElementById('compatibilityOptions');
        if (compatibilityOptions) {
            compatibilityOptions.style.display = 'none';
        }
        
        // 显示/隐藏区域
        document.getElementById('uploadSection').style.display = 'block';
        document.getElementById('filePreviewSection').style.display = 'none';
        document.getElementById('resultSection').style.display = 'none';
        document.getElementById('errorSection').style.display = 'none';
    }
    
    /**
     * 重试压缩（保留文件，回到文件预览界面）
     */
    retry() {
        console.log('重试压缩');
        
        if (!this.originalFile) {
            console.warn('没有原始文件，执行完全重置');
            this.reset();
            return;
        }
        
        // 隐藏错误区域
        document.getElementById('errorSection').style.display = 'none';
        
        // 显示文件预览界面
        this.showFileSelected(this.originalFile);
        
        console.log('已恢复到文件预览界面，可以再次压缩');
    }

    /**
     * 格式化文件大小
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
    }

    /**
     * 设置状态
     */
    setState(newState) {
        this.state = newState;
    }
}
