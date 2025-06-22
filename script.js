// Block The Unwanted Website JavaScript

// Global theme and language variables
let currentTheme = 'light';
let currentLang = 'en';

// Initialize theme and language from URL parameters or localStorage
function initializeThemeAndLanguage() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    const urlTheme = urlParams.get('theme');
    const fromExtension = urlParams.get('from') === 'extension';
    const fromOptions = urlParams.get('from') === 'options' || window.location.href.includes('options_page');
    
    console.log('[Website] Initialization params:', { urlLang, urlTheme, fromExtension, fromOptions });
    
    // Detect if opened as options page (no URL parameters)
    const isOptionsPage = !urlParams.toString() && window.location.href.includes('extension-website');
    
    // Flag to track if we've already initialized
    let hasInitialized = false;
    
    // Fallback function that always runs
    function initializeFallback() {
        if (hasInitialized) return;
        hasInitialized = true;
        
        console.log('[Website] 🌐 Using fallback initialization');
        
        // Use URL parameters first, then localStorage
        if (urlLang && urlTheme) {
            currentLang = urlLang;
            currentTheme = urlTheme;
            console.log('[Website] Using URL parameters:', { currentLang, currentTheme });
        } else {
            currentLang = localStorage.getItem('website-language') || 'en';
            currentTheme = localStorage.getItem('website-theme') || 'light';
            console.log('[Website] Using localStorage:', { currentLang, currentTheme });
        }
        
        // Apply theme and language
        setTheme(currentTheme);
        setLanguage(currentLang);
    }
    
    // If opened from extension popup or options, try to get extension settings
    if (fromExtension || fromOptions || isOptionsPage) {
        try {
            // Try to get extension settings from storage with timeout
            if (typeof chrome !== 'undefined' && chrome.storage) {
                // Set a timeout to ensure fallback runs
                const timeout = setTimeout(initializeFallback, 100);
                
                chrome.storage.local.get(['twitter-filter-language', 'twitter-filter-theme'], (result) => {
                    if (hasInitialized) return; // Already initialized by timeout
                    
                    clearTimeout(timeout);
                    hasInitialized = true;
                    
                    const extensionLang = result['twitter-filter-language'] || 'en';
                    const extensionTheme = result['twitter-filter-theme'] || 'light';
                    
                    if (urlLang && urlTheme) {
                        // Use URL parameters (from popup)
                        currentLang = urlLang;
                        currentTheme = urlTheme;
                        console.log('[Website] Using popup parameters:', { currentLang, currentTheme });
                    } else {
                        // Use extension storage (from options or direct access)
                        currentLang = extensionLang;
                        currentTheme = extensionTheme;
                        console.log('[Website] Using extension storage:', { currentLang, currentTheme });
                    }
                    
                    setTheme(currentTheme);
                    setLanguage(currentLang);
                });
                return; // Exit early, async storage or timeout will handle setting
            }
        } catch (error) {
            console.log('[Website] Could not access extension storage, using fallback:', error);
        }
    }
    
    // Always run fallback for non-extension cases
    initializeFallback();
}

// Theme management
function setTheme(theme) {
    currentTheme = theme;
    
    // Use CSS data-theme attribute instead of classes for better CSS variable support
    document.documentElement.setAttribute('data-theme', theme);
    
    // Also set body class for backward compatibility
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
    
    // Apply additional dynamic styles if needed
    if (theme === 'dark') {
        applyDarkTheme();
    } else {
        removeDarkTheme();
    }
    
    // Update theme toggle button
    const themeToggle = document.querySelector('#theme-toggle .theme-icon');
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    
    // Store in localStorage
    localStorage.setItem('website-theme', theme);
    
    console.log('[Website] Theme set to:', theme);
}

// Apply dark theme styles
function applyDarkTheme() {
    // Remove light theme styles first
    removeLightTheme();
    
    // Create or update dark theme style element
    let darkStyleElement = document.getElementById('dark-theme-styles');
    if (!darkStyleElement) {
        darkStyleElement = document.createElement('style');
        darkStyleElement.id = 'dark-theme-styles';
        document.head.appendChild(darkStyleElement);
    }
    
    darkStyleElement.textContent = `
        .dark-theme {
            background-color: #0a0a0a !important;
            color: #e5e5e5 !important;
        }
        .dark-theme .navbar {
            background: rgba(10, 10, 10, 0.98) !important;
            border-bottom: 1px solid #333 !important;
        }
        .dark-theme .hero {
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%) !important;
        }
        .dark-theme .features {
            background: #0f0f0f !important;
        }
        .dark-theme .feature-card {
            background: #1a1a1a !important;
            border: 1px solid #333 !important;
            color: #e5e5e5 !important;
        }
        .dark-theme .how-it-works {
            background: #0a0a0a !important;
        }
        .dark-theme .step {
            background: #1a1a1a !important;
            border: 1px solid #333 !important;
        }
        .dark-theme .pricing {
            background: #0f0f0f !important;
        }
        .dark-theme .pricing-card {
            background: #1a1a1a !important;
            border: 1px solid #333 !important;
        }
        .dark-theme .faq {
            background: #0a0a0a !important;
        }
        .dark-theme .faq-item {
            background: #1a1a1a !important;
            border: 1px solid #333 !important;
        }

        .dark-theme .support {
            background: #0f0f0f !important;
        }
        .dark-theme .footer {
            background: #0a0a0a !important;
            border-top: 1px solid #333 !important;
        }
        .dark-theme h1, .dark-theme h2, .dark-theme h3, .dark-theme h4 {
            color: #f5f5f5 !important;
        }
        .dark-theme p, .dark-theme li {
            color: #d1d1d1 !important;
        }
        .dark-theme .browser-header {
            background: #2a2a2a !important;
            border-bottom: 1px solid #444 !important;
        }
        .dark-theme .browser-content {
            background: #1a1a1a !important;
        }
        .dark-theme .section-title {
            color: #f5f5f5 !important;
        }
        .dark-theme .section-subtitle {
            color: #d1d1d1 !important;
        }
        .dark-theme .nav-links a {
            color: #e5e5e5 !important;
        }
        .dark-theme .nav-links a:hover {
            color: #f59e0b !important;
        }
    `;
}

// Remove dark theme styles and apply light theme
function removeDarkTheme() {
    const darkStyleElement = document.getElementById('dark-theme-styles');
    if (darkStyleElement) {
        darkStyleElement.remove();
    }
    
    // Apply light theme styles
    applyLightTheme();
}

// Apply light theme styles
function applyLightTheme() {
    // Create or update light theme style element
    let lightStyleElement = document.getElementById('light-theme-styles');
    if (!lightStyleElement) {
        lightStyleElement = document.createElement('style');
        lightStyleElement.id = 'light-theme-styles';
        document.head.appendChild(lightStyleElement);
    }
    
    lightStyleElement.textContent = `
        .light-theme {
            background-color: #ffffff !important;
            color: #1a202c !important;
        }
        .light-theme .navbar {
            background: rgba(255, 255, 255, 0.98) !important;
            border-bottom: 1px solid #e2e8f0 !important;
        }
        .light-theme .hero {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%) !important;
        }
        .light-theme .features {
            background: #f8fafc !important;
        }
        .light-theme .feature-card {
            background: #ffffff !important;
            border: 1px solid #e2e8f0 !important;
            color: #1a202c !important;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05) !important;
        }
        .light-theme .how-it-works {
            background: #ffffff !important;
        }
        .light-theme .step {
            background: #f8fafc !important;
            border: 1px solid #e2e8f0 !important;
            color: #1a202c !important;
        }
        .light-theme .pricing {
            background: #f8fafc !important;
        }
        .light-theme .pricing-card {
            background: #ffffff !important;
            border: 1px solid #e2e8f0 !important;
            color: #1a202c !important;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05) !important;
        }
        .light-theme .faq {
            background: #ffffff !important;
        }
        .light-theme .faq-item {
            background: #f8fafc !important;
            border: 1px solid #e2e8f0 !important;
            color: #1a202c !important;
        }

        .light-theme .support {
            background: #f8fafc !important;
        }
        .light-theme .footer {
            background: #ffffff !important;
            border-top: 1px solid #e2e8f0 !important;
        }
        .light-theme h1, .light-theme h2, .light-theme h3, .light-theme h4 {
            color: #1a202c !important;
        }
        .light-theme p, .light-theme li {
            color: #4a5568 !important;
        }
        .light-theme .browser-header {
            background: #f1f5f9 !important;
            border-bottom: 1px solid #e2e8f0 !important;
        }
        .light-theme .browser-content {
            background: #ffffff !important;
        }
        .light-theme .section-title {
            color: #1a202c !important;
        }
        .light-theme .section-subtitle {
            color: #4a5568 !important;
        }
        .light-theme .nav-links a {
            color: #1a202c !important;
        }
        .light-theme .nav-links a:hover {
            color: #f59e0b !important;
        }
        .light-theme .hero-title {
            color: #1a202c !important;
        }
        .light-theme .hero-subtitle {
            color: #4a5568 !important;
        }
        .light-theme .feature-title {
            color: #1a202c !important;
        }
        .light-theme .feature-description {
            color: #4a5568 !important;
        }
        .light-theme .step-title {
            color: #1a202c !important;
        }
        .light-theme .step-description {
            color: #4a5568 !important;
        }
        .light-theme .pricing-title {
            color: #1a202c !important;
        }
        .light-theme .pricing-subtitle {
            color: #4a5568 !important;
        }
        .light-theme .faq-question {
            color: #1a202c !important;
        }
        .light-theme .faq-answer {
            color: #4a5568 !important;
        }
        .light-theme .nav-brand .nav-title {
            color: #1a202c !important;
        }
        .light-theme .stat-number {
            color: #1a202c !important;
        }
        .light-theme .stat-label {
            color: #4a5568 !important;
        }

    `;
}

// Remove light theme styles
function removeLightTheme() {
    const lightStyleElement = document.getElementById('light-theme-styles');
    if (lightStyleElement) {
        lightStyleElement.remove();
    }
}

// Language management
function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    
    // Update language toggle button
    const langToggle = document.querySelector('#lang-toggle .lang-text');
    if (langToggle) {
        langToggle.textContent = lang === 'tr' ? 'TR' : 'EN';
    }
    
    // Apply translations
    applyTranslations(lang);
    
    // Update Buy Me a Coffee widget message
    updateBMCWidgetMessage(lang);
    
    // Store in localStorage
    localStorage.setItem('website-language', lang);
    
    console.log('[Website] Language set to:', lang);
}

// Update Buy Me a Coffee widget message based on language
function updateBMCWidgetMessage(lang) {
    // Wait for widget to load
    setTimeout(() => {
        const bmcWidget = document.querySelector('[data-name="BMC-Widget"]');
        if (bmcWidget) {
            const messages = {
                en: "Thanks for the coffee! ☕ Your support keeps this extension free!",
                tr: "Kahve için teşekkürler! ☕ Desteğiniz bu uzantıyı ücretsiz tutuyor!"
            };
            
            // Update widget message
            bmcWidget.setAttribute('data-message', messages[lang] || messages.en);
            
            // Update widget description
            const descriptions = {
                en: "Support the development of Block The Unwanted!",
                tr: "Block The Unwanted gelişimini destekleyin!"
            };
            
            bmcWidget.setAttribute('data-description', descriptions[lang] || descriptions.en);
        }
    }, 1000);
}

// Apply translations to elements
function applyTranslations(lang) {
    const elements = document.querySelectorAll('[data-en][data-tr]');
    elements.forEach(element => {
        const translation = element.getAttribute(`data-${lang}`);
        if (translation) {
            element.textContent = translation;
        }
    });
    
    // Update page title
    const titles = {
        en: 'Block The Unwanted - Advanced Content Filtering Extension',
        tr: 'Block The Unwanted - Gelişmiş İçerik Filtreleme Uzantısı'
    };
    document.title = titles[lang] || titles.en;
}


document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize theme and language first
    initializeThemeAndLanguage();

    // Install button functionality
    const installBtn = document.getElementById('install-btn');
    if (installBtn) {
        installBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Direct to Chrome Web Store
            const chromeWebStoreUrl = 'https://chrome.google.com/webstore/detail/block-the-unwanted/YOUR_EXTENSION_ID';
            window.open(chromeWebStoreUrl, '_blank');
            
            // Track installation attempt
            if (typeof gtag !== 'undefined') {
                gtag('event', 'install_attempt', {
                    event_category: 'Extension',
                    event_label: 'chrome_web_store'
                });
            }
        });
    }
    
    // Show installation information for users without extension
    function showInstallationInfo() {
        // Ensure we have valid theme and language values
        const safeTheme = currentTheme || 'light';
        const safeLang = currentLang || 'en';
        
        const modal = document.createElement('div');
        modal.className = 'install-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${safeLang === 'tr' ? 'Extension Nasıl Yüklenir?' : 'How to Install Extension?'}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="install-steps">
                        <div class="install-step">
                            <div class="step-number">1</div>
                            <div class="step-text">
                                <h4>${safeLang === 'tr' ? 'Extension Dosyasını İndirin' : 'Download Extension Files'}</h4>
                                <p>${safeLang === 'tr' 
                                    ? 'Bu extension henüz Chrome Web Store\'da yayınlanmamıştır. GitHub\'dan kaynak kodunu indirin.' 
                                    : 'This extension is not yet published on Chrome Web Store. Download source code from GitHub.'}</p>
                            </div>
                        </div>
                        <div class="install-step">
                            <div class="step-number">2</div>
                            <div class="step-text">
                                <h4>${safeLang === 'tr' ? 'Developer Mode Açın' : 'Enable Developer Mode'}</h4>
                                <p>${safeLang === 'tr' 
                                    ? 'Chrome → Ayarlar → Uzantılar → Developer mode açın' 
                                    : 'Chrome → Settings → Extensions → Turn on Developer mode'}</p>
                            </div>
                        </div>
                        <div class="install-step">
                            <div class="step-number">3</div>
                            <div class="step-text">
                                <h4>${safeLang === 'tr' ? 'Extension Yükleyin' : 'Load Extension'}</h4>
                                <p>${safeLang === 'tr' 
                                    ? '"Load unpacked" tıklayın ve extension klasörünü seçin' 
                                    : 'Click "Load unpacked" and select the extension folder'}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="window.open('https://github.com/your-repo/twitter-filter-pro', '_blank')">
                        ${safeLang === 'tr' ? '📂 GitHub\'dan İndir' : '📂 Download from GitHub'}
                    </button>
                    <button class="btn btn-secondary modal-close">${safeLang === 'tr' ? 'Kapat' : 'Close'}</button>
                </div>
            </div>
        `;

        // Add modal styles
        const modalStyles = `
            <style>
            .install-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            }
            .install-modal .modal-content {
                background: ${safeTheme === 'dark' ? '#1a1a1a' : '#ffffff'};
                border-radius: 12px;
                max-width: 600px;
                width: 90%;
                border: 1px solid ${safeTheme === 'dark' ? '#333' : '#e2e8f0'};
                color: ${safeTheme === 'dark' ? '#ffffff' : '#1a202c'};
            }
            .install-modal .modal-header {
                padding: 24px 24px 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .install-modal .modal-header h3 {
                color: #f59e0b;
                margin: 0;
            }
            .install-modal .modal-close {
                background: none;
                border: none;
                font-size: 24px;
                color: #888;
                cursor: pointer;
            }
            .install-modal .modal-body {
                padding: 24px;
            }
            .install-step {
                display: flex;
                gap: 16px;
                margin-bottom: 24px;
                align-items: flex-start;
            }
            .step-number {
                width: 32px;
                height: 32px;
                background: #f59e0b;
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                flex-shrink: 0;
            }
            .step-text h4 {
                margin: 0 0 8px 0;
                color: ${safeTheme === 'dark' ? '#ffffff' : '#1a202c'};
            }
            .step-text p {
                margin: 0;
                color: ${safeTheme === 'dark' ? '#cccccc' : '#4a5568'};
                line-height: 1.5;
            }
            .install-modal .modal-footer {
                padding: 0 24px 24px;
                display: flex;
                gap: 12px;
                justify-content: flex-end;
            }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', modalStyles);
        document.body.appendChild(modal);

        // Close modal functionality
        const closeButtons = modal.querySelectorAll('.modal-close');
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
        });

        // Close on background click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    // Donation button functionality - direct to Buy Me a Coffee
    const donationButtons = document.querySelectorAll('.donation-btn');
    donationButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Direct to Buy Me a Coffee page
            window.open('https://coff.ee/birkankader', '_blank');
            
            // Track donation click
            if (typeof gtag !== 'undefined') {
                gtag('event', 'donation_click', {
                    event_category: 'Donation',
                    event_label: 'coffee_button'
                });
            }
        });
    });

    // Monthly support buttons - direct to Buy Me a Coffee for membership
    const monthlyButtons = document.querySelectorAll('.monthly-btn');
    monthlyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Direct to Buy Me a Coffee page where user can join membership
            window.open('https://coff.ee/birkankader', '_blank');
            
            // Track membership click
            if (typeof gtag !== 'undefined') {
                gtag('event', 'membership_click', {
                    event_category: 'Donation',
                    event_label: 'monthly_membership'
                });
            }
        });
    });

    // Custom amount donation - direct to Buy Me a Coffee
    const customAmountBtn = document.getElementById('custom-amount');
    if (customAmountBtn) {
        customAmountBtn.addEventListener('click', function() {
            // Direct to Buy Me a Coffee page where user can select amount
            window.open('https://coff.ee/birkankader', '_blank');
            
            // Track custom amount click
            if (typeof gtag !== 'undefined') {
                gtag('event', 'custom_amount_click', {
                    event_category: 'Donation',
                    event_label: 'custom_amount_button'
                });
            }
        });
    }

    // Pricing buttons
    const pricingButtons = document.querySelectorAll('.pricing-btn');
    pricingButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.disabled) return;
            
            const card = this.closest('.pricing-card');
            const isFree = card.querySelector('.pricing-title').textContent.includes('Free');
            
            if (isFree) {
                // Direct to installation
                window.open('https://chrome.google.com/webstore/detail/twitter-filter-pro/YOUR_EXTENSION_ID', '_blank');
            } else {
                // Show coming soon message
                showComingSoonInfo();
            }
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // Language toggle functionality
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            const newLang = currentLang === 'en' ? 'tr' : 'en';
            setLanguage(newLang);
        });
    }

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const isDark = currentTheme === 'dark';
        if (window.scrollY > 50) {
            navbar.style.background = isDark ? 'rgba(10, 10, 10, 0.98)' : 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = isDark ? 'rgba(10, 10, 10, 0.95)' : 'rgba(255, 255, 255, 0.95)';
        }
    });

    // FAQ item interaction
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add a subtle animation or effect when clicked
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Feature card hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });

    // Initialize Buy Me a Coffee widget with correct language
    setTimeout(() => {
        updateBMCWidgetMessage(currentLang || 'en');
    }, 2000);

    // Analytics tracking (replace with your analytics code)
    function trackEvent(action, label, value) {
        // Example for Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: 'User Interaction',
                event_label: label,
                value: value
            });
        }
        
        console.log(`Event tracked: ${action} - ${label} - ${value}`);
    }

    // Track button clicks
    document.addEventListener('click', function(e) {
        if (e.target.matches('.btn-primary')) {
            trackEvent('click', 'primary_button', e.target.textContent);
        }
        if (e.target.matches('.donation-btn')) {
            trackEvent('donation_click', 'coffee_button', 'button_click');
        }
    });
});

// Donation handling function
function handleDonation(amount, type) {
    // Replace with actual payment processor integration
    // This is a placeholder for PayPal, Stripe, or other payment systems
    
    const donationData = {
        amount: parseFloat(amount),
        type: type, // 'one-time' or 'monthly'
        currency: 'USD'
    };

    console.log('Processing donation:', donationData);

    // Example PayPal integration
    if (typeof paypal !== 'undefined') {
        // PayPal implementation would go here
        console.log('Redirecting to PayPal...');
    } else {
        // Direct to Buy Me a Coffee main page
        // Buy Me a Coffee doesn't support direct amount URLs
        // Users will select amount on the platform
        const buyMeACoffeeUrl = `https://coff.ee/birkankader`;
        window.open(buyMeACoffeeUrl, '_blank');
    }

    // Track donation attempt
    if (typeof gtag !== 'undefined') {
        gtag('event', 'donation_initiated', {
            event_category: 'Donation',
            event_label: type,
            value: parseFloat(amount)
        });
    }
}

// Show coming soon information
function showComingSoonInfo() {
    const modal = document.createElement('div');
    modal.className = 'premium-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Premium Features Coming Soon</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>We're working hard to bring you advanced AI-powered filtering features:</p>
                <ul>
                    <li>🚧 Advanced OCR with GPT-4 integration</li>
                    <li>🚧 Video speech-to-text analysis</li>
                    <li>🚧 AI-powered content understanding</li>
                    <li>🚧 Batch processing capabilities</li>
                </ul>
                <p><strong>Current Status:</strong> Premium features are in active development. We'll announce availability soon!</p>
                <p>In the meantime, enjoy our powerful free tier with local OCR processing.</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="window.open('https://coff.ee/birkankader', '_blank')">Support Development</button>
                <button class="btn btn-secondary modal-close">Close</button>
            </div>
        </div>
    `;

    // Add modal styles
    const modalStyles = `
        <style>
        .premium-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }
        .modal-content {
            background: #1a1a1a;
            border-radius: 12px;
            max-width: 500px;
            width: 90%;
            border: 1px solid #333;
        }
        .modal-header {
            padding: 20px 20px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .modal-header h3 {
            color: #f59e0b;
            margin: 0;
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            color: #888;
            cursor: pointer;
        }
        .modal-body {
            padding: 20px;
        }
        .modal-body ul {
            margin: 16px 0;
            padding-left: 20px;
        }
        .modal-body li {
            margin-bottom: 8px;
            color: #ccc;
        }
        .modal-body a {
            color: #f59e0b;
        }
        .modal-footer {
            padding: 0 20px 20px;
            display: flex;
            gap: 12px;
            justify-content: flex-end;
        }
        </style>
    `;

    document.head.insertAdjacentHTML('beforeend', modalStyles);
    document.body.appendChild(modal);

    // Close modal functionality
    const closeButtons = modal.querySelectorAll('.modal-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
    });

    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .step, .faq-item, .pricing-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Performance monitoring
window.addEventListener('load', function() {
    // Simple performance logging
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    
    // Track page load time
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_load_time', {
            event_category: 'Performance',
            value: Math.round(loadTime)
        });
    }
});