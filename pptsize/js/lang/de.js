/**
 * German Language Pack (Deutsch)
 */
const de = {
    // SEO Meta Information
    seo: {
        title: 'PPT Komprimieren - Kostenloser Online PPT Kompressor, PPT Dateigröße Reduzieren | pptsize',
        description: 'Kostenloser Online-PPT-Kompressor zur schnellen Reduzierung der PPT-Dateigröße. Komprimieren Sie Bilder, Videos und Audio. Keine Softwareinstallation erforderlich. HD-Qualität beibehalten. Unterstützt .ppt und .pptx Formate, kompatibel mit WPS und Office.',
        keywords: 'PPT komprimieren,PPT Kompressor,PPT Größe reduzieren,PPT Dateigröße,PowerPoint komprimieren,Online PPT Kompression,kostenloser PPT Kompressor,PPT zu groß,wie PPT komprimieren,PPT verkleinern'
    },
    
    // Page Content
    content: {
        advantages: {
            title: 'Unsere Vorteile',
            description: 'Maximale Kompressionsrate von <strong>90%</strong>, unter Beibehaltung <strong>absoluter HD-Qualität</strong>, perfekte Darstellung auf 4K-, 2K- und 1080p-Monitoren.'
        },
        howto: {
            title: 'Wie komprimiert man PPT?',
            items: [
                {
                    title: '1. Bildkompression',
                    description: 'Bilder in PowerPoint-Dateien nehmen normalerweise erheblichen Speicherplatz ein. Durch <strong>Bildkompression</strong>, <strong>Zuschneiden</strong> und <strong>Skalierung von Bildern</strong> kann pptsize alle Bilder problemlos komprimieren und die Dateilast reduzieren, während die <strong>HD-Qualität</strong> erhalten bleibt. Ob Sie 8K-, 4K- oder 1080p-Displays verwenden, komprimierte Dateien bleiben auf HD-Bildschirmen gestochen scharf.'
                },
                {
                    title: '2. Audio-, Video- und Anhangskompression',
                    description: 'PowerPoint-Audio, -Video und -Anhänge sind Hauptverursacher für aufgeblähte PPT-Dateien. Das pptsize-Kompressionstool hilft Ihnen, <strong>Audio und Video zu komprimieren</strong> und sorgt für leichtere Dateien bei gleichzeitig exzellenter Wiedergabequalität.'
                },
                {
                    title: '3. Eingebettete Schriftarten entfernen',
                    description: 'Eine einzelne Schriftart benötigt etwa <strong>10 MB</strong> Speicher. Bitte betten Sie keine Schriftarten ein. Wählen Sie gängige Systemschriften (wie Arial oder Calibri), um benutzerdefinierte Schriften zu ersetzen. Dies reduziert nicht nur die Dateigröße, sondern verbessert auch die Dateikompatibilität und Benutzerfreundlichkeit.'
                }
            ]
        }
    },
    
    // Authentication
    auth: {
        login: 'Anmelden',
        signup: 'Registrieren',
        logout: 'Abmelden',
        email: 'E-Mail',
        password: 'Passwort',
        confirmPassword: 'Passwort bestätigen',
        forgotPassword: 'Passwort vergessen?',
        resetPassword: 'Passwort zurücksetzen',
        noAccount: 'Noch kein Konto?',
        hasAccount: 'Bereits ein Konto?',
        signupNow: 'Jetzt registrieren',
        loginNow: 'Jetzt anmelden',
        pricing: 'Preise',
        backToLogin: 'Zurück zur Anmeldung',
        loginBtn: 'Anmelden',
        signupBtn: 'Registrieren',
        sendResetEmail: 'Zurücksetzungs-E-Mail senden',
        emailPlaceholder: 'E-Mail eingeben',
        passwordPlaceholder: 'Passwort eingeben (mind. 6 Zeichen)',
        confirmPasswordPlaceholder: 'Passwort erneut eingeben',
        emailRequired: 'Bitte E-Mail eingeben',
        passwordRequired: 'Bitte Passwort eingeben',
        passwordMismatch: 'Passwörter stimmen nicht überein',
        processing: 'Wird verarbeitet...',
        loginSuccess: 'Anmeldung erfolgreich',
        signupSuccess: 'Registrierung erfolgreich',
        resetEmailSent: 'Zurücksetzungs-E-Mail gesendet, bitte überprüfen Sie Ihr Postfach',
        resetPasswordInfo: 'Wir senden Ihnen einen Link zum Zurücksetzen des Passworts per E-Mail',
        unknownError: 'Unbekannter Fehler aufgetreten',
        welcome: 'Willkommen, ',
        continueWithGoogle: 'Mit Google fortfahren',
        continueWithMicrosoft: 'Mit Microsoft fortfahren',
        redirecting: 'Weiterleitung zur Autorisierungsseite...',
        or: 'oder',
        usageCount: 'Premium-Nutzungen',
        times: 'Mal',
        freeUser: 'Kostenloser Benutzer',
        premiumUser: 'Premium-Benutzer',
        myAccount: 'Mein Konto',
        myWorks: 'Meine Aufgaben',
        tasks: 'Aufgaben',
        manageSubscription: 'Abonnement verwalten'
    },
    
    // PPT Compressor
    compressor: {
        title: 'Online PPT Kompressor',
        subtitle: 'Komprimieren Sie Ihre PowerPoint-Dateien schnell bei gleichbleibender Qualität',
        upload: 'Datei auswählen',
        or: 'oder',
        drag: 'Datei hier ablegen',
        supported: 'Unterstützt .ppt und .pptx Formate',
        limit: 'Kostenlose Dateigröße: {size}',
        compressionLevel: 'Kompressionsstufe',
        levelStandard: 'Standard',
        levelAdvanced: 'Erweitert',
        levelMaximum: 'Maximum',
        recommended: 'Empfohlen',
        levelAdvancedTip: 'Eingebettete Schriftarten werden entfernt und durch gängige Systemschriften ersetzt',
        levelMaximumTip: 'Eingebettete Schriftarten werden entfernt und durch gängige Systemschriften ersetzt. Bitte stellen Sie sicher, dass die Anzeige 2K oder niedriger ist',
        deviceCompatibility: 'Kompressionsmodus',
        anyDevice: 'Universalmodus',
        anyDeviceTip: 'Kompatibel mit allen Geräten',
        pcMacDevice: 'Hochqualitätsmodus',
        pcMacDeviceTip: 'Wenn Sie sicher sind, es nicht auf Android-Apps (außer WPS Office) zu verwenden, wird dieser Modus empfohlen, verlustfrei, schnell, höhere Kompressionsrate',
        removeFile: 'Entfernen',
        startCompress: 'Kompression starten',
        processing: 'Wird verarbeitet...',
        uploading: 'Wird hochgeladen... (Premium-Benutzer-Aufgabe läuft, bitte verlassen Sie die Seite nicht)',
        compressing: 'Medienkomprimierung ist zeitaufwändig, bitte schließen Sie die Seite nicht, 10 Minuten Zeitüberschreitung (Premium-Benutzer erstellen Aufgaben, in Aufgabenliste einsehbar, E-Mail-Benachrichtigung nach Abschluss)',
        fileName: 'Dateiname',
        original: 'Originalgröße',
        compressed: 'Komprimiert',
        saved: 'Gespart',
        download: 'Komprimierte Datei herunterladen',
        uploadAnother: 'Weitere komprimieren',
        failed: 'Kompression fehlgeschlagen',
        tryAgain: 'Erneut versuchen',
        errorType: 'Bitte laden Sie eine .ppt oder .pptx Datei hoch',
        errorSize: 'Dateigröße darf {size} nicht überschreiten',
        error413: 'Datei zu groß zum Hochladen. Serverlimit ist {size}',
        errorNetwork: 'Netzwerkverbindung fehlgeschlagen, bitte überprüfen und erneut versuchen',
        errorServer: 'Serververarbeitung fehlgeschlagen, bitte versuchen Sie es später erneut',
        // Upgrade Modal
        upgrade: {
            fileSizeLimit: {
                title: 'Dateigröße überschreitet Limit',
                message: 'Die aktuelle Datei überschreitet das Limit für kostenlose Benutzer. Upgraden Sie auf Premium, um größere Dateien zu komprimieren und mehr Funktionen freizuschalten!',
                action: 'Auf Premium upgraden'
            },
            notLoggedIn: {
                title: 'Bitte anmelden',
                message: 'Melden Sie sich an, um größere Dateien zu komprimieren. Jetzt anmelden und loslegen!',
                action: 'Jetzt anmelden'
            },
            notPremium: {
                title: 'Premium erforderlich',
                message: 'Die aktuelle Datei überschreitet das Limit für kostenlose Benutzer. Upgraden Sie auf Premium, um größere Dateien zu komprimieren und mehr Funktionen freizuschalten!',
                action: 'Auf Premium upgraden'
            },
            noUsageCount: {
                title: 'Nutzungslimit erreicht',
                message: 'Ihr Nutzungslimit wurde erreicht. Laden Sie auf, um den Kompressionsdienst weiter zu nutzen!',
                action: 'Jetzt aufladen'
            },
            default: {
                title: 'Hochladen nicht möglich',
                message: 'Dateigröße überschreitet Limit. Bitte upgraden Sie Ihr Konto oder kontaktieren Sie den Support.',
                action: 'Mehr erfahren'
            },
            cancel: 'Abbrechen'
        }
    },
    
    // My Works
    works: {
        pageTitle: 'Meine Aufgaben',
        metaDescription: 'Sehen Sie Ihre PPT-Kompressionsaufgabenliste und laden Sie abgeschlossene Dateien herunter',
        notice: 'Hinweis: Diese Seite zeigt nur die letzten 10 Aufgabendatensätze. pptsize bietet keinen dauerhaften Speicher. Dateien können jederzeit gelöscht werden. Bitte laden Sie sie umgehend herunter!',
        loading: 'Aufgabenliste wird geladen...',
        loadError: 'Laden fehlgeschlagen',
        retry: 'Erneut versuchen',
        empty: 'Noch keine Aufgaben',
        emptyHint: 'Aufgaben werden hier nach dem Komprimieren von Dateien angezeigt',
        loginRequired: 'Bitte melden Sie sich zuerst an',
        loginHint: 'Melden Sie sich an, um Ihre Aufgabenliste zu sehen',
        unknownFile: 'Unbekannte Datei',
        download: 'Herunterladen',
        downloading: 'Wird heruntergeladen',
        downloadSuccess: 'Download erfolgreich',
        downloadError: 'Download fehlgeschlagen',
        saved: 'Gespart',
        status: {
            processing: 'Wird verarbeitet',
            success: 'Abgeschlossen',
            failed: 'Fehlgeschlagen',
            unknown: 'Unbekannt'
        }
    },
    
    // Pricing Page
    pricing: {
        pageTitle: 'Preispläne',
        metaDescription: 'Wählen Sie den richtigen PPT-Kompressionsplan für sich. Flexible Preise, nutzungsbasierte Zahlung',
        title: 'Wählen Sie Ihren Plan',
        subtitle: 'Flexible Preise, nutzungsbasierte Zahlung, erweiterte Funktionen freischalten',
        monthly: 'Monatlich',
        yearly: 'Jährlich',
        payOnce: 'Pro Nutzung zahlen',
        mostPopular: 'Am beliebtesten',
        bestValue: 'Bester Wert',
        currentPlan: 'Aktueller Plan',
        selectPlan: 'Plan auswählen',
        loginRequired: 'Zum Kaufen anmelden',
        features: 'Funktionen',
        plans: {
            payPerUse: {
                name: 'Pro Nutzung zahlen',
                price: '1$',
                priceUnit: '/Nutzung',
                description: 'Für gelegentliche Nutzer',
                features: [
                    'Einzelner Kompressionsdienst',
                    'Dateigrößenlimit 800MB',
                    'Temporäre Aufgabenspeicherung',
                    'E-Mail-Benachrichtigung'
                ]
            },
            weekly: {
                name: '7-Tage Premium',
                price: '7$',
                priceUnit: '/30 Tage',
                description: 'Für kurzfristige intensive Nutzung',
                features: [
                    'Unbegrenzte Nutzung für 30 Tage',
                    'Dateigrößenlimit 800MB',
                    'Temporäre Aufgabenspeicherung',
                    'E-Mail-Benachrichtigung',
                    'VIP-Exklusivkanal',
                    'Echtzeitverarbeitung',
                    'Prioritäts-Support'
                ]
            },
            yearly: {
                name: 'Jahres-Premium',
                price: '50$',
                priceUnit: '/Jahr',
                description: 'Bester Wert für Langzeitnutzer',
                features: [
                    'Unbegrenzte Nutzung für 365 Tage',
                    'Dateigrößenlimit 800MB',
                    'Temporäre Aufgabenspeicherung',
                    'E-Mail-Benachrichtigung',
                    'VIP-Exklusivkanal',
                    'Echtzeitverarbeitung',
                    'Prioritäts-Support'
                ],
                badge: '14€ sparen',
                savings: 'Nur 4,17€/Monat'
            }
        },
        comparisonTable: {
            title: 'Funktionsvergleich',
            free: 'Kostenlos',
            premium: 'Bezahlt',
            features: {
                fileSize: 'Dateigrößenlimit',
                fileSizeFree: '30MB',
                fileSizePremium: '800MB',
                taskStorage: 'Aufgabenspeicherung',
                taskStorageFree: 'Keine Speicherung',
                taskStoragePremium: 'Temporär',
                channel: 'Verarbeitungskanal',
                channelFree: 'Standard',
                channelPremium: 'VIP-Exklusiv*',
                speed: 'Verarbeitungsgeschwindigkeit',
                speedFree: 'Standard',
                speedPremium: 'Echtzeit-Priorität*',
                support: 'Technischer Support',
                supportFree: 'Community',
                supportPremium: 'Prioritäts-Support*'
            },
            note: '* Nur für 7-Tage und Jahres-Premium verfügbar'
        },
        faq: {
            title: 'FAQ',
            questions: [
                {
                    q: 'Wie kann ich bezahlen?',
                    a: 'Wir akzeptieren Kreditkarten, Debitkarten und verschiedene Zahlungsmethoden.'
                },
                {
                    q: 'Kann ich jederzeit kündigen?',
                    a: 'Absolut. Sie können Ihr Abonnement jederzeit in den Kontoeinstellungen kündigen.'
                },
                {
                    q: 'Was ist die Rückerstattungsrichtlinie?',
                    a: 'Wenn Sie innerhalb von 7 Tagen nach dem Kauf nicht zufrieden sind, können Sie eine vollständige Rückerstattung beantragen.'
                },
                {
                    q: 'Was ist das Dateigrößenlimit für Premium?',
                    a: 'Premium hat ein Dateigrößenlimit von 800MB, was die meisten Anwendungsfälle abdeckt.'
                },
                {
                    q: 'Ist meine Datei-Privatsphäre sicher?',
                    a: 'Absolut sicher. Der Server speichert Dateien nur temporär während der Kompression und löscht sie sofort nach der Verarbeitung. Ihre Dateien sind vollständig vertraulich und werden nicht weitergegeben.'
                },
                {
                    q: 'Was tun, wenn die komprimierte Datei in mancher Software nicht korrekt angezeigt wird?',
                    a: 'Da pptsize die neueste Kompressionstechnologie verwendet, empfehlen wir, Dateien in professioneller Mainstream-Software wie WPS, Microsoft Office, PowerPoint usw. zu öffnen. Diese Anwendungen unterstützen das komprimierte Dateiformat vollständig.'
                }
            ]
        }
    },
    
    // Footer
    footer: {
        aboutUs: 'Über uns',
        aboutDesc: 'pptsize ist ein professionelles PPT-Kompressionstool, das Ihnen hilft, Präsentationsdateigrößen schnell zu reduzieren und dabei hohe Qualität beizubehalten.',
        fromText: 'Wir sind von',
        fromLink: 'apadog.com',
        contactText: 'Bei Fragen senden Sie uns bitte eine E-Mail',
        contactEmail: 'pptsize@gmail.com',
        product: 'Produkt',
        home: 'Startseite',
        faq: 'FAQ',
        changelog: 'Änderungsprotokoll',
        support: 'Support',
        helpCenter: 'Hilfe-Center',
        contact: 'Kontakt',
        feedback: 'Feedback',
        apiDocs: 'API-Dokumentation',
        status: 'Status',
        legal: 'Rechtliches',
        privacy: 'Datenschutzrichtlinie',
        terms: 'Nutzungsbedingungen',
        cookies: 'Cookie-Richtlinie',
        license: 'Lizenz',
        security: 'Sicherheit',
        copyright: 'Alle Rechte vorbehalten.',
        madeWith: 'Gemacht mit',
        madeIn: '',
        backToTop: 'Nach oben'
    },
    
    // Privacy Policy Page
    privacy: {
        pageTitle: 'Datenschutzrichtlinie',
        metaDescription: 'Erfahren Sie, wie pptsize Ihre persönlichen Informationen sammelt, verwendet und schützt',
        lastUpdated: 'Zuletzt aktualisiert',
        sections: {
            intro: {
                title: 'Einführung',
                content: 'pptsize ("wir", "unser") schätzt Ihre Privatsphäre. Diese Datenschutzrichtlinie erklärt, wie wir Ihre persönlichen Informationen sammeln, verwenden, offenlegen und schützen, wenn Sie unseren PPT-Kompressionsdienst nutzen.'
            },
            collect: {
                title: 'Informationen, die wir sammeln',
                items: [
                    'Kontoinformationen: E-Mail-Adresse, Anzeigename (bei Registrierung)',
                    'Drittanbieter-Login: Grundlegende Profilinformationen von Google oder Microsoft',
                    'Dateiinformationen: Von Ihnen hochgeladene PPT-Dateien (temporär zur Kompression gespeichert)',
                    'Nutzungsdaten: IP-Adresse, Browsertyp, Zugriffszeit, Nutzungshäufigkeit',
                    'Cookies: Zur Aufrechterhaltung des Login-Status und der Spracheinstellungen'
                ]
            },
            use: {
                title: 'Wie wir Informationen verwenden',
                items: [
                    'PPT-Kompressionsdienst bereitstellen',
                    'Ihr Konto und Mitgliedsstatus verwalten',
                    'Zahlungen und Abonnements verarbeiten',
                    'Servicequalität verbessern',
                    'Dienstbezogene Benachrichtigungen senden',
                    'Betrug und Missbrauch verhindern'
                ]
            },
            storage: {
                title: 'Datenspeicherung',
                items: [
                    'Benutzerauthentifizierung: Gespeichert in Supabase (DSGVO-konform)',
                    'Hochgeladene Dateien: Temporär gespeichert, nach Verarbeitung automatisch gelöscht',
                    'Kostenlose Benutzer-Aufgaben: Nicht gespeichert',
                    'Premium-Benutzer-Aufgaben: Temporär gespeichert, können jederzeit gelöscht werden'
                ]
            },
            sharing: {
                title: 'Informationsweitergabe',
                content: 'Wir verkaufen Ihre persönlichen Informationen nicht. Wir geben Informationen nur in folgenden Fällen weiter:',
                items: [
                    'Dienstanbieter: Supabase (Authentifizierung), Zahlungsabwickler',
                    'Gesetzliche Anforderungen: Einhaltung von Gesetzen, Vorschriften oder rechtlichen Verfahren',
                    'Rechte schützen: Unsere Rechte, Privatsphäre, Sicherheit oder Eigentum schützen'
                ]
            },
            rights: {
                title: 'Ihre Rechte',
                items: [
                    'Zugriff auf Ihre persönlichen Daten',
                    'Korrektur ungenauer Daten',
                    'Löschen Ihres Kontos und Ihrer Daten',
                    'Exportieren Ihrer Daten',
                    'Einwilligung widerrufen',
                    'Widerspruch gegen Datenverarbeitung'
                ]
            },
            security: {
                title: 'Datensicherheit',
                content: 'Wir verwenden branchenübliche Sicherheitsmaßnahmen zum Schutz Ihrer Daten, einschließlich verschlüsselter Übertragung, sicherer Speicherung und Zugriffskontrolle.'
            },
            contact: {
                title: 'Kontaktieren Sie uns',
                content: 'Bei datenschutzbezogenen Fragen kontaktieren Sie: pptsize@gmail.com'
            }
        }
    },
    
    // Terms of Service Page
    terms: {
        pageTitle: 'Nutzungsbedingungen',
        metaDescription: 'pptsize Nutzungsbedingungen und Nutzungsvereinbarung',
        lastUpdated: 'Zuletzt aktualisiert',
        sections: {
            intro: {
                title: 'Annahme der Bedingungen',
                content: 'Durch die Nutzung der pptsize-Dienste stimmen Sie zu, diese Nutzungsbedingungen einzuhalten. Wenn Sie nicht einverstanden sind, nutzen Sie bitte unsere Dienste nicht.'
            },
            service: {
                title: 'Dienstbeschreibung',
                items: [
                    'pptsize bietet Online-PPT-Dateikomprimierungsdienste',
                    'Kostenlose Version bietet grundlegende Komprimierung, 30MB Dateigrößenlimit',
                    'Premium-Version bietet erweiterte Funktionen, 800MB Dateigrößenlimit',
                    'Wir garantieren nur, dass komprimierte Dateien in gängigen Editoren wie WPS, Office und Mac richtig angezeigt werden',
                    'Wir behalten uns das Recht vor, Dienste jederzeit zu ändern oder zu beenden'
                ]
            },
            user: {
                title: 'Benutzerverantwortlichkeiten',
                items: [
                    'Sie müssen 18+ sein oder die Zustimmung eines Erziehungsberechtigten haben',
                    'Genaue Registrierungsinformationen angeben',
                    'Kontosicherheit schützen',
                    'Keine illegalen, rechtsverletzenden oder schädlichen Dateien hochladen',
                    'Den Dienst nicht missbrauchen oder beschädigen',
                    'Keinen unbefugten Zugriff durchführen'
                ]
            },
            content: {
                title: 'Inhalte und geistiges Eigentum',
                items: [
                    'Sie behalten das Eigentum an hochgeladenen Inhalten',
                    'Sie autorisieren uns, Ihre Dateien temporär zu speichern und zu verarbeiten',
                    'Wir sind nicht verantwortlich für Ihre hochgeladenen Inhalte',
                    'Alle geistigen Eigentumsrechte von pptsize gehören uns'
                ]
            },
            payment: {
                title: 'Zahlung und Rückerstattungen',
                items: [
                    'Pro Nutzung zahlen: 1$/Nutzung, keine Rückerstattung',
                    'Abonnement: Abrechnung pro Abonnementzeitraum',
                    'Vollständige Rückerstattung innerhalb von 7 Tagen bei Unzufriedenheit',
                    'Mitgliedschaftsrechte enden sofort nach Rückerstattung'
                ]
            },
            limitation: {
                title: 'Haftungsausschluss',
                items: [
                    'Dienst wird "wie besehen" ohne Garantien bereitgestellt',
                    'Wir garantieren keinen ununterbrochenen oder fehlerfreien Dienst',
                    'Wir sind nicht verantwortlich für Datenverlust oder Dateibeschädigung',
                    'Wir haften nicht für Verluste aus der Dienstnutzung'
                ]
            },
            termination: {
                title: 'Beendigung',
                content: 'Wir behalten uns das Recht vor, Konten, die gegen die Bedingungen verstoßen, ohne Vorankündigung zu beenden oder zu sperren.'
            },
            changes: {
                title: 'Änderungen der Bedingungen',
                content: 'Wir können diese Bedingungen jederzeit aktualisieren. Wesentliche Änderungen werden per E-Mail mitgeteilt.'
            },
            contact: {
                title: 'Kontaktieren Sie uns',
                content: 'Bei Fragen kontaktieren Sie: pptsize@gmail.com'
            }
        }
    },
    
    // Cookie Policy Page
    cookies: {
        pageTitle: 'Cookie-Richtlinie',
        metaDescription: 'Erfahren Sie, wie pptsize Cookies verwendet',
        lastUpdated: 'Zuletzt aktualisiert',
        sections: {
            intro: {
                title: 'Was sind Cookies',
                content: 'Cookies sind kleine Textdateien, die in Ihrem Browser gespeichert werden, um Ihr Gerät zu identifizieren und die Benutzererfahrung zu verbessern.'
            },
            types: {
                title: 'Arten von Cookies, die wir verwenden',
                essential: {
                    title: 'Wesentliche Cookies',
                    description: 'Diese Cookies sind für die Website-Funktionalität unerlässlich',
                    items: [
                        'Authentifizierungs-Cookies: Login-Status aufrechterhalten',
                        'Sicherheits-Cookies: Kontosicherheit schützen',
                        'Sprachpräferenz: Sprachauswahl merken'
                    ]
                },
                functional: {
                    title: 'Funktionale Cookies',
                    description: 'Diese Cookies bieten erweiterte Funktionalität',
                    items: [
                        'localStorage: Benutzerdaten und Einstellungen zwischenspeichern',
                        'sessionStorage: Temporäre Sitzungsdaten'
                    ]
                }
            },
            manage: {
                title: 'Cookies verwalten',
                content: 'Sie können Cookies über die Browsereinstellungen verwalten:',
                items: [
                    'Chrome: Einstellungen > Datenschutz und Sicherheit > Cookies',
                    'Firefox: Optionen > Datenschutz & Sicherheit',
                    'Safari: Einstellungen > Datenschutz',
                    'Edge: Einstellungen > Cookies und Website-Berechtigungen'
                ],
                note: 'Hinweis: Das Deaktivieren wesentlicher Cookies kann die Website-Funktionalität beeinträchtigen.'
            },
            thirdparty: {
                title: 'Cookies von Drittanbietern',
                content: 'Wir verwenden die folgenden Dienste von Drittanbietern, die ihre eigenen Cookies setzen können:',
                items: [
                    'Supabase: Benutzerauthentifizierung',
                    'Google: OAuth-Login',
                    'Microsoft: OAuth-Login'
                ]
            },
            contact: {
                title: 'Kontaktieren Sie uns',
                content: 'Bei Cookie-bezogenen Fragen kontaktieren Sie: pptsize@gmail.com'
            }
        }
    },
    
    // Security Page
    security: {
        pageTitle: 'Sicherheit',
        metaDescription: 'Erfahren Sie, wie pptsize Ihre Datensicherheit schützt',
        lastUpdated: 'Zuletzt aktualisiert',
        sections: {
            intro: {
                title: 'Unser Sicherheitsversprechen',
                content: 'pptsize verpflichtet sich, Ihre Datensicherheit und Privatsphäre zu schützen. Wir setzen mehrschichtige Sicherheitsmaßnahmen ein, um die Informationssicherheit zu gewährleisten.'
            },
            measures: {
                title: 'Sicherheitsmaßnahmen',
                encryption: {
                    title: 'Datenverschlüsselung',
                    items: [
                        'HTTPS/TLS: Alle Datenübertragungen sind verschlüsselt',
                        'Dateiverschlüsselung: Hochgeladene Dateien bei Übertragung und Speicherung verschlüsselt',
                        'Passwortverschlüsselung: Passwörter mit bcrypt-Hash gespeichert'
                    ]
                },
                access: {
                    title: 'Zugriffskontrolle',
                    items: [
                        'Rollenbasierte Zugriffskontrolle (RBAC)',
                        'Prinzip der geringsten Berechtigung',
                        'Regelmäßige Zugriffsprüfungen',
                        'Multi-Faktor-Authentifizierung Optionen (Google/Microsoft)'
                    ]
                },
                infrastructure: {
                    title: 'Infrastruktursicherheit',
                    items: [
                        'Sichere Cloud-Hosting-Umgebung',
                        'Regelmäßige Sicherheitsupdates und Patches',
                        'Firewalls und Intrusion-Detection-Systeme',
                        'Datensicherung und Disaster-Recovery-Pläne'
                    ]
                }
            },
            file: {
                title: 'Dateisicherheit',
                items: [
                    'Automatisches Datei-Scannen: Malware verhindern',
                    'Isolierte Verarbeitung: Jede Datei in isolierter Umgebung verarbeitet',
                    'Automatisches Löschen: Originaldateien nach Verarbeitung gelöscht',
                    'Temporäre Speicherung: Kein dauerhafter Speicherdienst'
                ]
            },
            practice: {
                title: 'Sicherheits-Best-Practices',
                user: {
                    title: 'Benutzerempfehlungen',
                    items: [
                        'Verwenden Sie starke Passwörter und ändern Sie sie regelmäßig',
                        'Aktivieren Sie Drittanbieter-Authentifizierung (Google/Microsoft)',
                        'Teilen Sie keine Konten',
                        'Überprüfen Sie regelmäßig Kontoaktivitäten',
                        'Halten Sie Browser aktuell',
                        'Verwenden Sie sichere Netzwerkverbindungen'
                    ]
                }
            },
            incident: {
                title: 'Reaktion auf Sicherheitsvorfälle',
                content: 'Im Falle eines Sicherheitsvorfalls werden wir:',
                items: [
                    'Sofort untersuchen und Maßnahmen ergreifen',
                    'Betroffene Benutzer benachrichtigen',
                    'Mit Regulierungsbehörden zusammenarbeiten',
                    'Maßnahmen ergreifen, um Wiederholung zu verhindern'
                ]
            },
            report: {
                title: 'Sicherheitsprobleme melden',
                content: 'Wenn Sie eine Sicherheitslücke entdecken, kontaktieren Sie sofort: pptsize@gmail.com'
            },
            compliance: {
                title: 'Compliance',
                items: [
                    'DSGVO: Datenschutz-Grundverordnung',
                    'Datenlokalisierung: Einhaltung des chinesischen Cybersicherheitsgesetzes',
                    'Regelmäßige Sicherheitsaudits'
                ]
            }
        }
    }
};

// Mount to global object
if (typeof window !== 'undefined') {
    window.de = de;
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = de;
}

