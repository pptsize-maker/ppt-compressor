/**
 * Japanese Language Pack (日本語)
 */
const ja = {
    // SEO Meta情報
    seo: {
        title: 'PPT圧縮 - 無料オンラインPPT圧縮ツール、PPTファイルサイズを削減 | pptsize',
        description: '無料オンラインPPT圧縮ツールで、PPTファイルサイズを素早く削減。画像、動画、音声を圧縮。ソフトウェアのインストール不要。HD品質を維持。.pptおよび.pptx形式をサポート、WPSおよびOfficeと互換性あり。',
        keywords: 'PPT圧縮,PPTコンプレッサー,PPTサイズ削減,PPTファイルサイズ,PowerPoint圧縮,オンラインPPT圧縮,無料PPT圧縮,PPTが大きすぎる,PPTを圧縮する方法'
    },
    
    // ページコンテンツ
    content: {
        advantages: {
            title: '私たちの利点',
            description: '最大圧縮率<strong>90%</strong>、<strong>絶対的なHD品質</strong>を維持し、4K、2K、1080pモニターで完璧に表示されます。'
        },
        howto: {
            title: 'PPTを圧縮する方法？',
            items: [
                {
                    title: '1. 画像圧縮',
                    description: 'PowerPointファイル内の画像は通常、大きなスペースを占めます。<strong>画像圧縮</strong>、<strong>トリミング</strong>、<strong>画像のスケーリング</strong>を通じて。pptsizeはすべての画像を簡単に圧縮でき、ファイルの負担を軽減しながら<strong>HD品質</strong>を維持できます。8K、4K、または1080pディスプレイを使用しても、圧縮されたファイルはHDスクリーンで非常に鮮明なままです。'
                },
                {
                    title: '2. 音声、動画、添付ファイルの圧縮',
                    description: 'PowerPoint音声、動画、添付ファイルはPPTファイルサイズ増加の主な要因です。pptsize圧縮ツールは<strong>音声と動画を圧縮</strong>し、優れた再生品質を維持しながら軽量なファイルを確保します。'
                },
                {
                    title: '3. 埋め込みフォントを削除',
                    description: '単一のフォントは約<strong>10M</strong>のメモリを占有します。フォントを埋め込まないでください。カスタムフォントを置き換えるために、一般的なシステムフォント（ArialやCalibriなど）を選択してください。これにより、ファイルサイズを削減するだけでなく、ファイルの互換性と使いやすさも向上します。'
                }
            ]
        }
    },
    
    // 認証
    auth: {
        login: 'ログイン',
        signup: 'サインアップ',
        logout: 'ログアウト',
        email: 'メールアドレス',
        password: 'パスワード',
        confirmPassword: 'パスワード確認',
        forgotPassword: 'パスワードをお忘れですか？',
        resetPassword: 'パスワードリセット',
        noAccount: 'アカウントをお持ちでないですか？',
        hasAccount: '既にアカウントをお持ちですか？',
        signupNow: '今すぐサインアップ',
        loginNow: '今すぐログイン',
        pricing: '料金プラン',
        backToLogin: 'ログインに戻る',
        loginBtn: 'ログイン',
        signupBtn: 'サインアップ',
        sendResetEmail: 'リセットメールを送信',
        emailPlaceholder: 'メールアドレスを入力',
        passwordPlaceholder: 'パスワードを入力（最低6文字）',
        confirmPasswordPlaceholder: 'パスワードを再入力',
        emailRequired: 'メールアドレスを入力してください',
        passwordRequired: 'パスワードを入力してください',
        passwordMismatch: 'パスワードが一致しません',
        processing: '処理中...',
        loginSuccess: 'ログイン成功',
        signupSuccess: '登録成功',
        resetEmailSent: 'リセットメールを送信しました。受信トレイをご確認ください',
        resetPasswordInfo: 'パスワードリセットリンクをメールでお送りします',
        unknownError: '不明なエラーが発生しました',
        welcome: 'ようこそ、',
        continueWithGoogle: 'Google で続行',
        continueWithMicrosoft: 'Microsoft で続行',
        redirecting: '認証ページにリダイレクトしています...',
        or: 'または',
        usageCount: 'プレミアム回数',
        times: '回',
        freeUser: '無料ユーザー',
        premiumUser: 'プレミアムユーザー',
        myAccount: 'マイアカウント',
        myWorks: 'マイタスク',
        tasks: '個',
        manageSubscription: 'サブスクリプション管理'
    },
    
    // PPT圧縮ツール
    compressor: {
        title: 'オンラインPPT圧縮ツール',
        subtitle: '品質を維持しながらPowerPointファイルを素早く圧縮',
        upload: 'ファイルを選択',
        or: 'または',
        drag: 'ここにファイルをドラッグ',
        supported: '.pptおよび.pptx形式対応',
        limit: '無料ファイルサイズ：{size}',
        compressionLevel: '圧縮レベル',
        levelStandard: '標準',
        levelAdvanced: '高度',
        levelMaximum: '最大',
        recommended: '推奨',
        levelAdvancedTip: '埋め込みフォントを削除し、一般的なシステムフォントに置き換えます',
        levelMaximumTip: '埋め込みフォントを削除し、一般的なシステムフォントに置き換えます。ディスプレイは2K以下でご使用ください',
        deviceCompatibility: '圧縮モード',
        anyDevice: 'ユニバーサルモード',
        anyDeviceTip: 'すべてのデバイス対応モード',
        pcMacDevice: '高画質モード',
        pcMacDeviceTip: 'Androidアプリ（WPS Officeを除く）で使用しないことが確実な場合、このモードをお勧めします、ロスレス、高速、より高い圧縮率',
        removeFile: '削除',
        startCompress: '圧縮開始',
        processing: '処理中...',
        uploading: 'アップロード中...（上級ユーザーのタスク生成中、ページを離れないでください）',
        compressing: 'メディア圧縮には時間がかかります、ページを閉じないでください、10分でタイムアウト（上級ユーザーはタスクを生成、タスクリストで確認可能、完了時にメール通知）',
        fileName: 'ファイル名',
        original: '元のサイズ',
        compressed: '圧縮済み',
        saved: '節約',
        download: '圧縮ファイルをダウンロード',
        uploadAnother: '別のファイルを圧縮',
        failed: '圧縮失敗',
        tryAgain: '再試行',
        errorType: '.pptまたは.pptxファイルをアップロードしてください',
        errorSize: 'ファイルサイズは{size}を超えることはできません',
        error413: 'ファイルが大きすぎてアップロードできません。サーバー制限は{size}です',
        errorNetwork: 'ネットワーク接続に失敗しました。確認して再試行してください',
        errorServer: 'サーバー処理に失敗しました。後でもう一度お試しください',
        // アップグレードモーダル
        upgrade: {
            fileSizeLimit: {
                title: 'ファイルサイズが制限を超えています',
                message: '現在のファイルは無料ユーザーの制限を超えています。プレミアムにアップグレードして、より大きなファイルの圧縮と更多機能をお楽しみください！',
                action: 'プレミアムにアップグレード'
            },
            notLoggedIn: {
                title: 'ログインしてください',
                message: 'ログインして大きなファイルを圧縮できます。今すぐサインインして始めましょう！',
                action: '今すぐログイン'
            },
            notPremium: {
                title: 'プレミアムが必要です',
                message: '現在のファイルは無料ユーザーの制限を超えています。プレミアムにアップグレードして、より大きなファイルの圧縮と更多機能をお楽しみください！',
                action: 'プレミアムにアップグレード'
            },
            noUsageCount: {
                title: '使用回数に達しました',
                message: '使用回数制限に達しました。チャージして圧縮サービスを続けてご利用ください！',
                action: '今すぐチャージ'
            },
            default: {
                title: 'アップロードできません',
                message: 'ファイルサイズが制限を超えています。アカウントをアップグレードするか、サポートにお問い合わせください。',
                action: '詳細を見る'
            },
            cancel: 'キャンセル'
        }
    },
    
    // マイタスク
    works: {
        pageTitle: 'マイタスク',
        metaDescription: 'PPT圧縮タスクリストを表示し、完成したファイルをダウンロードします',
        notice: 'お知らせ：このページには最新の10件のタスク記録のみ表示されます。pptsizeは永続ストレージサービスを提供していません。ファイルはいつでも削除される可能性があります。お早めにダウンロードしてください！',
        loading: 'タスクリストを読み込んでいます...',
        loadError: '読み込みに失敗しました',
        retry: '再試行',
        empty: 'タスクがまだありません',
        emptyHint: 'ファイルを圧縮すると、ここにタスクが表示されます',
        loginRequired: 'まずログインしてください',
        loginHint: 'ログインしてタスクリストを表示',
        unknownFile: '不明なファイル',
        download: 'ダウンロード',
        downloading: 'ダウンロード中',
        downloadSuccess: 'ダウンロード成功',
        downloadError: 'ダウンロード失敗',
        saved: '節約',
        status: {
            processing: '処理中',
            success: '完了',
            failed: '失敗',
            unknown: '不明'
        }
    },
    
    // 料金プラン
    pricing: {
        pageTitle: '料金プラン',
        metaDescription: 'あなたに最適なPPT圧縮プランを選択してください。柔軟な料金設定、従量課金',
        title: 'プランを選択',
        subtitle: '柔軟な料金設定、従量課金、高度な機能のロック解除',
        mostPopular: '最も人気',
        bestValue: '最もお得',
        currentPlan: '現在のプラン',
        selectPlan: 'プランを選択',
        loginRequired: 'ログインして購入',
        features: '機能',
        plans: {
            payPerUse: {
                name: '従量課金',
                price: '$1',
                priceUnit: '/回',
                description: '時々使用するユーザー向け',
                features: ['単一圧縮サービス', 'ファイルサイズ制限 800MB', 'タスク一時保持', 'メール通知']
            },
            weekly: {
                name: '30日間プレミアム',
                price: '$7',
                priceUnit: '/30日',
                description: '短期集中使用向け',
                features: ['30日間無制限使用', 'ファイルサイズ制限 800MB', 'タスク一時保持', 'メール通知', 'VIP専用チャネル', 'リアルタイム処理', '優先サポート']
            },
            yearly: {
                name: '年間プレミアム',
                price: '$50',
                priceUnit: '/年',
                description: '長期ユーザーに最適',
                features: ['365日間無制限使用', 'ファイルサイズ制限 800MB', 'タスク一時保持', 'メール通知', 'VIP専用チャネル', 'リアルタイム処理', '優先サポート'],
                badge: '$14節約',
                savings: '月額わずか$4.17'
            }
        },
        comparisonTable: {
            title: '機能比較',
            free: '無料',
            premium: '有料',
            features: {
                fileSize: 'ファイルサイズ制限',
                fileSizeFree: '30MB',
                fileSizePremium: '800MB',
                taskStorage: 'タスク保持',
                taskStorageFree: '保持なし',
                taskStoragePremium: '一時保持',
                channel: '処理チャネル',
                channelFree: '標準',
                channelPremium: 'VIP専用*',
                speed: '処理速度',
                speedFree: '標準',
                speedPremium: 'リアルタイム優先*',
                support: 'テクニカルサポート',
                supportFree: 'コミュニティ',
                supportPremium: '優先サポート*'
            },
            note: '* 7日間および年間プレミアムプランのみ'
        },
        faq: {
            title: 'よくある質問',
            questions: [
                { q: '支払い方法は？', a: 'クレジットカード、デビットカードなど、さまざまな支払い方法をご利用いただけます。' },
                { q: 'いつでもキャンセルできますか？', a: 'もちろんです。アカウント設定でいつでもサブスクリプションをキャンセルできます。' },
                { q: '返金ポリシーは？', a: '購入後7日以内にご満足いただけない場合は、全額返金をリクエストできます。' },
                { q: 'プレミアムのファイルサイズ制限は？', a: 'プレミアムにはファイルサイズ制限がありません。任意のサイズのPPTファイルを圧縮できます。' }
            ]
        }
    },
    
    // フッター
    footer: {
        aboutUs: '私たちについて',
        aboutDesc: 'pptsizeは、高品質を維持しながらプレゼンテーションファイルサイズを素早く削減するのに役立つプロフェッショナルなPPT圧縮ツールです。',
        fromText: '私たちは',
        fromLink: 'apadog.com',
        contactText: 'ご質問がある場合は、メールをお送りください',
        contactEmail: 'pptsize@gmail.com',
        product: '製品',
        home: 'ホーム',
        faq: 'FAQ',
        changelog: '変更履歴',
        support: 'サポート',
        helpCenter: 'ヘルプセンター',
        contact: 'お問い合わせ',
        feedback: 'フィードバック',
        apiDocs: 'APIドキュメント',
        status: 'ステータス',
        legal: '法的情報',
        privacy: 'プライバシーポリシー',
        terms: '利用規約',
        cookies: 'クッキーポリシー',
        license: 'ライセンス',
        security: 'セキュリティ',
        copyright: '全著作権所有。',
        madeWith: 'で作られた',
        madeIn: '❤️',
        backToTop: 'トップに戻る'
    },
    
    // 法律ページ（英語版を参照）
    privacy: {
        pageTitle: 'プライバシーポリシー',
        metaDescription: 'pptsizeの個人情報の収集、使用、保護について',
        lastUpdated: '最終更新',
        sections: window.en?.privacy?.sections || {}
    },
    terms: {
        pageTitle: '利用規約',
        metaDescription: 'pptsize利用規約および使用契約',
        lastUpdated: '最終更新',
        sections: {
            intro: {
                title: '条項の受諾',
                content: 'pptsizeサービスを使用することで、これらの利用規約に従うことに同意したものとみなされます。同意しない場合は、サービスをご利用ください。'
            },
            service: {
                title: 'サービス説明',
                items: [
                    'pptsizeはオンラインPPTファイル圧縮サービスを提供します',
                    '無料版は基本的な圧縮機能を提供し、ファイルサイズ制限は30MBです',
                    'プレミアム版は高度な機能を提供し、ファイルサイズ制限は800MBです',
                    '圧縮後のファイルは、WPS、Office、Macなどの主流エディターでの表示のみを保証します',
                    'いつでもサービスを変更または終了する権利を留保します'
                ]
            },
            user: {
                title: 'ユーザーの責任',
                items: [
                    '18歳以上であるか、保護者の同意を得ている必要があります',
                    '正確な登録情報を提供してください',
                    'アカウントのセキュリティを保護してください',
                    '違法、侵害、または悪意のあるファイルをアップロードしないでください',
                    'サービスを悪用または破損させないでください',
                    '不正なアクセスを行わないでください'
                ]
            },
            content: {
                title: 'コンテンツと知的財産',
                items: [
                    'アップロードしたコンテンツの所有権を保持します',
                    'ファイルを一時的に保存・処理する権限を当社に付与します',
                    'アップロードしたコンテンツについて当社は責任を負いません',
                    'pptsizeのすべての知的財産は当社に帰属します'
                ]
            },
            payment: {
                title: '支払いと返金',
                items: [
                    '従量課金：$1/回、返金なし',
                    'サブスクリプション：サブスクリプション期間に応じて課金',
                    '購入後7日以内に不満がある場合は全額返金をリクエストできます',
                    '返金後、メンバーシップ権利は即座に終了します'
                ]
            },
            limitation: {
                title: '免責事項',
                items: [
                    'サービスは「現状のまま」提供され、いかなる保証もありません',
                    'サービスが中断なく、エラーフリーであることを保証しません',
                    'データ損失やファイル破損について責任を負いません',
                    'サービス使用によるいかなる損失についても責任を負いません'
                ]
            },
            termination: {
                title: '終了',
                content: '規約に違反するアカウントを通知なしに終了または停止する権利を留保します。'
            },
            changes: {
                title: '規約の変更',
                content: 'いつでもこれらの規約を更新する場合があります。重要な変更はメールで通知されます。'
            },
            contact: {
                title: 'お問い合わせ',
                content: 'ご質問はこちらまで：pptsize@gmail.com'
            }
        }
    },
    cookies: {
        pageTitle: 'クッキーポリシー',
        metaDescription: 'pptsizeのクッキー使用について',
        lastUpdated: '最終更新',
        sections: window.en?.cookies?.sections || {}
    },
    security: {
        pageTitle: 'セキュリティ',
        metaDescription: 'pptsizeのデータセキュリティ保護について',
        lastUpdated: '最終更新',
        sections: window.en?.security?.sections || {}
    }
};

// グローバルオブジェクトにマウント
if (typeof window !== 'undefined') {
    window.ja = ja;
}

// エクスポート
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ja;
}

