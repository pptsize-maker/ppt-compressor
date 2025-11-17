/**
 * English Language Pack
 */
const en = {
    // SEO Meta Information
    seo: {
        title: 'Compress PPT - Free Online PPT Compressor, Reduce PPT File Size | pptsize',
        description: 'Free online PPT compressor to quickly reduce PPT file size. Compress images, videos, and audio. No software installation required. Maintain HD quality. Support .ppt and .pptx formats, compatible with WPS and Office.',
        keywords: 'compress PPT,PPT compressor,reduce PPT size,PPT file size,compress PowerPoint,online PPT compression,free PPT compressor,PPT too large,how to compress PPT,shrink PPT'
    },
    
    // Page Content
    content: {
        advantages: {
            title: 'Our Advantages',
            description: 'Maximum compression rate of <strong>90%</strong>, maintaining <strong>absolute HD quality</strong>, perfect display on 4K, 2K, and 1080p monitors.'
        },
        howto: {
            title: 'How to Compress PPT?',
            items: [
                {
                    title: '1. Image Compression',
                    description: 'Images in PowerPoint files usually take up significant space. Through <strong>image compression</strong>, <strong>cropping</strong>, and <strong>scaling images</strong>. pptsize can easily compress all images, reducing file burden while maintaining <strong>HD quality</strong>. Whether you use 8K, 4K, or 1080p displays, compressed files remain crystal clear on HD screens.'
                },
                {
                    title: '2. Audio, Video & Attachments Compression',
                    description: 'PowerPoint audio, video, and attachments are major contributors to PPT file bloat. pptsize compression tool helps you <strong>compress audio and video</strong>, ensuring lighter files while maintaining excellent playback quality.'
                },
                {
                    title: '3. Remove Embedded Fonts',
                    description: 'A single font takes up approximately <strong>10M</strong> of memory. Please do not embed fonts. Choose common system fonts (such as Arial or Calibri) to replace custom fonts. This not only reduces file size but also improves file compatibility and usability.'
                }
            ]
        }
    },
    
    // Authentication
    auth: {
        login: 'Login',
        signup: 'Sign Up',
        logout: 'Logout',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        forgotPassword: 'Forgot Password?',
        resetPassword: 'Reset Password',
        noAccount: "Don't have an account?",
        hasAccount: 'Already have an account?',
        signupNow: 'Sign Up Now',
        loginNow: 'Login Now',
        pricing: 'Pricing',
        backToLogin: 'Back to Login',
        loginBtn: 'Login',
        signupBtn: 'Sign Up',
        sendResetEmail: 'Send Reset Email',
        emailPlaceholder: 'Enter your email',
        passwordPlaceholder: 'Enter password (min. 6 characters)',
        confirmPasswordPlaceholder: 'Enter password again',
        emailRequired: 'Please enter email',
        passwordRequired: 'Please enter password',
        passwordMismatch: 'Passwords do not match',
        processing: 'Processing...',
        loginSuccess: 'Login successful',
        signupSuccess: 'Registration successful',
        resetEmailSent: 'Reset email sent, please check your inbox',
        resetPasswordInfo: 'We will send a password reset link to your email',
        unknownError: 'Unknown error occurred',
        welcome: 'Welcome, ',
        continueWithGoogle: 'Continue with Google',
        continueWithMicrosoft: 'Continue with Microsoft',
        redirecting: 'Redirecting to authorization page...',
        or: 'or',
        usageCount: 'Premium Count',
        times: 'times',
        freeUser: 'Free User',
        premiumUser: 'Premium User',
        myAccount: 'My Account',
        myWorks: 'My Tasks',
        tasks: 'tasks',
        manageSubscription: 'Manage Subscription'
    },
    
    // PPT Compressor
    compressor: {
        title: 'Online PPT Compressor',
        subtitle: 'Quickly compress your PowerPoint files while maintaining quality',
        upload: 'Select File',
        or: 'or',
        drag: 'Drag and drop file here',
        supported: 'Supports .ppt and .pptx formats',
        limit: 'Free file size: {size}',
        compressionLevel: 'Compression Level',
        levelStandard: 'Standard',
        levelAdvanced: 'Advanced',
        levelMaximum: 'Maximum',
        recommended: 'Recommended',
        levelAdvancedTip: 'Embedded fonts will be removed and replaced with common system fonts',
        levelMaximumTip: 'Embedded fonts will be removed and replaced with common system fonts. Please ensure display is 2K or below',
        deviceCompatibility: 'Compression Mode',
        anyDevice: 'Universal Mode',
        anyDeviceTip: 'Compatible with all devices',
        pcMacDevice: 'High Quality Mode',
        pcMacDeviceTip: 'If you are certain not to use on Android apps (except WPS Office), this mode is recommended, lossless, fast, higher compression ratio',
        removeFile: 'Remove',
        startCompress: 'Start Compression',
        processing: 'Processing...',
        uploading: 'Uploading... (Advanced user task in progress, please do not leave the page)',
        compressing: 'Media compression is time-consuming, please do not close the page, 10 minutes timeout (Advanced users create tasks, viewable in task list, email notification on completion)',
        fileName: 'File Name',
        original: 'Original Size',
        compressed: 'Compressed',
        saved: 'Saved',
        download: 'Download Compressed File',
        uploadAnother: 'Compress Another',
        failed: 'Compression Failed',
        tryAgain: 'Try Again',
        errorType: 'Please upload .ppt or .pptx file',
        errorSize: 'File size cannot exceed {size}',
        error413: 'File too large to upload. Server limit is {size}',
        errorNetwork: 'Network connection failed, please check and retry',
        errorServer: 'Server processing failed, please try again later',
        // Upgrade Modal
        upgrade: {
            fileSizeLimit: {
                title: 'File Size Exceeds Limit',
                message: 'Current file exceeds free user limit. Upgrade to premium to compress larger files and unlock more features!',
                action: 'Upgrade to Premium'
            },
            notLoggedIn: {
                title: 'Please Login',
                message: 'Login to compress larger files. Sign in now to get started!',
                action: 'Login Now'
            },
            notPremium: {
                title: 'Premium Required',
                message: 'Current file exceeds free user limit. Upgrade to premium to compress larger files and unlock more features!',
                action: 'Upgrade to Premium'
            },
            noUsageCount: {
                title: 'Usage Limit Reached',
                message: 'Your usage limit has been reached. Recharge to continue using compression service!',
                action: 'Recharge Now'
            },
            default: {
                title: 'Unable to Upload',
                message: 'File size exceeds limit. Please upgrade your account or contact support.',
                action: 'Learn More'
            },
            cancel: 'Cancel'
        }
    },
    
    // My Works
    works: {
        pageTitle: 'My Tasks',
        metaDescription: 'View your PPT compression task list and download completed files',
        notice: 'Notice: This page displays only the last 10 task records. pptsize does not provide permanent storage. Files may be deleted at any time. Please download promptly!',
        loading: 'Loading task list...',
        loadError: 'Load failed',
        retry: 'Retry',
        empty: 'No tasks yet',
        emptyHint: 'Tasks will appear here after compressing files',
        loginRequired: 'Please login first',
        loginHint: 'Login to view your task list',
        unknownFile: 'Unknown file',
        download: 'Download',
        downloading: 'Downloading',
        downloadSuccess: 'Download successful',
        downloadError: 'Download failed',
        saved: 'Saved',
        status: {
            processing: 'Processing',
            success: 'Completed',
            failed: 'Failed',
            unknown: 'Unknown'
        }
    },
    
    // Pricing Page
    pricing: {
        pageTitle: 'Pricing Plans',
        metaDescription: 'Choose the right PPT compression plan for you. Flexible pricing, pay as you go',
        title: 'Choose Your Plan',
        subtitle: 'Flexible pricing, pay as you go, unlock advanced features',
        monthly: 'Monthly',
        yearly: 'Yearly',
        payOnce: 'Pay Per Use',
        mostPopular: 'Most Popular',
        bestValue: 'Best Value',
        currentPlan: 'Current Plan',
        selectPlan: 'Select Plan',
        loginRequired: 'Login to Purchase',
        features: 'Features',
        plans: {
            payPerUse: {
                name: 'Pay Per Use',
                price: '$1',
                priceUnit: '/time',
                description: 'For occasional users',
                features: [
                    'Single compression service',
                    'File size limit 800MB',
                    'Temporary task retention',
                    'Email notification'
                ]
            },
            weekly: {
                name: '30-Day Premium',
                price: '$7',
                priceUnit: '/30 days',
                description: 'For short-term intensive use',
                features: [
                    'Unlimited use for 30 days',
                    'File size limit 800MB',
                    'Temporary task retention',
                    'Email notification',
                    'VIP exclusive channel',
                    'Real-time processing',
                    'Priority support'
                ]
            },
            yearly: {
                name: 'Yearly Premium',
                price: '$50',
                priceUnit: '/year',
                description: 'Best value for long-term users',
                features: [
                    'Unlimited use for 365 days',
                    'File size limit 800MB',
                    'Temporary task retention',
                    'Email notification',
                    'VIP exclusive channel',
                    'Real-time processing',
                    'Priority support'
                ],
                badge: 'Save $14',
                savings: 'Only $4.17/month'
            }
        },
        comparisonTable: {
            title: 'Feature Comparison',
            free: 'Free',
            premium: 'Paid',
            features: {
                fileSize: 'File Size Limit',
                fileSizeFree: '30MB',
                fileSizePremium: '800MB',
                taskStorage: 'Task Retention',
                taskStorageFree: 'No retention',
                taskStoragePremium: 'Temporary',
                channel: 'Processing Channel',
                channelFree: 'Standard',
                channelPremium: 'VIP Exclusive*',
                speed: 'Processing Speed',
                speedFree: 'Standard',
                speedPremium: 'Real-time Priority*',
                support: 'Technical Support',
                supportFree: 'Community',
                supportPremium: 'Priority Support*'
            },
            note: '* Available for 7-Day and Yearly Premium only'
        },
        faq: {
            title: 'FAQ',
            questions: [
                {
                    q: 'How to pay?',
                    a: 'We accept credit cards, debit cards, and various payment methods.'
                },
                {
                    q: 'Can I cancel anytime?',
                    a: 'Absolutely. You can cancel your subscription anytime in account settings.'
                },
                {
                    q: 'What is the refund policy?',
                    a: 'If you are not satisfied within 7 days of purchase, you can request a full refund.'
                },
                {
                    q: 'What is the file size limit for Premium?',
                    a: 'Premium has a file size limit of 800MB, which meets most use cases.'
                },
                {
                    q: 'Is my file privacy safe?',
                    a: 'Absolutely safe. The server only temporarily stores files during compression and deletes them immediately after processing. Your files are completely confidential and will not be leaked.'
                },
                {
                    q: 'What if the compressed file doesn\'t display correctly in some software?',
                    a: 'Since pptsize uses the latest compression technology, we recommend opening files in mainstream professional software such as WPS, Microsoft Office, PowerPoint, etc. These applications fully support the compressed file format.'
                }
            ]
        }
    },
    
    // Footer
    footer: {
        aboutUs: 'About Us',
        aboutDesc: 'pptsize is a professional PPT compression tool that helps you quickly reduce presentation file sizes while maintaining high quality.',
        fromText: 'We are from',
        fromLink: 'apadog.com',
        contactText: 'If you have any questions, please send us an email',
        contactEmail: 'pptsize@gmail.com',
        product: 'Product',
        home: 'Home',
        faq: 'FAQ',
        changelog: 'Changelog',
        support: 'Support',
        helpCenter: 'Help Center',
        contact: 'Contact',
        feedback: 'Feedback',
        apiDocs: 'API Docs',
        status: 'Status',
        legal: 'Legal',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        cookies: 'Cookie Policy',
        license: 'License',
        security: 'Security',
        copyright: 'All rights reserved.',
        madeWith: 'Made with',
        madeIn: '',
        backToTop: 'Back to Top'
    },
    
    // Privacy Policy Page
    privacy: {
        pageTitle: 'Privacy Policy',
        metaDescription: 'Learn how pptsize collects, uses, and protects your personal information',
        lastUpdated: 'Last Updated',
        sections: {
            intro: {
                title: 'Introduction',
                content: 'pptsize ("we", "our") values your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our PPT compression service.'
            },
            collect: {
                title: 'Information We Collect',
                items: [
                    'Account Information: Email address, display name (when you register)',
                    'Third-party Login: Basic profile information from Google or Microsoft',
                    'File Information: PPT files you upload (temporarily stored for compression)',
                    'Usage Data: IP address, browser type, access time, usage count',
                    'Cookies: For maintaining login status and language preferences'
                ]
            },
            use: {
                title: 'How We Use Information',
                items: [
                    'Provide PPT compression service',
                    'Manage your account and membership status',
                    'Process payments and subscriptions',
                    'Improve service quality',
                    'Send service-related notifications',
                    'Prevent fraud and abuse'
                ]
            },
            storage: {
                title: 'Data Storage',
                items: [
                    'User Authentication: Stored in Supabase (GDPR compliant)',
                    'Uploaded Files: Temporarily stored, automatically deleted after processing',
                    'Free User Tasks: Not retained',
                    'Premium User Tasks: Temporarily retained, may be deleted at any time'
                ]
            },
            sharing: {
                title: 'Information Sharing',
                content: 'We do not sell your personal information. We only share information in the following cases:',
                items: [
                    'Service Providers: Supabase (authentication), payment processors',
                    'Legal Requirements: Comply with laws, regulations, or legal processes',
                    'Protect Rights: Protect our rights, privacy, security, or property'
                ]
            },
            rights: {
                title: 'Your Rights',
                items: [
                    'Access your personal data',
                    'Correct inaccurate data',
                    'Delete your account and data',
                    'Export your data',
                    'Withdraw consent',
                    'Object to data processing'
                ]
            },
            security: {
                title: 'Data Security',
                content: 'We use industry-standard security measures to protect your data, including encrypted transmission, secure storage, and access control.'
            },
            contact: {
                title: 'Contact Us',
                content: 'For privacy-related questions, contact: pptsize@gmail.com'
            }
        }
    },
    
    // Terms of Service Page
    terms: {
        pageTitle: 'Terms of Service',
        metaDescription: 'pptsize Terms of Service and usage agreement',
        lastUpdated: 'Last Updated',
        sections: {
            intro: {
                title: 'Acceptance of Terms',
                content: 'By using pptsize services, you agree to comply with these Terms of Service. If you do not agree, please do not use our services.'
            },
            service: {
                title: 'Service Description',
                items: [
                    'pptsize provides online PPT file compression services',
                    'Free version offers basic compression, 30MB file size limit',
                    'Premium version offers advanced features, 800MB file size limit',
                    'We only guarantee that compressed files display properly in mainstream editors such as WPS, Office, and Mac',
                    'We reserve the right to modify or terminate services at any time'
                ]
            },
            user: {
                title: 'User Responsibilities',
                items: [
                    'You must be 18+ or have guardian consent',
                    'Provide accurate registration information',
                    'Protect account security',
                    'Do not upload illegal, infringing, or malicious files',
                    'Do not abuse or damage the service',
                    'Do not perform unauthorized access'
                ]
            },
            content: {
                title: 'Content and Intellectual Property',
                items: [
                    'You retain ownership of uploaded content',
                    'You authorize us to temporarily store and process your files',
                    'We are not responsible for your uploaded content',
                    'All pptsize intellectual property belongs to us'
                ]
            },
            payment: {
                title: 'Payment and Refunds',
                items: [
                    'Pay Per Use: $1/use, no refund',
                    'Subscription: Charged per subscription period',
                    'Full refund within 7 days if unsatisfied',
                    'Membership rights terminate immediately after refund'
                ]
            },
            limitation: {
                title: 'Disclaimer',
                items: [
                    'Service provided "as is" without warranties',
                    'We do not guarantee uninterrupted or error-free service',
                    'We are not responsible for data loss or file corruption',
                    'We are not liable for any losses from service use'
                ]
            },
            termination: {
                title: 'Termination',
                content: 'We reserve the right to terminate or suspend accounts violating terms without notice.'
            },
            changes: {
                title: 'Changes to Terms',
                content: 'We may update these terms at any time. Significant changes will be notified via email.'
            },
            contact: {
                title: 'Contact Us',
                content: 'For questions, contact: pptsize@gmail.com'
            }
        }
    },
    
    // Cookie Policy Page
    cookies: {
        pageTitle: 'Cookie Policy',
        metaDescription: 'Learn how pptsize uses cookies',
        lastUpdated: 'Last Updated',
        sections: {
            intro: {
                title: 'What are Cookies',
                content: 'Cookies are small text files stored in your browser to identify your device and improve user experience.'
            },
            types: {
                title: 'Types of Cookies We Use',
                essential: {
                    title: 'Essential Cookies',
                    description: 'These cookies are essential for website functionality',
                    items: [
                        'Authentication Cookies: Maintain login status',
                        'Security Cookies: Protect account security',
                        'Language Preference: Remember language selection'
                    ]
                },
                functional: {
                    title: 'Functional Cookies',
                    description: 'These cookies provide enhanced functionality',
                    items: [
                        'localStorage: Cache user data and preferences',
                        'sessionStorage: Temporary session data'
                    ]
                }
            },
            manage: {
                title: 'Manage Cookies',
                content: 'You can manage cookies through browser settings:',
                items: [
                    'Chrome: Settings > Privacy and Security > Cookies',
                    'Firefox: Options > Privacy & Security',
                    'Safari: Preferences > Privacy',
                    'Edge: Settings > Cookies and Site Permissions'
                ],
                note: 'Note: Disabling essential cookies may affect website functionality.'
            },
            thirdparty: {
                title: 'Third-party Cookies',
                content: 'We use the following third-party services that may set their own cookies:',
                items: [
                    'Supabase: User authentication',
                    'Google: OAuth login',
                    'Microsoft: OAuth login'
                ]
            },
            contact: {
                title: 'Contact Us',
                content: 'For cookie-related questions, contact: pptsize@gmail.com'
            }
        }
    },
    
    // Security Page
    security: {
        pageTitle: 'Security',
        metaDescription: 'Learn how pptsize protects your data security',
        lastUpdated: 'Last Updated',
        sections: {
            intro: {
                title: 'Our Security Commitment',
                content: 'pptsize is committed to protecting your data security and privacy. We employ multi-layered security measures to ensure information safety.'
            },
            measures: {
                title: 'Security Measures',
                encryption: {
                    title: 'Data Encryption',
                    items: [
                        'HTTPS/TLS: All data transmission is encrypted',
                        'File Encryption: Uploaded files encrypted during transmission and storage',
                        'Password Encryption: Passwords stored using bcrypt hashing'
                    ]
                },
                access: {
                    title: 'Access Control',
                    items: [
                        'Role-Based Access Control (RBAC)',
                        'Principle of Least Privilege',
                        'Regular access audits',
                        'Multi-Factor Authentication options (Google/Microsoft)'
                    ]
                },
                infrastructure: {
                    title: 'Infrastructure Security',
                    items: [
                        'Secure cloud hosting environment',
                        'Regular security updates and patches',
                        'Firewalls and intrusion detection systems',
                        'Data backup and disaster recovery plans'
                    ]
                }
            },
            file: {
                title: 'File Security',
                items: [
                    'Automatic file scanning: Prevent malware',
                    'Isolated processing: Each file processed in isolated environment',
                    'Automatic deletion: Original files deleted after processing',
                    'Temporary storage: No permanent storage service'
                ]
            },
            practice: {
                title: 'Security Best Practices',
                user: {
                    title: 'User Recommendations',
                    items: [
                        'Use strong passwords and change regularly',
                        'Enable third-party authentication (Google/Microsoft)',
                        'Do not share accounts',
                        'Regularly check account activity',
                        'Keep browser updated',
                        'Use secure network connections'
                    ]
                }
            },
            incident: {
                title: 'Security Incident Response',
                content: 'In case of security incident, we will:',
                items: [
                    'Investigate immediately and take action',
                    'Notify affected users',
                    'Cooperate with regulatory authorities',
                    'Take measures to prevent recurrence'
                ]
            },
            report: {
                title: 'Report Security Issues',
                content: 'If you discover a security vulnerability, contact immediately: pptsize@gmail.com'
            },
            compliance: {
                title: 'Compliance',
                items: [
                    'GDPR: General Data Protection Regulation',
                    'Data Localization: Comply with China Cybersecurity Law',
                    'Regular security audits'
                ]
            }
        }
    }
};

// Mount to global object
if (typeof window !== 'undefined') {
    window.en = en;
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = en;
}
