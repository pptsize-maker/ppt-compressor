/**
 * Korean Language Pack (한국어)
 */
const ko = {
    // SEO 메타 정보
    seo: {
        title: 'PPT 압축 - 무료 온라인 PPT 압축 도구, PPT 파일 크기 줄이기 | pptsize',
        description: '무료 온라인 PPT 압축 도구로 빠르게 PPT 파일 크기를 줄이세요. 이미지, 비디오, 오디오를 압축합니다. 소프트웨어 설치 불필요. HD 품질 유지. .ppt 및 .pptx 형식 지원, WPS 및 Office와 호환됩니다.',
        keywords: 'PPT 압축,PPT 압축기,PPT 크기 줄이기,PPT 파일 크기,PowerPoint 압축,온라인 PPT 압축,무료 PPT 압축,PPT 너무 큼,PPT 압축 방법'
    },
    
    // 페이지 콘텐츠
    content: {
        advantages: {
            title: '우리의 장점',
            description: '최대 압축률 <strong>90%</strong>, <strong>절대적인 HD 품질</strong>을 유지하며, 4K, 2K, 1080p 모니터에서 완벽하게 표시됩니다.'
        },
        howto: {
            title: 'PPT를 압축하는 방법?',
            items: [
                {
                    title: '1. 이미지 압축',
                    description: 'PowerPoint 파일의 이미지는 일반적으로 상당한 공간을 차지합니다. <strong>이미지 압축</strong>, <strong>자르기</strong> 및 <strong>이미지 크기 조정</strong>을 통해. pptsize는 모든 이미지를 쉽게 압축하여 파일 부담을 줄이면서 <strong>HD 품질</strong>을 유지할 수 있습니다. 8K, 4K 또는 1080p 디스플레이를 사용하든 압축된 파일은 HD 화면에서 매우 선명하게 유지됩니다.'
                },
                {
                    title: '2. 오디오, 비디오 및 첨부파일 압축',
                    description: 'PowerPoint 오디오, 비디오 및 첨부파일은 PPT 파일 크기 증가의 주요 원인입니다. pptsize 압축 도구는 <strong>오디오와 비디오를 압축</strong>하여 우수한 재생 품질을 유지하면서 가벼운 파일을 보장합니다.'
                },
                {
                    title: '3. 포함된 글꼴 제거',
                    description: '단일 글꼴은 약 <strong>10M</strong>의 메모리를 차지합니다. 글꼴을 포함하지 마세요. 사용자 정의 글꼴을 대체하기 위해 일반적인 시스템 글꼴(Arial 또는 Calibri 등)을 선택하세요. 이렇게 하면 파일 크기를 줄일 뿐만 아니라 파일 호환성과 사용성도 향상됩니다.'
                }
            ]
        }
    },
    
    // 인증
    auth: {
        login: '로그인',
        signup: '회원가입',
        logout: '로그아웃',
        email: '이메일',
        password: '비밀번호',
        confirmPassword: '비밀번호 확인',
        forgotPassword: '비밀번호를 잊으셨나요?',
        resetPassword: '비밀번호 재설정',
        noAccount: '계정이 없으신가요?',
        hasAccount: '이미 계정이 있으신가요?',
        signupNow: '지금 회원가입',
        loginNow: '지금 로그인',
        pricing: '가격',
        backToLogin: '로그인으로 돌아가기',
        loginBtn: '로그인',
        signupBtn: '회원가입',
        sendResetEmail: '재설정 이메일 보내기',
        emailPlaceholder: '이메일을 입력하세요',
        passwordPlaceholder: '비밀번호를 입력하세요 (최소 6자)',
        confirmPasswordPlaceholder: '비밀번호를 다시 입력하세요',
        emailRequired: '이메일을 입력해주세요',
        passwordRequired: '비밀번호를 입력해주세요',
        passwordMismatch: '비밀번호가 일치하지 않습니다',
        processing: '처리 중...',
        loginSuccess: '로그인 성공',
        signupSuccess: '가입 성공',
        resetEmailSent: '재설정 이메일이 전송되었습니다. 받은편지함을 확인하세요',
        resetPasswordInfo: '비밀번호 재설정 링크를 이메일로 보내드립니다',
        unknownError: '알 수 없는 오류가 발생했습니다',
        welcome: '환영합니다, ',
        continueWithGoogle: 'Google 계정으로 계속하기',
        continueWithMicrosoft: 'Microsoft 계정으로 계속하기',
        redirecting: '인증 페이지로 리디렉션 중...',
        or: '또는',
        usageCount: '프리미엄 횟수',
        times: '회',
        freeUser: '무료 사용자',
        premiumUser: '프리미엄 사용자',
        myAccount: '내 계정',
        myWorks: '내 작업',
        tasks: '개',
        manageSubscription: '구독 관리'
    },
    
    // PPT 압축 도구
    compressor: {
        title: '온라인 PPT 압축 도구',
        subtitle: '품질을 유지하면서 PowerPoint 파일을 빠르게 압축',
        upload: '파일 선택',
        or: '또는',
        drag: '여기에 파일을 드래그',
        supported: '.ppt 및 .pptx 형식 지원',
        limit: '무료 파일 크기: {size}',
        compressionLevel: '압축 레벨',
        levelStandard: '표준',
        levelAdvanced: '고급',
        levelMaximum: '최대',
        recommended: '추천',
        levelAdvancedTip: '포함된 글꼴이 제거되고 일반 시스템 글꼴로 대체됩니다',
        levelMaximumTip: '포함된 글꼴이 제거되고 일반 시스템 글꼴로 대체됩니다. 디스플레이가 2K 이하인지 확인하세요',
        deviceCompatibility: '압축 모드',
        anyDevice: '범용 모드',
        anyDeviceTip: '모든 장치 호환 모드',
        pcMacDevice: '고화질 모드',
        pcMacDeviceTip: 'Android 앱(WPS Office 제외)에서 사용하지 않을 것이 확실한 경우 이 모드를 권장합니다, 무손실, 빠름, 더 높은 압축률',
        removeFile: '제거',
        startCompress: '압축 시작',
        processing: '처리 중...',
        uploading: '업로드 중… (고급 사용자 작업 생성 중, 페이지를 떠나지 마세요)',
        compressing: '미디어 압축은 시간이 오래 걸립니다, 페이지를 닫지 마세요, 10분 타임아웃 (고급 사용자는 작업 생성, 작업 목록에서 확인 가능, 완료 시 이메일 알림)',
        fileName: '파일 이름',
        original: '원본 크기',
        compressed: '압축됨',
        saved: '절약됨',
        download: '압축 파일 다운로드',
        uploadAnother: '다른 파일 압축',
        failed: '압축 실패',
        tryAgain: '다시 시도',
        errorType: '.ppt 또는 .pptx 파일을 업로드하세요',
        errorSize: '파일 크기는 {size}를 초과할 수 없습니다',
        error413: '파일이 너무 커서 업로드할 수 없습니다. 서버 제한은 {size}입니다',
        errorNetwork: '네트워크 연결 실패, 확인 후 다시 시도하세요',
        errorServer: '서버 처리 실패, 나중에 다시 시도하세요',
        // 업그레이드 모달
        upgrade: {
            fileSizeLimit: {
                title: '파일 크기가 제한을 초과했습니다',
                message: '현재 파일이 무료 사용자 제한을 초과했습니다. 프리미엄으로 업그레이드하여 더 큰 파일 압축 및 더 많은 기능을 즐기세요!',
                action: '프리미엄으로 업그레이드'
            },
            notLoggedIn: {
                title: '로그인해주세요',
                message: '로그인하여 더 큰 파일을 압축하세요. 지금 로그인하여 시작하세요!',
                action: '지금 로그인'
            },
            notPremium: {
                title: '프리미엄 필요',
                message: '현재 파일이 무료 사용자 제한을 초과했습니다. 프리미엄으로 업그레이드하여 더 큰 파일 압축 및 더 많은 기능을 즐기세요!',
                action: '프리미엄으로 업그레이드'
            },
            noUsageCount: {
                title: '사용 한도 도달',
                message: '사용 한도에 도달했습니다. 충전하여 압축 서비스를 계속 사용하세요!',
                action: '지금 충전'
            },
            default: {
                title: '업로드 불가',
                message: '파일 크기가 제한을 초과합니다. 계정을 업그레이드하거나 지원팀에 문의하세요.',
                action: '자세히 보기'
            },
            cancel: '취소'
        }
    },
    
    // 내 작업
    works: {
        pageTitle: '내 작업',
        metaDescription: 'PPT 압축 작업 목록을 보고 완료된 파일을 다운로드하세요',
        notice: '안내: 이 페이지는 최근 10개의 작업 기록만 표시됩니다. pptsize는 영구 저장 서비스를 제공하지 않습니다. 파일은 언제든지 삭제될 수 있습니다. 빠른 다운로드를 권장합니다!',
        loading: '작업 목록 로딩 중...',
        loadError: '로드 실패',
        retry: '다시 시도',
        empty: '아직 작업이 없습니다',
        emptyHint: '파일을 압축하면 여기에 작업이 표시됩니다',
        loginRequired: '먼저 로그인하세요',
        loginHint: '로그인하여 작업 목록 보기',
        unknownFile: '알 수 없는 파일',
        download: '다운로드',
        downloading: '다운로드 중',
        downloadSuccess: '다운로드 성공',
        downloadError: '다운로드 실패',
        saved: '절약',
        status: {
            processing: '처리 중',
            success: '완료',
            failed: '실패',
            unknown: '알 수 없음'
        }
    },
    
    // 가격 페이지
    pricing: {
        pageTitle: '가격 플랜',
        metaDescription: '귀하에게 적합한 PPT 압축 플랜을 선택하세요. 유연한 가격, 종량제',
        title: '플랜 선택',
        subtitle: '유연한 가격, 종량제, 고급 기능 잠금 해제',
        mostPopular: '가장 인기',
        bestValue: '최고 가치',
        currentPlan: '현재 플랜',
        selectPlan: '플랜 선택',
        loginRequired: '로그인하여 구매',
        features: '기능',
        plans: {
            payPerUse: {
                name: '사용량 기반 결제',
                price: '$1',
                priceUnit: '/회',
                description: '가끔 사용하는 사용자용',
                features: ['단일 압축 서비스', '파일 크기 제한 800MB', '작업 임시 보관', '이메일 알림']
            },
            weekly: {
                name: '30일 프리미엄',
                price: '$7',
                priceUnit: '/30일',
                description: '단기 집중 사용용',
                features: ['30일간 무제한 사용', '파일 크기 제한 800MB', '작업 임시 보관', '이메일 알림', 'VIP 전용 채널', '실시간 처리', '우선 지원']
            },
            yearly: {
                name: '연간 프리미엄',
                price: '$50',
                priceUnit: '/년',
                description: '장기 사용자에게 최적',
                features: ['365일간 무제한 사용', '파일 크기 제한 800MB', '작업 임시 보관', '이메일 알림', 'VIP 전용 채널', '실시간 처리', '우선 지원'],
                badge: '$14 절약',
                savings: '월 단 $4.17'
            }
        },
        comparisonTable: {
            title: '기능 비교',
            free: '무료',
            premium: '유료',
            features: {
                fileSize: '파일 크기 제한',
                fileSizeFree: '30MB',
                fileSizePremium: '800MB',
                taskStorage: '작업 보관',
                taskStorageFree: '보관 안함',
                taskStoragePremium: '임시 보관',
                channel: '처리 채널',
                channelFree: '표준',
                channelPremium: 'VIP 전용*',
                speed: '처리 속도',
                speedFree: '표준',
                speedPremium: '실시간 우선*',
                support: '기술 지원',
                supportFree: '커뮤니티',
                supportPremium: '우선 지원*'
            },
            note: '* 7일 및 연간 프리미엄 플랜만 제공'
        },
        faq: {
            title: 'FAQ',
            questions: [
                { q: '결제 방법은?', a: '신용카드, 직불카드 등 다양한 결제 방법을 지원합니다.' },
                { q: '언제든지 취소할 수 있나요?', a: '물론입니다. 계정 설정에서 언제든지 구독을 취소할 수 있습니다.' },
                { q: '환불 정책은?', a: '구매 후 7일 이내에 만족하지 못하시면 전액 환불을 요청할 수 있습니다.' },
                { q: '프리미엄의 파일 크기 제한은?', a: '프리미엄에는 파일 크기 제한이 없습니다. 모든 크기의 PPT 파일을 압축할 수 있습니다.' }
            ]
        }
    },
    
    // 푸터
    footer: {
        aboutUs: '회사 소개',
        aboutDesc: 'pptsize는 고품질을 유지하면서 프레젠테이션 파일 크기를 빠르게 줄이는 데 도움이 되는 전문 PPT 압축 도구입니다.',
        fromText: '우리는',
        fromLink: 'apadog.com',
        contactText: '질문이 있으시면 이메일을 보내주세요',
        contactEmail: 'pptsize@gmail.com',
        product: '제품',
        home: '홈',
        faq: 'FAQ',
        changelog: '변경 로그',
        support: '지원',
        helpCenter: '도움말 센터',
        contact: '연락처',
        feedback: '피드백',
        apiDocs: 'API 문서',
        status: '상태',
        legal: '법적 정보',
        privacy: '개인정보 보호정책',
        terms: '서비스 약관',
        cookies: '쿠키 정책',
        license: '라이센스',
        security: '보안',
        copyright: '모든 권리 보유.',
        madeWith: '로 제작',
        madeIn: '❤️',
        backToTop: '맨 위로'
    },
    
    // 법률 페이지 (영어 버전 참조)
    privacy: {
        pageTitle: '개인정보 보호정책',
        metaDescription: 'pptsize가 개인정보를 수집, 사용 및 보호하는 방법',
        lastUpdated: '마지막 업데이트',
        sections: window.en?.privacy?.sections || {}
    },
    terms: {
        pageTitle: '서비스 약관',
        metaDescription: 'pptsize 서비스 약관 및 사용 계약',
        lastUpdated: '마지막 업데이트',
        sections: {
            intro: {
                title: '약관 수락',
                content: 'pptsize 서비스를 사용함으로써 이 서비스 약관을 준수하는 것에 동의합니다. 동의하지 않는 경우 서비스를 사용하지 마세요.'
            },
            service: {
                title: '서비스 설명',
                items: [
                    'pptsize는 온라인 PPT 파일 압축 서비스를 제공합니다',
                    '무료 버전은 기본 압축 기능을 제공하며, 파일 크기 제한은 30MB입니다',
                    '프리미엄 버전은 고급 기능을 제공하며, 파일 크기 제한은 800MB입니다',
                    '압축된 파일은 WPS, Office, Mac 등의 주류 에디터에서의 표시만 보장합니다',
                    '언제든지 서비스를 수정하거나 종료할 권리를 보유합니다'
                ]
            },
            user: {
                title: '사용자 책임',
                items: [
                    '18세 이상이거나 보호자 동의가 있어야 합니다',
                    '정확한 등록 정보를 제공하세요',
                    '계정 보안을 보호하세요',
                    '불법적, 침해적 또는 악의적인 파일을 업로드하지 마세요',
                    '서비스를 남용하거나 손상시키지 마세요',
                    '무단 액세스를 수행하지 마세요'
                ]
            },
            content: {
                title: '콘텐츠 및 지적 재산권',
                items: [
                    '업로드한 콘텐츠의 소유권을 유지합니다',
                    '파일을 임시로 저장하고 처리할 권한을 당사에 부여합니다',
                    '업로드한 콘텐츠에 대해 당사는 책임지지 않습니다',
                    'pptsize의 모든 지적 재산권은 당사에 귀속됩니다'
                ]
            },
            payment: {
                title: '결제 및 환불',
                items: [
                    '사용량 기반 결제: $1/회, 환불 없음',
                    '구독: 구독 기간에 따라 요금 부과',
                    '구매 후 7일 이내에 불만족 시 전액 환불을 요청할 수 있습니다',
                    '환불 후 멤버십 권한이 즉시 종료됩니다'
                ]
            },
            limitation: {
                title: '면책 조항',
                items: [
                    '서비스는 "있는 그대로" 제공되며 어떠한 보증도 없습니다',
                    '서비스가 중단 없이 오류 없이 제공된다고 보장하지 않습니다',
                    '데이터 손실이나 파일 손상에 대해 책임지지 않습니다',
                    '서비스 사용으로 인한 모든 손실에 대해 책임지지 않습니다'
                ]
            },
            termination: {
                title: '종료',
                content: '약관을 위반하는 계정을 통지 없이 종료하거나 중단할 권리를 보유합니다.'
            },
            changes: {
                title: '약관 변경',
                content: '언제든지 이 약관을 업데이트할 수 있습니다. 중요한 변경사항은 이메일로 알려드립니다.'
            },
            contact: {
                title: '문의하기',
                content: '문의사항: pptsize@gmail.com'
            }
        }
    },
    cookies: {
        pageTitle: '쿠키 정책',
        metaDescription: 'pptsize의 쿠키 사용 방법',
        lastUpdated: '마지막 업데이트',
        sections: window.en?.cookies?.sections || {}
    },
    security: {
        pageTitle: '보안',
        metaDescription: 'pptsize의 데이터 보안 보호 방법',
        lastUpdated: '마지막 업데이트',
        sections: window.en?.security?.sections || {}
    }
};

// 전역 객체에 마운트
if (typeof window !== 'undefined') {
    window.ko = ko;
}

// 내보내기
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ko;
}

