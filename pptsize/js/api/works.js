/**
 * 任务相关 API
 */

class WorksAPI {
    /**
     * 获取用户任务列表
     * @returns {Promise<Object>} { success: boolean, data: Array|null }
     */
    async getWorks() {
        try {
            const response = await request.post('/user/works');
            
            // 调试：打印第一条数据的日期格式
            if (response && response.length > 0) {
                console.log('📅 后端返回的日期格式示例:', {
                    createTime: response[0].createTime,
                    updateTime: response[0].updateTime,
                    createTimeType: typeof response[0].createTime,
                    isArray: Array.isArray(response[0].createTime)
                });
            }
            
            return { success: true, data: response };
        } catch (error) {
            console.error('获取任务列表失败:', error);
            return { success: false, error: error.message, data: null };
        }
    }

    /**
     * 格式化任务状态
     * @param {number} status - 状态码
     * @returns {Object} { text: string, color: string, icon: string }
     */
    getStatusInfo(status) {
        const statusMap = {
            1: { text: 'processing', color: 'blue', icon: '⏳' },   // 处理中
            2: { text: 'success', color: 'green', icon: '✅' },     // 处理成功
            3: { text: 'failed', color: 'red', icon: '❌' }         // 处理失败
        };
        return statusMap[status] || { text: 'unknown', color: 'gray', icon: '❓' };
    }

    /**
     * 格式化日期
     * @param {string|Date|Array|number} dateStr - 日期字符串、Date 对象、数组或时间戳
     * @returns {string} 格式化后的日期
     */
    formatDate(dateStr) {
        if (!dateStr) return '-';
        
        try {
            let date;
            
            // 如果是数组格式（Java LocalDateTime 序列化后可能是 [year, month, day, hour, minute, second]）
            if (Array.isArray(dateStr)) {
                const [year, month, day, hour = 0, minute = 0, second = 0] = dateStr;
                date = new Date(year, month - 1, day, hour, minute, second);
            } 
            // 如果是数字（时间戳）
            else if (typeof dateStr === 'number') {
                date = new Date(dateStr);
            }
            // 字符串或其他格式
            else {
                date = new Date(dateStr);
            }
            
            // 检查日期是否有效
            if (isNaN(date.getTime())) {
                console.warn('⚠️ 无效的日期格式:', dateStr, '(类型:', typeof dateStr, ')');
                return '-';
            }
            
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            
            return `${year}-${month}-${day} ${hours}:${minutes}`;
        } catch (e) {
            console.error('❌ 日期格式化失败:', e, dateStr);
            return '-';
        }
    }

    /**
     * 下载文件
     * @param {string} downloadPath - 下载路径
     * @param {string} fileName - 文件名
     */
    async downloadFile(downloadPath, fileName) {
        try {
            const downloadUrl = envConfig.getDownloadUrl(downloadPath);
            
            // 创建隐藏的 a 标签触发下载
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = fileName || 'download.pptx';
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            return { success: true };
        } catch (error) {
            console.error('下载文件失败:', error);
            return { success: false, error: error.message };
        }
    }
}

// 创建全局单例
const worksAPI = new WorksAPI();

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WorksAPI, worksAPI };
}

