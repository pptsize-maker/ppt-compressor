/**
 * French Language Pack (Français)
 */
const fr = {
    // SEO Meta Information
    seo: {
        title: 'Compresser PPT - Compresseur PPT en ligne gratuit, Réduire la taille du fichier PPT | pptsize',
        description: 'Compresseur PPT en ligne gratuit pour réduire rapidement la taille du fichier PPT. Compressez les images, vidéos et audio. Aucune installation de logiciel requise. Maintenir la qualité HD. Prend en charge les formats .ppt et .pptx, compatible avec WPS et Office.',
        keywords: 'compresser PPT,compresseur PPT,réduire taille PPT,taille fichier PPT,compresser PowerPoint,compression PPT en ligne,compresseur PPT gratuit,PPT trop volumineux,comment compresser PPT,réduire PPT'
    },
    
    // Page Content
    content: {
        advantages: {
            title: 'Nos Avantages',
            description: 'Taux de compression maximal de <strong>90%</strong>, en maintenant une <strong>qualité HD absolue</strong>, affichage parfait sur les moniteurs 4K, 2K et 1080p.'
        },
        howto: {
            title: 'Comment compresser un PPT ?',
            items: [
                {
                    title: '1. Compression d\'images',
                    description: 'Les images dans les fichiers PowerPoint occupent généralement un espace considérable. Grâce à la <strong>compression d\'images</strong>, au <strong>recadrage</strong> et au <strong>redimensionnement des images</strong>, pptsize peut facilement compresser toutes les images, réduisant la charge du fichier tout en maintenant la <strong>qualité HD</strong>. Que vous utilisiez des écrans 8K, 4K ou 1080p, les fichiers compressés restent parfaitement nets sur les écrans HD.'
                },
                {
                    title: '2. Compression audio, vidéo et pièces jointes',
                    description: 'L\'audio, la vidéo et les pièces jointes PowerPoint sont des facteurs majeurs de l\'augmentation de la taille des fichiers PPT. L\'outil de compression pptsize vous aide à <strong>compresser l\'audio et la vidéo</strong>, garantissant des fichiers plus légers tout en maintenant une excellente qualité de lecture.'
                },
                {
                    title: '3. Supprimer les polices intégrées',
                    description: 'Une seule police occupe environ <strong>10 Mo</strong> de mémoire. Veuillez ne pas intégrer de polices. Choisissez des polices système courantes (telles qu\'Arial ou Calibri) pour remplacer les polices personnalisées. Cela réduit non seulement la taille du fichier, mais améliore également la compatibilité et l\'utilisabilité du fichier.'
                }
            ]
        }
    },
    
    // Authentication
    auth: {
        login: 'Connexion',
        signup: 'S\'inscrire',
        logout: 'Déconnexion',
        email: 'E-mail',
        password: 'Mot de passe',
        confirmPassword: 'Confirmer le mot de passe',
        forgotPassword: 'Mot de passe oublié ?',
        resetPassword: 'Réinitialiser le mot de passe',
        noAccount: 'Pas de compte ?',
        hasAccount: 'Vous avez déjà un compte ?',
        signupNow: 'S\'inscrire maintenant',
        loginNow: 'Se connecter maintenant',
        pricing: 'Tarifs',
        backToLogin: 'Retour à la connexion',
        loginBtn: 'Connexion',
        signupBtn: 'S\'inscrire',
        sendResetEmail: 'Envoyer l\'e-mail de réinitialisation',
        emailPlaceholder: 'Entrez votre e-mail',
        passwordPlaceholder: 'Entrez le mot de passe (min. 6 caractères)',
        confirmPasswordPlaceholder: 'Entrez à nouveau le mot de passe',
        emailRequired: 'Veuillez entrer votre e-mail',
        passwordRequired: 'Veuillez entrer le mot de passe',
        passwordMismatch: 'Les mots de passe ne correspondent pas',
        processing: 'Traitement en cours...',
        loginSuccess: 'Connexion réussie',
        signupSuccess: 'Inscription réussie',
        resetEmailSent: 'E-mail de réinitialisation envoyé, veuillez vérifier votre boîte de réception',
        resetPasswordInfo: 'Nous vous enverrons un lien de réinitialisation du mot de passe par e-mail',
        unknownError: 'Une erreur inconnue s\'est produite',
        welcome: 'Bienvenue, ',
        continueWithGoogle: 'Continuer avec Google',
        continueWithMicrosoft: 'Continuer avec Microsoft',
        redirecting: 'Redirection vers la page d\'autorisation...',
        or: 'ou',
        usageCount: 'Utilisations Premium',
        times: 'fois',
        freeUser: 'Utilisateur gratuit',
        premiumUser: 'Utilisateur Premium',
        myAccount: 'Mon compte',
        myWorks: 'Mes tâches',
        tasks: 'tâches',
        manageSubscription: 'Gérer l\'abonnement'
    },
    
    // PPT Compressor
    compressor: {
        title: 'Compresseur PPT en ligne',
        subtitle: 'Compressez rapidement vos fichiers PowerPoint en maintenant la qualité',
        upload: 'Sélectionner un fichier',
        or: 'ou',
        drag: 'Glisser-déposer le fichier ici',
        supported: 'Prend en charge les formats .ppt et .pptx',
        limit: 'Taille de fichier gratuite : {size}',
        compressionLevel: 'Niveau de compression',
        levelStandard: 'Standard',
        levelAdvanced: 'Avancé',
        levelMaximum: 'Maximum',
        recommended: 'Recommandé',
        levelAdvancedTip: 'Les polices intégrées seront supprimées et remplacées par des polices système courantes',
        levelMaximumTip: 'Les polices intégrées seront supprimées et remplacées par des polices système courantes. Veuillez vous assurer que l\'affichage est 2K ou inférieur',
        deviceCompatibility: 'Mode de compression',
        anyDevice: 'Mode universel',
        anyDeviceTip: 'Mode compatible avec tous les appareils',
        pcMacDevice: 'Mode haute qualité',
        pcMacDeviceTip: 'Si vous êtes certain de ne pas l\'utiliser sur des applications Android (sauf WPS Office), ce mode est recommandé, sans perte, rapide, taux de compression plus élevé',
        removeFile: 'Supprimer',
        startCompress: 'Démarrer la compression',
        processing: 'Traitement en cours...',
        uploading: 'Téléchargement en cours... (Tâche utilisateur Premium en cours, veuillez ne pas quitter la page)',
        compressing: 'La compression des médias prend du temps, ne fermez pas la page, délai de 10 minutes (Les utilisateurs Premium créent des tâches, consultables dans la liste des tâches, notification par e-mail à la fin)',
        fileName: 'Nom du fichier',
        original: 'Taille d\'origine',
        compressed: 'Compressé',
        saved: 'Économisé',
        download: 'Télécharger le fichier compressé',
        uploadAnother: 'Compresser un autre',
        failed: 'Échec de la compression',
        tryAgain: 'Réessayer',
        errorType: 'Veuillez télécharger un fichier .ppt ou .pptx',
        errorSize: 'La taille du fichier ne peut pas dépasser {size}',
        error413: 'Fichier trop volumineux pour le téléchargement. La limite du serveur est {size}',
        errorNetwork: 'Échec de la connexion réseau, veuillez vérifier et réessayer',
        errorServer: 'Échec du traitement du serveur, veuillez réessayer plus tard',
        // Upgrade Modal
        upgrade: {
            fileSizeLimit: {
                title: 'La taille du fichier dépasse la limite',
                message: 'Le fichier actuel dépasse la limite pour les utilisateurs gratuits. Passez à Premium pour compresser des fichiers plus volumineux et débloquer plus de fonctionnalités !',
                action: 'Passer à Premium'
            },
            notLoggedIn: {
                title: 'Veuillez vous connecter',
                message: 'Connectez-vous pour compresser des fichiers plus volumineux. Connectez-vous maintenant pour commencer !',
                action: 'Se connecter maintenant'
            },
            notPremium: {
                title: 'Premium requis',
                message: 'Le fichier actuel dépasse la limite pour les utilisateurs gratuits. Passez à Premium pour compresser des fichiers plus volumineux et débloquer plus de fonctionnalités !',
                action: 'Passer à Premium'
            },
            noUsageCount: {
                title: 'Limite d\'utilisation atteinte',
                message: 'Votre limite d\'utilisation a été atteinte. Rechargez pour continuer à utiliser le service de compression !',
                action: 'Recharger maintenant'
            },
            default: {
                title: 'Impossible de télécharger',
                message: 'La taille du fichier dépasse la limite. Veuillez mettre à niveau votre compte ou contacter le support.',
                action: 'En savoir plus'
            },
            cancel: 'Annuler'
        }
    },
    
    // My Works
    works: {
        pageTitle: 'Mes tâches',
        metaDescription: 'Consultez votre liste de tâches de compression PPT et téléchargez les fichiers terminés',
        notice: 'Avis : Cette page affiche uniquement les 10 derniers enregistrements de tâches. pptsize ne fournit pas de stockage permanent. Les fichiers peuvent être supprimés à tout moment. Veuillez télécharger rapidement !',
        loading: 'Chargement de la liste des tâches...',
        loadError: 'Échec du chargement',
        retry: 'Réessayer',
        empty: 'Aucune tâche pour le moment',
        emptyHint: 'Les tâches apparaîtront ici après la compression des fichiers',
        loginRequired: 'Veuillez vous connecter d\'abord',
        loginHint: 'Connectez-vous pour voir votre liste de tâches',
        unknownFile: 'Fichier inconnu',
        download: 'Télécharger',
        downloading: 'Téléchargement en cours',
        downloadSuccess: 'Téléchargement réussi',
        downloadError: 'Échec du téléchargement',
        saved: 'Économisé',
        status: {
            processing: 'En cours de traitement',
            success: 'Terminé',
            failed: 'Échec',
            unknown: 'Inconnu'
        }
    },
    
    // Pricing Page
    pricing: {
        pageTitle: 'Plans tarifaires',
        metaDescription: 'Choisissez le plan de compression PPT qui vous convient. Tarification flexible, paiement à l\'utilisation',
        title: 'Choisissez votre plan',
        subtitle: 'Tarification flexible, paiement à l\'utilisation, débloquez les fonctionnalités avancées',
        monthly: 'Mensuel',
        yearly: 'Annuel',
        payOnce: 'Payer par utilisation',
        mostPopular: 'Le plus populaire',
        bestValue: 'Meilleur rapport qualité-prix',
        currentPlan: 'Plan actuel',
        selectPlan: 'Sélectionner le plan',
        loginRequired: 'Connexion requise pour acheter',
        features: 'Fonctionnalités',
        plans: {
            payPerUse: {
                name: 'Payer par utilisation',
                price: '1$',
                priceUnit: '/utilisation',
                description: 'Pour les utilisateurs occasionnels',
                features: [
                    'Service de compression unique',
                    'Limite de taille de fichier 800 Mo',
                    'Conservation temporaire des tâches',
                    'Notification par email'
                ]
            },
            weekly: {
                name: 'Premium 30 jours',
                price: '7$',
                priceUnit: '/30 jours',
                description: 'Pour une utilisation intensive à court terme',
                features: [
                    'Utilisation illimitée pendant 30 jours',
                    'Limite de taille de fichier 800 Mo',
                    'Conservation temporaire des tâches',
                    'Notification par email',
                    'Canal exclusif VIP',
                    'Traitement en temps réel',
                    'Support prioritaire'
                ]
            },
            yearly: {
                name: 'Premium annuel',
                price: '50$',
                priceUnit: '/an',
                description: 'Meilleur rapport qualité-prix pour les utilisateurs à long terme',
                features: [
                    'Utilisation illimitée pendant 365 jours',
                    'Limite de taille de fichier 800 Mo',
                    'Conservation temporaire des tâches',
                    'Notification par email',
                    'Canal exclusif VIP',
                    'Traitement en temps réel',
                    'Support prioritaire'
                ],
                badge: 'Économisez 14€',
                savings: 'Seulement 4,17€/mois'
            }
        },
        comparisonTable: {
            title: 'Comparaison des fonctionnalités',
            free: 'Gratuit',
            premium: 'Payant',
            features: {
                fileSize: 'Limite de taille de fichier',
                fileSizeFree: '30 Mo',
                fileSizePremium: '800 Mo',
                taskStorage: 'Conservation des tâches',
                taskStorageFree: 'Aucune conservation',
                taskStoragePremium: 'Temporaire',
                channel: 'Canal de traitement',
                channelFree: 'Standard',
                channelPremium: 'Exclusif VIP*',
                speed: 'Vitesse de traitement',
                speedFree: 'Standard',
                speedPremium: 'Priorité temps réel*',
                support: 'Support technique',
                supportFree: 'Communauté',
                supportPremium: 'Support prioritaire*'
            },
            note: '* Disponible uniquement pour Premium 7 jours et Premium annuel'
        },
        faq: {
            title: 'FAQ',
            questions: [
                {
                    q: 'Comment payer ?',
                    a: 'Nous acceptons les cartes de crédit, les cartes de débit et diverses méthodes de paiement.'
                },
                {
                    q: 'Puis-je annuler à tout moment ?',
                    a: 'Absolument. Vous pouvez annuler votre abonnement à tout moment dans les paramètres du compte.'
                },
                {
                    q: 'Quelle est la politique de remboursement ?',
                    a: 'Si vous n\'êtes pas satisfait dans les 7 jours suivant l\'achat, vous pouvez demander un remboursement complet.'
                },
                {
                    q: 'Quelle est la limite de taille de fichier pour Premium ?',
                    a: 'Premium a une limite de taille de fichier de 800 Mo, ce qui répond à la plupart des cas d\'utilisation.'
                },
                {
                    q: 'La confidentialité de mes fichiers est-elle sûre ?',
                    a: 'Absolument sûr. Le serveur ne stocke les fichiers que temporairement pendant la compression et les supprime immédiatement après le traitement. Vos fichiers sont totalement confidentiels et ne seront pas divulgués.'
                },
                {
                    q: 'Que faire si le fichier compressé ne s\'affiche pas correctement dans certains logiciels ?',
                    a: 'Puisque pptsize utilise la dernière technologie de compression, nous recommandons d\'ouvrir les fichiers dans des logiciels professionnels grand public tels que WPS, Microsoft Office, PowerPoint, etc. Ces applications prennent entièrement en charge le format de fichier compressé.'
                }
            ]
        }
    },
    
    // Footer
    footer: {
        aboutUs: 'À propos',
        aboutDesc: 'pptsize est un outil professionnel de compression PPT qui vous aide à réduire rapidement la taille des fichiers de présentation tout en maintenant une haute qualité.',
        fromText: 'Nous venons de',
        fromLink: 'apadog.com',
        contactText: 'Si vous avez des questions, veuillez nous envoyer un e-mail',
        contactEmail: 'pptsize@gmail.com',
        product: 'Produit',
        home: 'Accueil',
        faq: 'FAQ',
        changelog: 'Journal des modifications',
        support: 'Support',
        helpCenter: 'Centre d\'aide',
        contact: 'Contact',
        feedback: 'Commentaires',
        apiDocs: 'Documentation API',
        status: 'Statut',
        legal: 'Légal',
        privacy: 'Politique de confidentialité',
        terms: 'Conditions d\'utilisation',
        cookies: 'Politique des cookies',
        license: 'Licence',
        security: 'Sécurité',
        copyright: 'Tous droits réservés.',
        madeWith: 'Fait avec',
        madeIn: '',
        backToTop: 'Retour en haut'
    },
    
    // Privacy Policy Page
    privacy: {
        pageTitle: 'Politique de confidentialité',
        metaDescription: 'Découvrez comment pptsize collecte, utilise et protège vos informations personnelles',
        lastUpdated: 'Dernière mise à jour',
        sections: {
            intro: {
                title: 'Introduction',
                content: 'pptsize ("nous", "notre") valorise votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations personnelles lorsque vous utilisez notre service de compression PPT.'
            },
            collect: {
                title: 'Informations que nous collectons',
                items: [
                    'Informations de compte : Adresse e-mail, nom d\'affichage (lors de l\'inscription)',
                    'Connexion tierce : Informations de profil de base de Google ou Microsoft',
                    'Informations de fichier : Fichiers PPT que vous téléchargez (stockés temporairement pour la compression)',
                    'Données d\'utilisation : Adresse IP, type de navigateur, heure d\'accès, nombre d\'utilisations',
                    'Cookies : Pour maintenir l\'état de connexion et les préférences linguistiques'
                ]
            },
            use: {
                title: 'Comment nous utilisons les informations',
                items: [
                    'Fournir le service de compression PPT',
                    'Gérer votre compte et le statut d\'adhésion',
                    'Traiter les paiements et les abonnements',
                    'Améliorer la qualité du service',
                    'Envoyer des notifications liées au service',
                    'Prévenir la fraude et les abus'
                ]
            },
            storage: {
                title: 'Stockage des données',
                items: [
                    'Authentification utilisateur : Stockée dans Supabase (conforme au RGPD)',
                    'Fichiers téléchargés : Stockés temporairement, supprimés automatiquement après traitement',
                    'Tâches utilisateur gratuit : Non conservées',
                    'Tâches utilisateur Premium : Conservées temporairement, peuvent être supprimées à tout moment'
                ]
            },
            sharing: {
                title: 'Partage d\'informations',
                content: 'Nous ne vendons pas vos informations personnelles. Nous partageons uniquement des informations dans les cas suivants :',
                items: [
                    'Fournisseurs de services : Supabase (authentification), processeurs de paiement',
                    'Exigences légales : Conformité aux lois, réglementations ou procédures judiciaires',
                    'Protéger les droits : Protéger nos droits, notre vie privée, notre sécurité ou notre propriété'
                ]
            },
            rights: {
                title: 'Vos droits',
                items: [
                    'Accéder à vos données personnelles',
                    'Corriger les données inexactes',
                    'Supprimer votre compte et vos données',
                    'Exporter vos données',
                    'Retirer votre consentement',
                    'Vous opposer au traitement des données'
                ]
            },
            security: {
                title: 'Sécurité des données',
                content: 'Nous utilisons des mesures de sécurité standard de l\'industrie pour protéger vos données, y compris la transmission cryptée, le stockage sécurisé et le contrôle d\'accès.'
            },
            contact: {
                title: 'Contactez-nous',
                content: 'Pour les questions relatives à la confidentialité, contactez : pptsize@gmail.com'
            }
        }
    },
    
    // Terms of Service Page
    terms: {
        pageTitle: 'Conditions d\'utilisation',
        metaDescription: 'Conditions d\'utilisation et accord d\'utilisation de pptsize',
        lastUpdated: 'Dernière mise à jour',
        sections: {
            intro: {
                title: 'Acceptation des conditions',
                content: 'En utilisant les services pptsize, vous acceptez de vous conformer à ces conditions d\'utilisation. Si vous n\'êtes pas d\'accord, veuillez ne pas utiliser nos services.'
            },
            service: {
                title: 'Description du service',
                items: [
                    'pptsize fournit des services de compression de fichiers PPT en ligne',
                    'La version gratuite offre une compression de base, limite de taille de fichier de 30 Mo',
                    'La version Premium offre des fonctionnalités avancées, limite de taille de fichier de 800 Mo',
                    'Nous garantissons uniquement que les fichiers compressés s\'affichent correctement dans les éditeurs courants tels que WPS, Office et Mac',
                    'Nous nous réservons le droit de modifier ou d\'arrêter les services à tout moment'
                ]
            },
            user: {
                title: 'Responsabilités de l\'utilisateur',
                items: [
                    'Vous devez avoir 18 ans ou plus ou avoir le consentement d\'un tuteur',
                    'Fournir des informations d\'inscription exactes',
                    'Protéger la sécurité du compte',
                    'Ne pas télécharger de fichiers illégaux, contrefaisants ou malveillants',
                    'Ne pas abuser ou endommager le service',
                    'Ne pas effectuer d\'accès non autorisé'
                ]
            },
            content: {
                title: 'Contenu et propriété intellectuelle',
                items: [
                    'Vous conservez la propriété du contenu téléchargé',
                    'Vous nous autorisez à stocker et traiter temporairement vos fichiers',
                    'Nous ne sommes pas responsables de votre contenu téléchargé',
                    'Toute propriété intellectuelle de pptsize nous appartient'
                ]
            },
            payment: {
                title: 'Paiement et remboursements',
                items: [
                    'Payer par utilisation : 1$/utilisation, pas de remboursement',
                    'Abonnement : Facturé par période d\'abonnement',
                    'Remboursement complet dans les 7 jours si insatisfait',
                    'Les droits d\'adhésion se terminent immédiatement après le remboursement'
                ]
            },
            limitation: {
                title: 'Clause de non-responsabilité',
                items: [
                    'Service fourni "tel quel" sans garanties',
                    'Nous ne garantissons pas un service ininterrompu ou sans erreur',
                    'Nous ne sommes pas responsables de la perte de données ou de la corruption de fichiers',
                    'Nous ne sommes pas responsables des pertes résultant de l\'utilisation du service'
                ]
            },
            termination: {
                title: 'Résiliation',
                content: 'Nous nous réservons le droit de résilier ou de suspendre les comptes violant les conditions sans préavis.'
            },
            changes: {
                title: 'Modifications des conditions',
                content: 'Nous pouvons mettre à jour ces conditions à tout moment. Les modifications importantes seront notifiées par e-mail.'
            },
            contact: {
                title: 'Contactez-nous',
                content: 'Pour les questions, contactez : pptsize@gmail.com'
            }
        }
    },
    
    // Cookie Policy Page
    cookies: {
        pageTitle: 'Politique des cookies',
        metaDescription: 'Découvrez comment pptsize utilise les cookies',
        lastUpdated: 'Dernière mise à jour',
        sections: {
            intro: {
                title: 'Qu\'est-ce que les cookies',
                content: 'Les cookies sont de petits fichiers texte stockés dans votre navigateur pour identifier votre appareil et améliorer l\'expérience utilisateur.'
            },
            types: {
                title: 'Types de cookies que nous utilisons',
                essential: {
                    title: 'Cookies essentiels',
                    description: 'Ces cookies sont essentiels au fonctionnement du site Web',
                    items: [
                        'Cookies d\'authentification : Maintenir l\'état de connexion',
                        'Cookies de sécurité : Protéger la sécurité du compte',
                        'Préférence linguistique : Mémoriser la sélection de langue'
                    ]
                },
                functional: {
                    title: 'Cookies fonctionnels',
                    description: 'Ces cookies offrent des fonctionnalités améliorées',
                    items: [
                        'localStorage : Mettre en cache les données utilisateur et les préférences',
                        'sessionStorage : Données de session temporaires'
                    ]
                }
            },
            manage: {
                title: 'Gérer les cookies',
                content: 'Vous pouvez gérer les cookies via les paramètres du navigateur :',
                items: [
                    'Chrome : Paramètres > Confidentialité et sécurité > Cookies',
                    'Firefox : Options > Vie privée et sécurité',
                    'Safari : Préférences > Confidentialité',
                    'Edge : Paramètres > Cookies et autorisations de site'
                ],
                note: 'Remarque : La désactivation des cookies essentiels peut affecter la fonctionnalité du site Web.'
            },
            thirdparty: {
                title: 'Cookies tiers',
                content: 'Nous utilisons les services tiers suivants qui peuvent définir leurs propres cookies :',
                items: [
                    'Supabase : Authentification utilisateur',
                    'Google : Connexion OAuth',
                    'Microsoft : Connexion OAuth'
                ]
            },
            contact: {
                title: 'Contactez-nous',
                content: 'Pour les questions relatives aux cookies, contactez : pptsize@gmail.com'
            }
        }
    },
    
    // Security Page
    security: {
        pageTitle: 'Sécurité',
        metaDescription: 'Découvrez comment pptsize protège la sécurité de vos données',
        lastUpdated: 'Dernière mise à jour',
        sections: {
            intro: {
                title: 'Notre engagement en matière de sécurité',
                content: 'pptsize s\'engage à protéger la sécurité et la confidentialité de vos données. Nous employons des mesures de sécurité multicouches pour garantir la sécurité des informations.'
            },
            measures: {
                title: 'Mesures de sécurité',
                encryption: {
                    title: 'Chiffrement des données',
                    items: [
                        'HTTPS/TLS : Toute transmission de données est cryptée',
                        'Chiffrement de fichiers : Fichiers téléchargés cryptés pendant la transmission et le stockage',
                        'Chiffrement des mots de passe : Mots de passe stockés à l\'aide du hachage bcrypt'
                    ]
                },
                access: {
                    title: 'Contrôle d\'accès',
                    items: [
                        'Contrôle d\'accès basé sur les rôles (RBAC)',
                        'Principe du moindre privilège',
                        'Audits d\'accès réguliers',
                        'Options d\'authentification multifacteur (Google/Microsoft)'
                    ]
                },
                infrastructure: {
                    title: 'Sécurité de l\'infrastructure',
                    items: [
                        'Environnement d\'hébergement cloud sécurisé',
                        'Mises à jour de sécurité et correctifs réguliers',
                        'Pare-feu et systèmes de détection d\'intrusion',
                        'Plans de sauvegarde et de reprise après sinistre'
                    ]
                }
            },
            file: {
                title: 'Sécurité des fichiers',
                items: [
                    'Analyse automatique des fichiers : Prévenir les logiciels malveillants',
                    'Traitement isolé : Chaque fichier traité dans un environnement isolé',
                    'Suppression automatique : Fichiers d\'origine supprimés après traitement',
                    'Stockage temporaire : Aucun service de stockage permanent'
                ]
            },
            practice: {
                title: 'Meilleures pratiques de sécurité',
                user: {
                    title: 'Recommandations utilisateur',
                    items: [
                        'Utilisez des mots de passe forts et changez-les régulièrement',
                        'Activez l\'authentification tierce (Google/Microsoft)',
                        'Ne partagez pas les comptes',
                        'Vérifiez régulièrement l\'activité du compte',
                        'Maintenez le navigateur à jour',
                        'Utilisez des connexions réseau sécurisées'
                    ]
                }
            },
            incident: {
                title: 'Réponse aux incidents de sécurité',
                content: 'En cas d\'incident de sécurité, nous allons :',
                items: [
                    'Enquêter immédiatement et prendre des mesures',
                    'Notifier les utilisateurs concernés',
                    'Coopérer avec les autorités réglementaires',
                    'Prendre des mesures pour éviter la récurrence'
                ]
            },
            report: {
                title: 'Signaler les problèmes de sécurité',
                content: 'Si vous découvrez une vulnérabilité de sécurité, contactez immédiatement : pptsize@gmail.com'
            },
            compliance: {
                title: 'Conformité',
                items: [
                    'RGPD : Règlement général sur la protection des données',
                    'Localisation des données : Conformité à la loi chinoise sur la cybersécurité',
                    'Audits de sécurité réguliers'
                ]
            }
        }
    }
};

// Mount to global object
if (typeof window !== 'undefined') {
    window.fr = fr;
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = fr;
}

