/**
 * PDF 压缩 API
 * 封装 PDF 相关的接口调用
 */

class PdfApi {
    /**
     * 压缩 PDF（上传+处理一体）
     * @param {File} file - PDF 文件
     * @param {Function} onProgress - 进度回调函数
     * @returns {Promise} 返回压缩结果
     */
    async compress(file, onProgress = null) {
        try {
            console.log('🚀 PDF API compress() 开始');
            console.log('📁 文件名:', file.name);
            console.log('📏 文件大小:', this.formatFileSize(file.size));
            console.log('🔗 接口地址:', envConfig.getPdfCompressUrl());
            console.log('📊 进度回调:', onProgress ? '已提供' : '未提供');
            
            // 准备额外参数
            const params = {
                filename: file.name
            };
            
            // 调用上传接口（使用配置中的 PDF 压缩接口）
            const result = await request.upload(
                envConfig.getPdfCompressUrl(),
                file,
                params,
                onProgress
            );
            
            console.log('✅ PDF API 上传完成，返回结果:', result);

            // 返回标准化的结果
            return {
                success: true,
                data: {
                    // 文件名
                    name: result.name,
                    
                    // 文件大小（字节）
                    sizeBytes: result.sizeBytes,
                    
                    // 文件大小（格式化字符串，如 "2.5 MB"）
                    size: result.size,
                    
                    // 文件格式
                    format: result.format,
                    
                    // 相对路径
                    path: result.path,
                    
                    // 绝对路径
                    absPath: result.absPath,
                    
                    // 下载地址（可能是相对路径或完整 URL）
                    download: result.download,
                    
                    // 完整下载 URL
                    downloadUrl: envConfig.getDownloadUrl(result.download)
                }
            };
        } catch (error) {
            console.error('PDF 压缩失败:', error);
            return {
                success: false,
                message: error.message || '压缩失败，请重试'
            };
        }
    }

    /**
     * 下载压缩后的文件
     * @param {string} downloadPath - 下载路径（后端返回的 download 字段）
     * @param {string} fileName - 保存的文件名
     */
    async download(downloadPath, fileName) {
        try {
            const downloadUrl = envConfig.getDownloadUrl(downloadPath);
            await request.download(downloadUrl, fileName);
            return { success: true };
        } catch (error) {
            console.error('下载失败:', error);
            return {
                success: false,
                message: error.message || '下载失败，请重试'
            };
        }
    }

    /**
     * 格式化文件大小
     * @param {number} bytes - 字节数
     * @returns {string} 格式化后的大小
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
    }

    /**
     * 计算压缩比例
     * @param {number} originalSize - 原始大小（字节）
     * @param {number} compressedSize - 压缩后大小（字节）
     * @returns {number} 节省的百分比
     */
    calculateSavedPercent(originalSize, compressedSize) {
        if (originalSize === 0) return 0;
        return Math.round(((originalSize - compressedSize) / originalSize) * 100);
    }
}

// 创建全局实例
const pdfApi = new PdfApi();

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PdfApi, pdfApi };
}

