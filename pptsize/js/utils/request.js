/**
 * Axios 请求工具类
 * 封装常用的 HTTP 请求方法
 */

class Request {
    constructor() {
        // VIP 状态标志（默认非 VIP）
        this._isVipUser = false;
        this._usageCount = 0;
        
        // 创建默认 axios 实例（普通通道）
        this.instance = axios.create({
            baseURL: envConfig.getApiBaseUrl(),
            timeout: 99999999,
            headers: {
                'Content-Type': 'application/json',
                'aut':'RuoYouShiWu'
            }
        });

        // 设置拦截器
        this._setupRequestInterceptor();
        this._setupResponseInterceptor();
    }

    /**
     * 请求拦截器
     */
    _setupRequestInterceptor() {
        const interceptor = (config) => {
            // 添加时间戳（防止缓存）
            if (config.method === 'get') {
                config.params = {
                    ...config.params,
                    _t: Date.now()
                };
            }

            // 添加 token
            const token = this._getToken();
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }

            // 添加 openid
            const openid = this._getOpenId();
            if (openid) {
                config.headers['openid'] = openid;
            }

            return config;
        };

        this.instance.interceptors.request.use(interceptor, this._handleError);
    }

    /**
     * 响应拦截器
     */
    _setupResponseInterceptor() {
        const interceptor = (response) => {
            // 统一处理响应数据
            const { data } = response;
            console.log('data',data)

            // 如果后端返回的是标准格式 { code, data, message }
            if (data && typeof data.code !== 'undefined') {
                if (data.code === 200 || data.code === 0) {
                    return data.data; // 返回实际数据
                } else {
                    // 业务错误
                    return Promise.reject({
                        code: data.code,
                        message: data.msg || '请求失败'
                    });
                }
            }

            // 直接返回数据
            return data;
        };

        this.instance.interceptors.response.use(interceptor, this._handleError);
    }

    /**
     * 错误处理
     */
    _handleError(error) {
        let message = '网络请求失败';
        console.log('error',error)

        if (error.response) {
            const { status, data, msg } = error.response;
            

            switch (status) {
                case 400:
                    message = data.message || '请求参数错误';
                    break;
                case 401:
                    message = '未授权，请重新登录';
                    // 可以在这里触发登录逻辑
                    break;
                case 403:
                    message = '拒绝访问';
                    break;
                case 404:
                    message = '请求的资源不存在';
                    break;
                case 413:
                    // 使用配置中的文件大小限制
                    const maxSize = envConfig ? envConfig.formatMaxFileSize() : '30MB';
                    message = `文件太大，无法上传。请选择小于 ${maxSize} 的文件`;
                    break;
                case 500:
                    message = '服务器内部错误';
                    break;
                case 503:
                    message = '服务暂时不可用';
                case 504:
                    message = 'timeout';
                case 524:
                    message = '请求超时，高级用户已生成自动任务';
                    break;
                default:
                    message = msg || `请求失败 (${status})`;
            }
        } else if (error.request) {
            // 请求已发送但没有收到响应
            message = '网络连接失败，请检查网络';
        } else {
            // 其他错误
            message = error.message || '请求配置错误';
        }

        return Promise.reject({ message, error });
    }

    /**
     * 获取 Token
     * 返回 null 或空字符串表示未登录，允许未登录用户使用程序
     */
    _getToken() {
        // 从 localStorage 获取 token，如果没有返回空字符串
        // 这样允许未登录用户也可以正常使用程序
        return localStorage.getItem('token') || '';
    }

    /**
     * 设置 Token
     * @param {string|null} token - 用户 token，传入 null 表示清除 token（登出）
     */
    setToken(token) {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            // 清除 token（用户登出时调用）
            localStorage.removeItem('token');
        }
    }

    /**
     * 获取 OpenId
     */
    _getOpenId() {
        // 从 localStorage 获取 openid，如果没有则生成一个临时的
        let openid = localStorage.getItem('openid');
        if (!openid) {
            // 生成临时 openid（使用时间戳 + 随机数）
            openid = 'temp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('openid', openid);
        }
        return openid;
    }

    /**
     * 设置 OpenId
     */
    setOpenId(openid) {
        if (openid) {
            localStorage.setItem('openid', openid);
        } else {
            localStorage.removeItem('openid');
        }
    }

    /**
     * 更新 VIP 状态
     */
    updateVipStatus(isPremium = false, usageCount = 0) {
        this._isVipUser = isPremium;
        this._usageCount = usageCount;
        
        // 判断是否应该使用 VIP 通道
        const shouldUseVip = isPremium || usageCount > 0;
        
        // 直接替换 baseURL
        this.instance.defaults.baseURL = shouldUseVip ? 
            envConfig.getVipApiBaseUrl() : 
            envConfig.getApiBaseUrl();
    }

    /**
     * GET 请求
     */
    get(url, params = {}) {
        return this.instance.get(url, { params });
    }

    /**
     * POST 请求
     */
    post(url, data = {}) {
        return this.instance.post(url, data);
    }

    /**
     * PUT 请求
     */
    put(url, data = {}) {
        return this.instance.put(url, data);
    }

    /**
     * DELETE 请求
     */
    delete(url, params = {}) {
        return this.instance.delete(url, { params });
    }

    /**
     * 上传文件
     * @param {string} url - 上传地址
     * @param {File} file - 文件对象
     * @param {Object} params - 额外参数 {delFont, filename, ...}
     * @param {Function} onProgress - 进度回调
     */
    upload(url, file, params = {}, onProgress = null) {
        // 兼容旧的调用方式（第三个参数是函数）
        if (typeof params === 'function') {
            onProgress = params;
            params = {};
        }
        
        const formData = new FormData();
        formData.append('file', file);
        
        // 添加额外参数
        if (params && typeof params === 'object') {
            Object.keys(params).forEach(key => {
                formData.append(key, params[key]);
            });
        }

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };

        // 如果提供了进度回调
        if (onProgress && typeof onProgress === 'function') {
            config.onUploadProgress = (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                onProgress(percentCompleted);
            };
        }

        return this.instance.post(url, formData, config);
    }

    /**
     * 下载文件
     */
    download(url, filename) {
        return this.instance.get(url, {
            responseType: 'blob'
        }).then(blob => {
            // 创建下载链接
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = filename || 'download';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
            
            return { success: true };
        });
    }

    /**
     * 并发请求
     */
    all(requests) {
        return axios.all(requests);
    }
}

// 创建全局实例
const request = new Request();

// 导出到全局
if (typeof window !== 'undefined') {
    window.request = request;
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Request, request };
}

