/**
 * 用户相关 API
 */

class UserAPI {
    /**
     * 获取用户信息
     */
    async getUserInfo() {
        try {
            const response = await request.post('/user/info');
            return { success: true, data: response };
        } catch (error) {
            console.error('获取用户信息失败:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * 构造 Stripe Customer Portal URL（带预填充邮箱）
     * @param {string} email - 用户邮箱
     * @returns {string} - Customer Portal URL
     */
    getCustomerPortalUrl(email) {
        const portalConfig = envConfig.getStripeCustomerPortalLinks();
        const baseUrl = portalConfig.portal;
        
        // 拼接邮箱参数（按照 Stripe 官方文档格式）
        if (email) {
            return `${baseUrl}?prefilled_email=${encodeURIComponent(email)}`;
        }
        
        return baseUrl;
    }

    /**
     * 打开 Stripe Customer Portal
     * 用于让 VIP 用户管理订阅、更新支付方式、查看发票等
     * @param {string} email - 用户邮箱（必填）
     * @returns {Object} - { success, error }
     */
    openCustomerPortal(email) {
        if (!email) {
            console.error('打开 Customer Portal 失败: 缺少用户邮箱');
            return { success: false, error: '缺少用户邮箱' };
        }
        
        try {
            const portalUrl = this.getCustomerPortalUrl(email);
            window.location.href = portalUrl;
            return { success: true };
        } catch (error) {
            console.error('打开 Customer Portal 失败:', error);
            return { success: false, error: error.message || '无法打开订阅管理页面' };
        }
    }

    /**
     * 处理用户数据
     * @param {Object} userData - 后端返回的用户数据
     * @returns {Object} - { usageCount, isPremium }
     */
    parseUserData(userData) {
        // 如果数据为空，返回默认值
        if (!userData) {
            return {
                usageCount: 0,
                worksCount: 0,
                isPremium: false
            };
        }

        // 获取充值次数（counts）
        const usageCount = userData.counts || 0;
        
        // 获取任务次数（works）
        const worksCount = userData.works || 0;

        // 判断是否为付费用户
        // vipEndTime 存在且大于当前时间才是付费用户
        // let isPremium = false;
        // if (userData.isPremium) {

        //     try {
        //         // 后端返回的是毫秒时间戳
        //         const vipEndTime = new Date(userData.vipEndTime);
        //         const now = new Date();
        //         isPremium = vipEndTime > now;
        //     } catch (e) {
        //         console.error('❌ 解析 VIP 结束时间失败:', e);
        //         isPremium = false;
        //     }
        // }
        console.log('userData',userData);
        return {
            usageCount,
            worksCount,
            isPremium:userData.premium,
            email: userData.email,
            displayName: userData.displayName,
            phoneNumber: userData.phoneNumber,
            vipEndTime: userData.vipEndTime,
            createTime: userData.createTime
        };
    }
}

// 创建全局单例
const userAPI = new UserAPI();

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { UserAPI, userAPI };
}

