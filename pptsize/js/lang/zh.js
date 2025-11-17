/**
 * 中文语言包
 */
const zh = {
    // SEO Meta信息
    seo: {
        title: 'PPT压缩 - 免费在线压缩PPT文件，减小PPT大小 | pptsize',
        description: '免费在线PPT压缩工具，快速减小PPT文件大小，支持压缩图片、视频、音频。无需安装软件，在线即压即用，保持文件高清质量。支持.ppt和.pptx格式，兼容WPS和Office。',
        keywords: 'PPT压缩,压缩PPT,PPT文件压缩,减小PPT大小,PPT瘦身,在线PPT压缩,免费PPT压缩,PPT压缩软件,PPT文件太大,如何压缩PPT'
    },
    
    // 页面内容
    content: {
        advantages: {
            title: '我们的优势',
            description: '最大压缩率为<strong>90%</strong>，保持<strong>绝对的高清</strong>，不管是4K、2K还是1080p的显示器上都能完美显示。'
        },
        howto: {
            title: '如何压缩 PPT ？',
            items: [
                {
                    title: '1. 图片压缩',
                    description: 'PowerPoint 文件中的图片通常占据较大空间。通过<strong>图片压缩</strong>，<strong>剪裁</strong>，<strong>缩放图片</strong>。pptsize 可以轻松压缩所有图片，减轻文件负担，并始终保持<strong>高清画质</strong>。无论您使用 8K、4K 还是 1080p 显示器，压缩后的文件在高清显示下依然清晰可见。'
                },
                {
                    title: '2. 音频、视频、附件压缩',
                    description: 'PowerPoint 音频，视频，附件是 PPT 文件体积膨胀的重要原因，pptsize 提供的压缩工具可以帮助您<strong>压缩音频和视频</strong>，确保文件更轻便，同时保持良好的播放质量。'
                },
                {
                    title: '3. 删除嵌入字体',
                    description: '单个字体占用内存大约为<strong>10M</strong>，请不要嵌入字体，选择电脑自带的常用字体（如 Arial 或 Calibri等）替代自定义字体，您不仅能减少文件大小，还能提高文件的兼容性和易用性。'
                }
            ]
        }
    },
    
    // 认证组件
    auth: {
        login: '登录',
        signup: '注册',
        logout: '退出',
        email: '邮箱',
        password: '密码',
        confirmPassword: '确认密码',
        forgotPassword: '忘记密码？',
        resetPassword: '重置密码',
        noAccount: '还没有账号？',
        hasAccount: '已有账号？',
        signupNow: '立即注册',
        loginNow: '立即登录',
        pricing: '定价',
        backToLogin: '返回登录',
        loginBtn: '登录',
        signupBtn: '注册',
        sendResetEmail: '发送重置邮件',
        emailPlaceholder: '请输入邮箱',
        passwordPlaceholder: '请输入密码（至少6位）',
        confirmPasswordPlaceholder: '请再次输入密码',
        emailRequired: '请输入邮箱',
        passwordRequired: '请输入密码',
        passwordMismatch: '两次密码输入不一致',
        processing: '处理中...',
        loginSuccess: '登录成功',
        signupSuccess: '注册成功',
        resetEmailSent: '重置邮件已发送，请查收',
        resetPasswordInfo: '我们将向您的邮箱发送密码重置链接',
        unknownError: '发生未知错误',
        welcome: '欢迎，',
        continueWithGoogle: '使用 Google 账号继续',
        continueWithMicrosoft: '使用 Microsoft 账号继续',
        redirecting: '正在跳转到授权页面...',
        or: '或',
        usageCount: '高级次数',
        times: '次',
        freeUser: '免费用户',
        premiumUser: '付费用户',
        myAccount: '我的账户',
        myWorks: '我的任务',
        tasks: '个',
        manageSubscription: '管理订阅'
    },
    
    // PPT压缩组件
    compressor: {
        title: '在线 PPT 压缩工具',
        subtitle: '快速压缩您的 PowerPoint 文件，保持高质量',
        upload: '选择文件',
        or: '或',
        drag: '拖拽文件到这里',
        supported: '支持 .ppt 和 .pptx 格式',
        limit: '免费文件大小：{size}',
        compressionLevel: '压缩等级',
        levelStandard: '标准',
        levelAdvanced: '高级',
        levelMaximum: '最大',
        recommended: '推荐',
        levelAdvancedTip: '会删除嵌入字体，使用电脑常用字体来代替',
        levelMaximumTip: '会删除嵌入字体，使用电脑常用字体来代替，请确保显示设备为2K以下',
        deviceCompatibility: '压缩模式',
        anyDevice: '通用模式',
        anyDeviceTip: '所有设备兼容模式',
        pcMacDevice: '高画质模式',
        pcMacDeviceTip: '如果你不在安卓app（wps office除外的）软件上使用，推荐使用此模式，无损，快速，压缩率更高',
        removeFile: '移除',
        startCompress: '开始压缩',
        processing: '处理中...',
        uploading: '上传中...(高级用户任务生成中，请勿离开页面)',
        compressing: '媒体压缩比较耗时，请勿关闭页面，10分钟超时（高级用户生成任务，可在任务列表查看，压缩完成邮件通知）',
        fileName: '文件名',
        original: '原始大小',
        compressed: '压缩后',
        saved: '节省了',
        download: '下载压缩文件',
        uploadAnother: '压缩其他文件',
        failed: '压缩失败',
        tryAgain: '重试',
        errorType: '请上传 .ppt 或 .pptx 格式的文件',
        errorSize: '文件大小不能超过 {size}',
        error413: '文件太大，无法上传。服务器限制最大 {size}',
        errorNetwork: '网络连接失败，请检查网络后重试',
        errorServer: '服务器处理失败，请稍后重试',
        // 升级弹框
        upgrade: {
            fileSizeLimit: {
                title: '文件超出大小限制',
                message: '当前文件超出免费用户限制。升级为付费用户，享受更大文件压缩和更多功能！',
                action: '开通付费计划'
            },
            notLoggedIn: {
                title: '请先登录',
                message: '登录后即可压缩更大的文件。立即登录开始使用！',
                action: '立即登录'
            },
            notPremium: {
                title: '需要付费计划',
                message: '当前文件超出免费用户限制。升级为付费用户，享受更大文件压缩和更多功能！',
                action: '开通付费计划'
            },
            noUsageCount: {
                title: '使用次数已用完',
                message: '您的使用次数已用完。充值后可继续使用压缩服务！',
                action: '立即充值'
            },
            default: {
                title: '无法上传',
                message: '文件大小超出限制，请升级账户或联系客服。',
                action: '了解更多'
            },
            cancel: '取消'
        }
    },
    
    // 我的任务
    works: {
        pageTitle: '我的任务',
        metaDescription: '查看您的 PPT 压缩任务列表，下载已完成的文件',
        notice: '温馨提示：本页面仅展示最近 10 条任务记录。pptsize 不提供永久存储服务，文件可能随时被清理，请及时下载保存！',
        loading: '正在加载任务列表...',
        loadError: '加载失败',
        retry: '重试',
        empty: '暂无任务记录',
        emptyHint: '压缩文件后，任务会显示在这里',
        loginRequired: '请先登录',
        loginHint: '登录后即可查看您的任务列表',
        unknownFile: '未知文件',
        download: '下载',
        downloading: '下载中',
        downloadSuccess: '下载成功',
        downloadError: '下载失败',
        saved: '节省',
        status: {
            processing: '处理中',
            success: '处理成功',
            failed: '处理失败',
            unknown: '未知状态'
        }
    },
    
    // 定价页面
    pricing: {
        pageTitle: '定价方案',
        metaDescription: '选择适合您的 PPT 压缩方案，灵活定价，按需付费',
        title: '选择适合您的方案',
        subtitle: '灵活定价，按需付费，解锁更多高级功能',
        monthly: '月付',
        yearly: '年付',
        payOnce: '按次付费',
        mostPopular: '最受欢迎',
        bestValue: '最超值',
        currentPlan: '当前方案',
        selectPlan: '选择方案',
        loginRequired: '登录后购买',
        features: '功能特性',
        plans: {
            payPerUse: {
                name: '按次付费',
                price: '$1',
                priceUnit: '/次',
                description: '适合偶尔使用的用户',
                features: [
                    '单次压缩服务',
                    '文件大小限制 800MB',
                    '任务临时保留',
                    '完成邮件提醒'
                ]
            },
            weekly: {
                name: '30天高级',
                price: '$7',
                priceUnit: '/30天',
                description: '适合短期高频使用',
                features: [
                    '30天内不限次数使用',
                    '文件大小限制 800MB',
                    '任务临时保留',
                    '完成邮件提醒',
                    'VIP 专属通道',
                    '实时处理服务',
                    '优先技术支持'
                ]
            },
            yearly: {
                name: '一年高级',
                price: '$50',
                priceUnit: '/年',
                description: '适合长期用户，性价比最高',
                features: [
                    '365天内不限次数使用',
                    '文件大小限制 800MB',
                    '任务临时保留',
                    '完成邮件提醒',
                    'VIP 专属通道',
                    '实时处理服务',
                    '优先技术支持'
                ],
                badge: '省 $14',
                savings: '相当于每月仅 $4.17'
            }
        },
        comparisonTable: {
            title: '功能对比',
            free: '免费版',
            premium: '付费版',
            features: {
                fileSize: '文件大小限制',
                fileSizeFree: '30MB',
                fileSizePremium: '800MB',
                taskStorage: '任务保留',
                taskStorageFree: '不保留',
                taskStoragePremium: '临时保留',
                channel: '处理通道',
                channelFree: '标准通道',
                channelPremium: 'VIP专属*',
                speed: '处理速度',
                speedFree: '标准',
                speedPremium: '实时优先*',
                support: '技术支持',
                supportFree: '社区支持',
                supportPremium: '优先支持*'
            },
            note: '* 仅七天高级和一年高级方案提供'
        },
        faq: {
            title: '常见问题',
            questions: [
                {
                    q: '如何支付？',
                    a: '我们支持信用卡、借记卡等多种支付方式。'
                },
                {
                    q: '可以随时取消吗？',
                    a: '当然可以。您可以随时在账户设置中取消订阅。'
                },
                {
                    q: '有退款政策吗？',
                    a: '如果您在购买后 7 天内不满意，可以申请全额退款。'
                },
                {
                    q: '高级版的文件大小限制是多少？',
                    a: '高级版文件大小限制为 800M，可以满足绝大多数使用场景。'
                },
                {
                    q: '文件隐私安全吗？',
                    a: '完全安全。服务器仅在压缩过程中暂存文件，处理完成后立即删除，不做任何存储。您的文件完全保密，不会泄露。'
                },
                {
                    q: '压缩后的文件在某些软件中无法正常显示怎么办？',
                    a: '由于 pptsize 采用最新的压缩技术，建议在主流专业软件中打开，如 WPS、Microsoft Office、PowerPoint 等。这些软件能完美支持压缩后的文件格式。'
                }
            ]
        }
    },
    
    // 页脚
    footer: {
        aboutUs: '关于我们',
        aboutDesc: 'pptsize 是一个专业的 PPT 压缩工具，帮助您快速减小演示文稿大小，同时保持高质量。',
        fromText: '我们来自于',
        fromLink: 'apadog.com',
        contactText: '如果您有任何问题可以给我们发送邮件',
        contactEmail: 'pptsize@gmail.com',
        product: '产品',
        home: '首页',
        faq: '常见问题',
        changelog: '更新日志',
        support: '支持',
        helpCenter: '帮助中心',
        contact: '联系我们',
        feedback: '反馈建议',
        apiDocs: 'API 文档',
        status: '系统状态',
        legal: '法律',
        privacy: '隐私政策',
        terms: '服务条款',
        cookies: 'Cookie 政策',
        license: '许可协议',
        security: '安全说明',
        copyright: ' 保留所有权利。',
        madeWith: '用',
        madeIn: '制作',
        backToTop: '返回顶部'
    },
    
    // 隐私政策页面
    privacy: {
        pageTitle: '隐私政策',
        metaDescription: '了解pptsize如何收集、使用和保护您的个人信息',
        lastUpdated: '最后更新',
        sections: {
            intro: {
                title: '简介',
                content: 'pptsize（"我们"、"我们的"）重视您的隐私。本隐私政策说明我们如何收集、使用、披露和保护您在使用我们的PPT压缩服务时的个人信息。'
            },
            collect: {
                title: '我们收集的信息',
                items: [
                    '账户信息：邮箱地址、显示名称（当您注册账户时）',
                    '第三方登录：通过Google或Microsoft登录时的基本个人资料信息',
                    '文件信息：您上传的PPT文件（仅临时存储用于压缩处理）',
                    '使用数据：IP地址、浏览器类型、访问时间、使用次数',
                    'Cookies：用于保持登录状态和语言偏好'
                ]
            },
            use: {
                title: '信息使用方式',
                items: [
                    '提供PPT压缩服务',
                    '管理您的账户和会员状态',
                    '处理支付和订阅',
                    '改进我们的服务质量',
                    '发送服务相关通知',
                    '防止欺诈和滥用'
                ]
            },
            storage: {
                title: '数据存储',
                items: [
                    '用户认证数据：存储在Supabase（符合GDPR标准）',
                    '上传文件：临时存储，处理完成后自动删除',
                    '免费用户任务：不保留',
                    '付费用户任务：临时保留，随时可能被清理'
                ]
            },
            sharing: {
                title: '信息共享',
                content: '我们不会出售您的个人信息。我们仅在以下情况下共享信息：',
                items: [
                    '服务提供商：Supabase（认证）、支付处理商',
                    '法律要求：遵守法律、法规或法律程序',
                    '保护权利：保护我们的权利、隐私、安全或财产'
                ]
            },
            rights: {
                title: '您的权利',
                items: [
                    '访问您的个人数据',
                    '更正不准确的数据',
                    '删除您的账户和数据',
                    '导出您的数据',
                    '撤回同意',
                    '反对数据处理'
                ]
            },
            security: {
                title: '数据安全',
                content: '我们采用行业标准的安全措施保护您的数据，包括加密传输、安全存储和访问控制。'
            },
            contact: {
                title: '联系我们',
                content: '如有隐私相关问题，请联系：pptsize@gmail.com'
            }
        }
    },
    
    // 服务条款页面
    terms: {
        pageTitle: '服务条款',
        metaDescription: 'pptsize服务条款和使用协议',
        lastUpdated: '最后更新',
        sections: {
            intro: {
                title: '接受条款',
                content: '使用pptsize服务即表示您同意遵守这些服务条款。如果您不同意，请勿使用我们的服务。'
            },
            service: {
                title: '服务说明',
                items: [
                    'pptsize提供在线PPT文件压缩服务',
                    '免费版提供基础压缩功能，文件大小限制30MB',
                    '付费版提供高级功能，文件大小限制800MB',
                    '压缩之后的文件我们只保证在主流的编辑器里面显示如WPS、Office、Mac',
                    '我们保留随时修改或终止服务的权利'
                ]
            },
            user: {
                title: '用户责任',
                items: [
                    '您必须年满18岁或在监护人同意下使用',
                    '提供准确的注册信息',
                    '保护账户安全',
                    '不上传违法、侵权或恶意文件',
                    '不滥用或破坏服务',
                    '不进行未经授权的访问'
                ]
            },
            content: {
                title: '内容和知识产权',
                items: [
                    '您保留上传内容的所有权',
                    '您授权我们临时存储和处理您的文件',
                    '我们不对您上传的内容负责',
                    'pptsize的所有知识产权归我们所有'
                ]
            },
            payment: {
                title: '付费和退款',
                items: [
                    '按次付费：$1/次，无退款',
                    '订阅服务：按订阅期限收费',
                    '7天内不满意可申请全额退款',
                    '退款后会员权益立即终止'
                ]
            },
            limitation: {
                title: '免责声明',
                items: [
                    '服务按"现状"提供，不提供任何明示或暗示的保证',
                    '我们不保证服务不间断或无错误',
                    '我们不对数据丢失或文件损坏负责',
                    '我们不对因使用服务造成的任何损失负责'
                ]
            },
            termination: {
                title: '终止',
                content: '我们保留在不通知的情况下终止或暂停违反条款的账户的权利。'
            },
            changes: {
                title: '条款变更',
                content: '我们可能随时更新这些条款。重大变更将通过电子邮件通知您。'
            },
            contact: {
                title: '联系我们',
                content: '如有疑问，请联系：pptsize@gmail.com'
            }
        }
    },
    
    // Cookie政策页面
    cookies: {
        pageTitle: 'Cookie 政策',
        metaDescription: '了解pptsize如何使用Cookies',
        lastUpdated: '最后更新',
        sections: {
            intro: {
                title: '什么是Cookie',
                content: 'Cookie是存储在您浏览器中的小型文本文件，用于识别您的设备并改善您的用户体验。'
            },
            types: {
                title: '我们使用的Cookie类型',
                essential: {
                    title: '必需Cookie',
                    description: '这些Cookie对网站运行至关重要',
                    items: [
                        '认证Cookie：保持您的登录状态',
                        '安全Cookie：保护您的账户安全',
                        '语言偏好：记住您选择的语言'
                    ]
                },
                functional: {
                    title: '功能Cookie',
                    description: '这些Cookie提供增强功能',
                    items: [
                        'localStorage：缓存用户数据和偏好设置',
                        'sessionStorage：临时会话数据'
                    ]
                }
            },
            manage: {
                title: '管理Cookie',
                content: '您可以通过浏览器设置管理Cookie：',
                items: [
                    'Chrome：设置 > 隐私和安全 > Cookie',
                    'Firefox：选项 > 隐私与安全',
                    'Safari：偏好设置 > 隐私',
                    'Edge：设置 > Cookie和网站权限'
                ],
                note: '注意：禁用必需Cookie可能影响网站功能。'
            },
            thirdparty: {
                title: '第三方Cookie',
                content: '我们使用以下第三方服务，它们可能设置自己的Cookie：',
                items: [
                    'Supabase：用户认证',
                    'Google：OAuth登录',
                    'Microsoft：OAuth登录'
                ]
            },
            contact: {
                title: '联系我们',
                content: '如有Cookie相关问题，请联系：pptsize@gmail.com'
            }
        }
    },
    
    // 安全说明页面
    security: {
        pageTitle: '安全说明',
        metaDescription: '了解pptsize如何保护您的数据安全',
        lastUpdated: '最后更新',
        sections: {
            intro: {
                title: '我们的安全承诺',
                content: 'pptsize致力于保护您的数据安全和隐私。我们采用多层安全措施确保您的信息安全。'
            },
            measures: {
                title: '安全措施',
                encryption: {
                    title: '数据加密',
                    items: [
                        'HTTPS/TLS：所有数据传输均经过加密',
                        '文件加密：上传的文件在传输和存储时加密',
                        '密码加密：使用bcrypt哈希存储密码'
                    ]
                },
                access: {
                    title: '访问控制',
                    items: [
                        '基于角色的访问控制（RBAC）',
                        '最小权限原则',
                        '定期访问审计',
                        '多因素认证选项（Google/Microsoft）'
                    ]
                },
                infrastructure: {
                    title: '基础设施安全',
                    items: [
                        '安全的云托管环境',
                        '定期安全更新和补丁',
                        '防火墙和入侵检测系统',
                        '数据备份和灾难恢复计划'
                    ]
                }
            },
            file: {
                title: '文件安全',
                items: [
                    '文件自动扫描：防止恶意软件',
                    '隔离处理：每个文件在独立环境中处理',
                    '自动删除：处理完成后自动删除原始文件',
                    '临时存储：不提供永久存储服务'
                ]
            },
            practice: {
                title: '安全最佳实践',
                user: {
                    title: '用户建议',
                    items: [
                        '使用强密码并定期更换',
                        '启用第三方认证（Google/Microsoft）',
                        '不与他人共享账户',
                        '定期检查账户活动',
                        '及时更新浏览器',
                        '使用安全的网络连接'
                    ]
                }
            },
            incident: {
                title: '安全事件响应',
                content: '如果发生安全事件，我们将：',
                items: [
                    '立即调查并采取措施',
                    '通知受影响的用户',
                    '配合监管机构',
                    '采取措施防止再次发生'
                ]
            },
            report: {
                title: '报告安全问题',
                content: '如果您发现安全漏洞，请立即联系：pptsize@gmail.com'
            },
            compliance: {
                title: '合规性',
                items: [
                    'GDPR：欧盟通用数据保护条例',
                    '数据本地化：遵守中国网络安全法',
                    '定期安全审计'
                ]
            }
        }
    }
};

// 挂载到全局对象
if (typeof window !== 'undefined') {
    window.zh = zh;
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = zh;
}
