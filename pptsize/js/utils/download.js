/**
 * 通用下载工具
 * 提供带防抖的文件下载功能
 */

class DownloadManager {
    constructor() {
        // 防抖时间（毫秒）
        this.throttleTime = 2000;
        // 创建带防抖的下载函数
        this._throttledDownload = _.throttle(this._executeDownload.bind(this), this.throttleTime);
    }

    /**
     * 下载文件（带防抖）
     * @param {Object} options - 下载选项
     * @param {string} options.downloadPath - 下载路径（相对或绝对）
     * @param {string} options.fileName - 原始文件名
     * @param {boolean} options.addCompressedSuffix - 是否添加 _compressed 后缀（默认 true）
     * @param {boolean} options.openInNewTab - 是否在新标签页打开（默认 true）
     * @param {Function} options.onSuccess - 成功回调
     * @param {Function} options.onError - 失败回调
     * @returns {Promise<Object>} { success: boolean, message?: string }
     */
    download(options) {
        return this._throttledDownload(options);
    }

    /**
     * 执行实际的下载操作
     */
    _executeDownload(options) {
        return new Promise((resolve, reject) => {
            const {
                downloadPath,
                fileName,
                addCompressedSuffix = true,
                openInNewTab = true,
                onSuccess,
                onError
            } = options;

            // 检查必需参数
            if (!downloadPath) {
                const error = '下载路径不存在';
                console.error('❌', error);
                if (onError) onError(error);
                reject({ success: false, message: error });
                return;
            }

            try {
                // 构建完整的下载 URL
                const downloadUrl = this._buildDownloadUrl(downloadPath);
                
                // 处理文件名
                const finalFileName = this._processFileName(fileName, addCompressedSuffix);
                
                // 执行下载
                if (openInNewTab) {
                    // 在新标签页打开下载链接
                    this._downloadInNewTab(downloadUrl, finalFileName);
                } else {
                    // 在当前页面触发下载
                    this._downloadInCurrentPage(downloadUrl, finalFileName);
                }
                
                console.log('✅ 文件下载已触发:', finalFileName);
                
                // 成功回调
                if (onSuccess) onSuccess(finalFileName);
                resolve({ success: true, fileName: finalFileName });
                
            } catch (error) {
                console.error('❌ 下载失败:', error);
                if (onError) onError(error.message);
                reject({ success: false, message: error.message });
            }
        });
    }

    /**
     * 构建完整的下载 URL
     */
    _buildDownloadUrl(downloadPath) {
        // 使用 envConfig 构建 URL
        if (typeof envConfig !== 'undefined' && envConfig.getDownloadUrl) {
            return envConfig.getDownloadUrl(downloadPath);
        }
        
        // 如果已经是完整 URL，直接返回
        if (downloadPath.startsWith('http://') || downloadPath.startsWith('https://')) {
            return downloadPath;
        }
        
        // 否则返回相对路径
        return downloadPath;
    }

    /**
     * 处理文件名（添加后缀等）
     */
    _processFileName(fileName, addCompressedSuffix) {
        if (!fileName) {
            return 'download.pptx';
        }
        
        // 如果需要添加 _compressed 后缀
        if (addCompressedSuffix) {
            return fileName.replace(/\.(ppt|pptx)$/i, '_compressed.$1');
        }
        
        return fileName;
    }

    /**
     * 在新标签页打开下载链接
     */
    _downloadInNewTab(downloadUrl, fileName) {
        // 在新标签页打开下载链接
        const newTab = window.open(downloadUrl, '_blank');
        
        // 如果浏览器阻止了弹窗，fallback 到当前页面下载
        if (!newTab) {
            console.warn('⚠️ 新标签页被阻止，使用当前页面下载');
            this._downloadInCurrentPage(downloadUrl, fileName);
        }
    }

    /**
     * 在当前页面触发下载
     */
    _downloadInCurrentPage(downloadUrl, fileName) {
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = fileName;
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        
        // 清理
        setTimeout(() => {
            document.body.removeChild(link);
        }, 100);
    }

    /**
     * 立即下载（不带防抖）
     * 用于特殊场景
     */
    downloadImmediate(options) {
        return this._executeDownload(options);
    }
}

// 创建全局单例
const downloadManager = new DownloadManager();

// 导出到全局（供浏览器使用）
if (typeof window !== 'undefined') {
    window.downloadManager = downloadManager;
}

// 导出模块（供 Node.js 使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DownloadManager, downloadManager };
}

