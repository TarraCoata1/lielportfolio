// TarraCoata Studio - Internationalization (i18n) System
// Handles language switching, RTL support, and translation loading

class I18n {
    constructor() {
        this.currentLang = 'he'; // Default to Hebrew
        this.translations = {};
        this.supportedLangs = ['en', 'he', 'es', 'ru'];
        this.rtlLangs = ['he'];
        this.init();
    }

    // Initialize i18n system
    async init() {
        // Get saved language preference
        const savedLang = localStorage.getItem('tarracoata-lang');
        
        // Determine initial language - default to Hebrew if no preference exists
        let initialLang = 'he'; // Default to Hebrew
        if (savedLang && this.supportedLangs.includes(savedLang)) {
            initialLang = savedLang; // Respect saved preference
        }

        // Load translations - ensure they're loaded before applying
        const loaded = await this.loadTranslations(initialLang);
        
        // If initial language failed to load, use English
        if (!loaded && initialLang !== 'en' && this.translations['en']) {
            initialLang = 'en';
        }
        
        // Ensure we have at least English loaded
        if (!this.translations[initialLang] && !this.translations['en']) {
            throw new Error('Failed to load any translations');
        }
        
        // Apply language only after translations are confirmed loaded
        if (this.translations[initialLang]) {
            this.applyLanguage(initialLang);
        } else if (this.translations['en']) {
            this.applyLanguage('en');
        }
        
        // Ensure flags are initialized after DOM is ready
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            // Use setTimeout to ensure DOM is fully ready
            setTimeout(() => {
                this.updateLanguageSwitcher();
            }, 100);
        }
    }

    // Load translation file
    async loadTranslations(lang) {
        try {
            const response = await fetch(`locales/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load ${lang}.json: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            
            // Validate JSON structure
            if (!data || typeof data !== 'object') {
                throw new Error(`Invalid JSON structure in ${lang}.json`);
            }
            
            this.translations[lang] = data;
            return true; // Success
        } catch (error) {
            // If Hebrew fails, try English as fallback
            if (lang === 'he') {
                if (!this.translations['en']) {
                    await this.loadTranslations('en');
                }
                return false; // Hebrew load failed
            }
            // If English fails, it's critical
            if (lang === 'en') {
                throw new Error('Critical: Failed to load English translations');
            }
            // For other languages, try English fallback
            if (!this.translations['en']) {
                await this.loadTranslations('en');
            }
            return false; // Load failed
        }
    }

    // Get translation by key path (e.g., 'nav.home')
    t(key, params = {}) {
        // Check if translations are loaded for current language
        if (!this.translations[this.currentLang]) {
            // If translations not loaded, try to load English as fallback
            if (this.translations['en']) {
                this.currentLang = 'en'; // Temporarily switch to English
                const result = this.t(key, params);
                this.currentLang = localStorage.getItem('tarracoata-lang') || 'he';
                return result;
            }
            return key; // Return key if no translations available
        }

        const keys = key.split('.');
        let value = this.translations[this.currentLang];

        // Navigate through nested object
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                // Key not found - try fallback languages
                return this.getFallbackTranslation(key, params);
            }
        }

        // If value is undefined or null, try fallback
        if (value === undefined || value === null) {
            return this.getFallbackTranslation(key, params);
        }

        return this.interpolate(value, params);
    }

    // Get fallback translation (English if Hebrew fails, Hebrew if other languages fail)
    getFallbackTranslation(key, params) {
        const keys = key.split('.');
        
        // If current language is Hebrew, fallback to English
        if (this.currentLang === 'he' && this.translations['en']) {
            let fallbackValue = this.translations['en'];
            for (const k of keys) {
                if (fallbackValue && typeof fallbackValue === 'object' && k in fallbackValue) {
                    fallbackValue = fallbackValue[k];
                } else {
                    // Key doesn't exist even in English - return key
                    return key;
                }
            }
            return this.interpolate(fallbackValue, params);
        }
        
        // If current language is not Hebrew, try Hebrew first, then English
        if (this.currentLang !== 'he' && this.translations['he']) {
            let fallbackValue = this.translations['he'];
            for (const k of keys) {
                if (fallbackValue && typeof fallbackValue === 'object' && k in fallbackValue) {
                    fallbackValue = fallbackValue[k];
                } else {
                    // Try English as last resort
                    if (this.translations['en']) {
                        fallbackValue = this.translations['en'];
                        for (const ek of keys) {
                            if (fallbackValue && typeof fallbackValue === 'object' && ek in fallbackValue) {
                                fallbackValue = fallbackValue[ek];
                            } else {
                                return key; // Key not found anywhere
                            }
                        }
                        return this.interpolate(fallbackValue, params);
                    }
                    return key;
                }
            }
            return this.interpolate(fallbackValue, params);
        }
        
        // Try English as last resort
        if (this.translations['en']) {
            let fallbackValue = this.translations['en'];
            for (const k of keys) {
                if (fallbackValue && typeof fallbackValue === 'object' && k in fallbackValue) {
                    fallbackValue = fallbackValue[k];
                } else {
                    return key; // Key not found
                }
            }
            return this.interpolate(fallbackValue, params);
        }
        
        // No fallback available - return key
        return key;
    }

    // Interpolate parameters in translation strings
    interpolate(str, params) {
        if (typeof str !== 'string') return str;
        return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return params[key] !== undefined ? params[key] : match;
        });
    }

    // Switch language
    async switchLanguage(lang) {
        if (!this.supportedLangs.includes(lang)) {
            return; // Silent fail for unsupported languages
        }

        // Load translations if not already loaded
        if (!this.translations[lang]) {
            const loaded = await this.loadTranslations(lang);
            // If load failed and we're trying to switch to Hebrew, ensure English is available
            if (!loaded && lang === 'he' && !this.translations['en']) {
                await this.loadTranslations('en');
            }
        }

        // Only apply if translations are loaded
        if (this.translations[lang]) {
            this.applyLanguage(lang);
            // Save preference
            localStorage.setItem('tarracoata-lang', lang);
        } else if (this.translations['en']) {
            // Fallback to English if requested language failed
            this.applyLanguage('en');
        }
    }

    // Apply language to page
    applyLanguage(lang) {
        // Ensure translations are loaded before applying
        if (!this.translations[lang]) {
            // If translations not loaded, try to load them
            this.loadTranslations(lang).then(() => {
                if (this.translations[lang]) {
                    this.applyLanguage(lang);
                }
            });
            return;
        }

        this.currentLang = lang;

        // Update HTML lang and dir attributes IMMEDIATELY (use setAttribute for reliability)
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', this.rtlLangs.includes(lang) ? 'rtl' : 'ltr');

        // Update meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && this.translations[lang]?.meta?.description) {
            metaDesc.setAttribute('content', this.translations[lang].meta.description);
        }

        // Update Open Graph description
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc && this.translations[lang]?.meta?.description) {
            ogDesc.setAttribute('content', this.translations[lang].meta.description);
        }

        // Update page title
        if (this.translations[lang]?.meta?.title) {
            document.title = this.translations[lang].meta.title;
        }

        // Update Open Graph title
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle && this.translations[lang]?.meta?.title) {
            ogTitle.setAttribute('content', this.translations[lang].meta.title);
        }

        // Translate all elements with data-i18n attribute
        this.translateElements();

        // Update language switcher UI
        this.updateLanguageSwitcher();

        // Trigger custom event for other scripts
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }

    // Translate all elements with data-i18n attributes
    translateElements() {
        // Ensure translations are loaded before translating
        if (!this.translations[this.currentLang]) {
            // If current language not loaded, try to load it
            this.loadTranslations(this.currentLang).then(() => {
                // Retry translation after loading
                this.translateElements();
            });
            return;
        }

        // Use requestAnimationFrame to batch DOM updates and prevent layout shifts
        requestAnimationFrame(() => {
            const elements = document.querySelectorAll('[data-i18n]');
            
            elements.forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (!key) return; // Skip if no key
                
                let translation = this.t(key);
                
                // Don't set if translation is the same as key (indicates missing translation)
                if (translation === key && this.translations[this.currentLang]) {
                    // Key not found - try English fallback silently
                    if (this.currentLang !== 'en' && this.translations['en']) {
                        const keys = key.split('.');
                        let fallbackValue = this.translations['en'];
                        for (const k of keys) {
                            if (fallbackValue && typeof fallbackValue === 'object' && k in fallbackValue) {
                                fallbackValue = fallbackValue[k];
                            } else {
                                return; // Skip this element if no translation found
                            }
                        }
                        if (fallbackValue && typeof fallbackValue === 'string') {
                            translation = fallbackValue;
                        } else {
                            return; // Skip if still no valid translation
                        }
                    } else {
                        return; // Skip if no fallback available
                    }
                }

                // Handle different element types
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    // For inputs, update placeholder
                    if (element.hasAttribute('data-i18n-placeholder')) {
                        element.placeholder = translation;
                    } else {
                        element.value = translation;
                    }
                } else if (element.hasAttribute('data-i18n-html')) {
                    // For HTML content
                    element.innerHTML = translation;
                } else if (element.hasAttribute('data-i18n-aria-label')) {
                    // For aria-label
                    element.setAttribute('aria-label', translation);
                } else {
                    // Default: text content (use textContent to prevent XSS)
                    element.textContent = translation;
                }
            });

            // Handle alt text
            const altElements = document.querySelectorAll('[data-i18n-alt]');
            altElements.forEach(element => {
                const key = element.getAttribute('data-i18n-alt');
                if (!key) return;
                const translation = this.t(key);
                if (translation !== key) {
                    element.setAttribute('alt', translation);
                }
            });

            // Handle nested translations (e.g., portfolio projects)
            this.translateNestedElements();
        });
    }

    // Translate nested elements (like portfolio projects)
    translateNestedElements() {
        // Portfolio projects
        const portfolioCards = document.querySelectorAll('[data-project]');
        portfolioCards.forEach(card => {
            const projectId = card.getAttribute('data-project');
            const project = this.translations[this.currentLang]?.portfolio?.projects?.[projectId];
            
            if (project) {
                const categoryEl = card.querySelector('[data-i18n-category]');
                const titleEl = card.querySelector('[data-i18n-title]');
                const descEl = card.querySelector('[data-i18n-description]');
                
                if (categoryEl) categoryEl.textContent = project.category;
                if (titleEl) titleEl.textContent = project.title;
                if (descEl) descEl.textContent = project.description;
            }
        });

        // Pricing features and prices
        const pricingCards = document.querySelectorAll('[data-pricing-tier]');
        pricingCards.forEach(card => {
            const tier = card.getAttribute('data-pricing-tier');
            const pricing = this.translations[this.currentLang]?.pricing?.[tier];
            
            if (pricing) {
                // Update features
                const features = pricing.features;
                const featureList = card.querySelectorAll('[data-i18n-feature]');
                featureList.forEach((el) => {
                    const featureNum = el.getAttribute('data-i18n-feature');
                    if (features[featureNum]) {
                        el.textContent = features[featureNum];
                    }
                });
                
                // Update price dynamically
                const priceEl = card.querySelector('[data-i18n-price]');
                if (priceEl && pricing.price) {
                    priceEl.textContent = pricing.price;
                }
            }
        });

        // FAQ questions and answers are handled by data-i18n attributes
        // No need for manual translation here

        // Select options
        const selectOptions = document.querySelectorAll('select option[data-i18n]');
        selectOptions.forEach(option => {
            const key = option.getAttribute('data-i18n');
            const translation = this.t(key);
            option.textContent = translation;
        });
    }

    // Update language switcher UI
    updateLanguageSwitcher() {
        // Ensure DOM is ready
        if (document.readyState === 'loading') {
            return;
        }

        const currentFlags = document.querySelectorAll('.lang-switcher-current');
        const langNames = document.querySelectorAll('.lang-switcher-current-name');
        
        // Update current flag display
        currentFlags.forEach(flag => {
            if (flag) {
                flag.innerHTML = this.getFlagIcon(this.currentLang);
            }
        });
        
        // Update current language name
        langNames.forEach(name => {
            if (name) {
                name.textContent = this.getLanguageName(this.currentLang);
            }
        });

        // Update flag icons and active state in dropdown
        const langButtons = document.querySelectorAll('.lang-switcher-option');
        langButtons.forEach(btn => {
            const btnLang = btn.getAttribute('data-lang');
            if (!btnLang) return;
            
            const flagEl = btn.querySelector('.lang-switcher-flag');
            if (flagEl) {
                flagEl.innerHTML = this.getFlagIcon(btnLang);
            }
            
            // Update active state
            if (btnLang === this.currentLang) {
                btn.classList.add('active');
                btn.setAttribute('aria-current', 'true');
            } else {
                btn.classList.remove('active');
                btn.removeAttribute('aria-current');
            }
        });
    }

    // Get flag icon from CDN (flag-icons by Lipis)
    getFlagIcon(lang) {
        // Map language codes to country codes for flag-icons
        const countryCodes = {
            en: 'us',  // English -> United States flag
            he: 'il',  // Hebrew -> Israel flag
            es: 'es',  // Spanish -> Spain flag
            ru: 'ru'   // Russian -> Russia flag
        };
        
        const countryCode = countryCodes[lang] || 'us';
        const flagUrl = `https://cdn.jsdelivr.net/npm/flag-icons@7.2.3/svg/${countryCode}.svg`;
        const altText = this.getLanguageName(lang);
        
        // Return img tag with CDN URL - ensure proper attributes for accessibility and performance
        // Add error handling for broken images
        return `<img src="${flagUrl}" alt="${altText}" class="flag-icon" width="20" height="15" loading="lazy" aria-hidden="false" onerror="this.style.display='none'; this.parentElement.style.backgroundColor='rgba(212,175,55,0.1)';" />`;
    }

    // Get language name
    getLanguageName(lang) {
        const names = {
            en: 'English',
            he: 'עברית',
            es: 'Español',
            ru: 'Русский'
        };
        return names[lang] || lang.toUpperCase();
    }
}

// Initialize i18n when DOM is ready
let i18n;
document.addEventListener('DOMContentLoaded', async () => {
    i18n = new I18n();
    
    // Wait for i18n to initialize, then set up language switcher
    setTimeout(() => {
        // Ensure flags are displayed
        if (i18n && typeof i18n.updateLanguageSwitcher === 'function') {
            i18n.updateLanguageSwitcher();
        }
        
        // Set up language switcher event listeners
        const langSwitchers = document.querySelectorAll('.lang-switcher');
        const langDropdowns = document.querySelectorAll('.lang-switcher-dropdown');
        const langOptions = document.querySelectorAll('.lang-switcher-option');

        // Toggle dropdown for each switcher
        langSwitchers.forEach(switcher => {
            switcher.addEventListener('click', (e) => {
                e.stopPropagation();
                const dropdown = switcher.nextElementSibling;
                if (dropdown && dropdown.classList.contains('lang-switcher-dropdown')) {
                    dropdown.classList.toggle('hidden');
                }
            });

            // Keyboard support
            switcher.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    switcher.click();
                }
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            langSwitchers.forEach(switcher => {
                if (!switcher.contains(e.target)) {
                    const dropdown = switcher.nextElementSibling;
                    if (dropdown && dropdown.classList.contains('lang-switcher-dropdown')) {
                        dropdown.classList.add('hidden');
                    }
                }
            });
        });

        // Handle language option clicks
        langOptions.forEach(option => {
            option.addEventListener('click', async (e) => {
                e.stopPropagation();
                const lang = option.getAttribute('data-lang');
                if (lang && i18n && i18n.supportedLangs && i18n.supportedLangs.includes(lang)) {
                    // Close all dropdowns
                    langDropdowns.forEach(dropdown => {
                        dropdown.classList.add('hidden');
                    });
                    // Preserve scroll position before switching
                    const scrollY = window.scrollY;
                    await i18n.switchLanguage(lang);
                    // Restore scroll position after translation (double RAF for reliability)
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            window.scrollTo({ top: scrollY, behavior: 'auto' });
                        });
                    });
                }
            });
            
            // Keyboard support for language options
            option.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    option.click();
                }
            });
        });
    }, 150);
});

// Export for use in other scripts
window.i18n = i18n;

