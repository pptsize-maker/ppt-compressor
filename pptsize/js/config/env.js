/**
 * 环境配置
 * 根据当前域名自动判断环境，或手动指定环境
 */

class EnvConfig {
    constructor() {
        this.env = this._detectEnvironment();
        
        // 文件大小限制配置（单位：MB）
        this.maxFileSize = 30; // 30MB
        this.maxFileSizeBytes = this.maxFileSize * 1024 * 1024;
    }

    /**
     * 检测当前环境
     */
    _detectEnvironment() {
        const hostname = window.location.hostname;

        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "tuh1r0xblx");
        console.log('Clarity script loaded');

        // 根据域名判断环境
        if (hostname === 'localhost' || hostname === '127.0.0.1') {

            return 'development';
        } else if (hostname.includes('staging') || hostname.includes('test')) {

            return 'staging';
        } else {

            console.log = function() {};
            console.error = function() {};
            console.warn = function() {};

            return 'production';
        }
    }

    /**
     * 获取当前环境
     */
    getEnv() {
        return this.env;
    }

    /**
     * 设置环境（手动覆盖）
     */
    setEnv(env) {
        if (['development', 'staging', 'production'].includes(env)) {
            this.env = env;
        } else {
            console.warn(`Invalid environment: ${env}`);
        }
    }

    /**
     * 获取 API 基础地址
     */
    getApiBaseUrl() {
        const config = {
            //development: '',
            development: '',
            staging: '',
            production: ''
        };
        return config[this.env];
    }

    /**
     * 获取 VIP API 地址（如果有专门的 VIP 服务器）
     */
    getVipApiBaseUrl() {
        // 暂时和普通 API 相同
        const config = {
            development: '',
            staging: '',
            production: ''
        };
        return config[this.env];
    }

    /**
     * 获取 Stripe Payment Links（按环境）
     * 返回 { oneTime, weekly, yearly }
     */
    getStripePaymentLinks() {
        const config = {
            development: {
                oneTime: 'https://buy.stripe.com/test_6oUdR2a0b6m94iL5AR2cg08',
                weekly: 'https://buy.stripe.com/test_9B65kw5JV25T16z5AR2cg09',
                yearly: 'https://buy.stripe.com/test_28E8wIc8jcKx3eH2oF2cg0a'
            },
            staging: {
                oneTime: 'https://buy.stripe.com/test_6oUdR2a0b6m94iL5AR2cg08',
                weekly: 'https://buy.stripe.com/test_9B65kw5JV25T16z5AR2cg09',
                yearly: 'https://buy.stripe.com/test_28E8wIc8jcKx3eH2oF2cg0a'
            },
            production: {
                oneTime: 'https://buy.stripe.com/8x2dR23dk6542dha1S1Nu00',
                weekly: 'https://buy.stripe.com/28EcMY7tAdxw7xB8XO1Nu01',
                yearly: 'https://buy.stripe.com/9B6bIU6pw2SScRV0ri1Nu02'
            }
        };
        return config[this.env];
    }

    /**
     * 获取 Stripe Customer Portal 直接链接
     * 从 Stripe Dashboard 获取的预配置链接
     * 返回 { test, production } - 测试环境和生产环境的链接
     */
    getStripeCustomerPortalLinks() {
        const config = {
            development: {
                // 测试环境 Portal 链接（从 Stripe Test Dashboard 获取）
                portal: '',
            },
            staging: {
                portal: '',
            },
            production: {
                // 生产环境 Portal 链接（从 Stripe Production Dashboard 获取）
                portal: '',
            }
        };
        return config[this.env];
    }

    /**
     * 获取 PPT 压缩接口地址（上传+处理一体）
     * 返回相对路径，配合 Request 实例的 baseURL 使用
     */
    getCompressUrl() {
        return '/compress/ppt';
    }

    /**
     * 获取 PDF 压缩接口地址（上传+处理一体）
     * 返回相对路径，配合 Request 实例的 baseURL 使用
     */
    getPdfCompressUrl () {
        return '/compress/file';
    }
    
    /**
     * 获取 PPT 压缩接口地址（带等级参数）
     * 返回相对路径，配合 Request 实例的 baseURL 使用
     */
    getCompressLevelUrl() {
        return '/compress/pptlevel';
    }

    /**
     * 获取文件下载地址
     * @param {string} downloadPath - 后端返回的 download 字段
     */
    getDownloadUrl(downloadPath) {
        // 如果 downloadPath 已经是完整 URL，直接返回
        if (downloadPath && (downloadPath.startsWith('http://') || downloadPath.startsWith('https://'))) {
            return downloadPath;
        }
        // 如果是相对路径，直接返回（让 Request 实例的 baseURL 自动拼接）
        return downloadPath;
    }

    /**
     * 是否为开发环境
     */
    isDevelopment() {
        return this.env === 'development';
    }

    /**
     * 是否为生产环境
     */
    isProduction() {
        return this.env === 'production';
    }

    /**
     * 获取最大文件大小（MB）
     */
    getMaxFileSize() {
        return this.maxFileSize;
    }
    
    /**
     * 获取最大文件大小（字节）
     */
    getMaxFileSizeBytes() {
        return this.maxFileSizeBytes;
    }
    
    /**
     * 格式化文件大小显示
     */
    formatMaxFileSize() {
        return `${this.maxFileSize}MB`;
    }

    /**
     * 获取 Supabase 配置
     */
    getSupabaseConfig() {
        const config = {
            development: {
                url: 'https://dpivmhgpibduwtcyueka.supabase.co',
                anonKey: ''
            },
            staging: {
                url: 'https://dpivmhgpibduwtcyueka.supabase.co',
                anonKey: ''
            },
            production: {
                url: 'https://dpivmhgpibduwtcyueka.supabase.co',
                anonKey: ''
            }
        };
        return config[this.env];
    }

    /**
     * 获取所有配置
     */
    getConfig() {
        return {
            env: this.env,
            apiBaseUrl: this.getApiBaseUrl(),
            vipApiBaseUrl: this.getVipApiBaseUrl(),
            stripePaymentLinks: this.getStripePaymentLinks(),
            compressUrl: this.getCompressUrl(),
            compressPdfUrl: this.getPdfCompressUrl(),
            maxFileSize: this.maxFileSize,
            maxFileSizeBytes: this.maxFileSizeBytes,
            isDevelopment: this.isDevelopment(),
            isProduction: this.isProduction()
        };
    }
}

// 创建全局单例
const envConfig = new EnvConfig();

// 开发时打印配置
if (envConfig.isDevelopment()) {
    console.log('🔧 Environment Config:', envConfig.getConfig());
}

// 导出到全局（供浏览器使用）
if (typeof window !== 'undefined') {
    window.ENV = envConfig;
}

// 导出模块（供 Node.js 使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EnvConfig, envConfig };
}


