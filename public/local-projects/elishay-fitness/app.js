// # Internationalization (i18n) System
// Loads translations from JSON files and updates page content dynamically
// Robust implementation with error handling and fallbacks

let currentLang = localStorage.getItem('language') || 'he';
let translations = {};
let translationsLoaded = false;

// # Load translation files with retry and error handling
async function loadTranslations(lang) {
    try {
        const response = await fetch(`locales/${lang}.json`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data || typeof data !== 'object') {
            throw new Error(`Invalid JSON structure for ${lang}`);
        }
        
        translations[lang] = data;
        console.log(`✓ Loaded translations for ${lang}`);
        return data;
    } catch (error) {
        console.error(`✗ Error loading ${lang} translations:`, error);
        
        // Fallback to English if Hebrew fails
        if (lang === 'he' && translations['en']) {
            console.warn('Falling back to English translations');
            translations[lang] = translations['en'];
            return translations['en'];
        }
        
        return null;
    }
}

// # Get nested translation value by key path (e.g., "nav.home")
function getTranslation(key, lang = currentLang) {
    if (!key) return '';
    
    // Ensure we have translations loaded
    if (!translations[lang]) {
        console.warn(`Translations for ${lang} not loaded, using key: ${key}`);
        return key;
    }
    
    const keys = key.split('.');
    let value = translations[lang];
    
    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            // Fallback to English if key not found
            if (lang !== 'en' && translations['en']) {
                let fallbackValue = translations['en'];
                for (const fk of keys) {
                    if (fallbackValue && typeof fallbackValue === 'object' && fk in fallbackValue) {
                        fallbackValue = fallbackValue[fk];
                    } else {
                        console.warn(`Translation key not found: ${key} (lang: ${lang})`);
                        return key;
                    }
                }
                return fallbackValue || key;
            }
            console.warn(`Translation key not found: ${key} (lang: ${lang})`);
            return key;
        }
    }
    
    // Return the value if it's a string, otherwise return the key
    if (typeof value === 'string' && value.length > 0) {
        return value;
    }
    
    return key;
}

// # Update all elements with data-i18n attributes
function updateTranslations() {
    if (!translations[currentLang]) {
        console.error(`Cannot update translations: ${currentLang} not loaded`);
        // Try to fallback to English
        if (currentLang !== 'en' && translations['en']) {
            console.warn('Falling back to English translations');
            currentLang = 'en';
        } else {
            return;
        }
    }
    
    const elements = document.querySelectorAll('[data-i18n]');
    let updatedCount = 0;
    let errorCount = 0;
    const missingKeys = new Set();
    
    elements.forEach(element => {
        try {
            const key = element.getAttribute('data-i18n');
            if (!key) return;
            
            const translation = getTranslation(key);
            
            // Verify translation is valid (not the key itself)
            if (translation === key && key.includes('.')) {
                errorCount++;
                missingKeys.add(key);
                // Don't update if translation failed - keep existing text
                return;
            }
            
            // Handle different element types
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                // Handle placeholder attributes
                if (element.hasAttribute('data-i18n-placeholder')) {
                    const placeholderKey = element.getAttribute('data-i18n-placeholder');
                    const placeholderTranslation = getTranslation(placeholderKey);
                    if (placeholderTranslation !== placeholderKey) {
                        element.placeholder = placeholderTranslation;
                        updatedCount++;
                    }
                } else if (translation !== key) {
                    element.placeholder = translation;
                    updatedCount++;
                }
            } else if (element.tagName === 'IMG') {
                // Handle alt text for images
                if (translation && translation !== key) {
                    element.alt = translation;
                    updatedCount++;
                }
            } else if (element.tagName === 'OPTION') {
                // Handle option text
                if (translation && translation !== key) {
                    element.textContent = translation;
                    updatedCount++;
                }
            } else if (element.tagName === 'LABEL') {
                // Handle label text
                if (translation && translation !== key) {
                    element.textContent = translation;
                    updatedCount++;
                }
            } else {
                // Handle regular text content (div, span, p, h1-h6, a, button, etc.)
                if (translation && translation !== key) {
                    element.textContent = translation;
                    updatedCount++;
                }
            }
        } catch (error) {
            errorCount++;
            console.error('Error updating element:', error, element);
        }
    });
    
    // Update meta tags
    if (translations[currentLang] && translations[currentLang].meta) {
        if (translations[currentLang].meta.title) {
            document.title = translations[currentLang].meta.title;
        }
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && translations[currentLang].meta.description) {
            metaDesc.content = translations[currentLang].meta.description;
        }
    }
    
    // Log results
    if (missingKeys.size > 0) {
        console.warn(`⚠ Missing translations for ${missingKeys.size} keys:`, Array.from(missingKeys));
    }
    
    if (errorCount === 0 && missingKeys.size === 0) {
        console.log(`✓ Updated ${updatedCount} elements - all translations applied`);
    } else {
        console.log(`✓ Updated ${updatedCount} elements${errorCount > 0 ? `, ${errorCount} errors` : ''}${missingKeys.size > 0 ? `, ${missingKeys.size} missing keys` : ''}`);
    }
}

// # Switch language and update page direction
async function switchLanguage(lang) {
    // Validate language code
    const validLangs = ['en', 'he'];
    if (!validLangs.includes(lang)) {
        console.error(`Invalid language code: ${lang}`);
        return;
    }
    
    // If already set and loaded, just ensure UI is updated
    if (currentLang === lang && translations[lang]) {
        // Double-check that all translations are applied
        updateTranslations();
        updateLanguageButtons(lang);
        return;
    }
    
    // CRITICAL: Preserve scroll position before any changes
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // Load translation if not already loaded
    if (!translations[lang]) {
        const loaded = await loadTranslations(lang);
        if (!loaded) {
            console.error(`Failed to load translations for ${lang}, keeping current language`);
            // Fallback to English if available
            if (lang !== 'en' && translations['en']) {
                console.warn(`Falling back to English`);
                lang = 'en';
            } else {
                return;
            }
        }
    }
    
    // Verify translations are loaded before proceeding
    if (!translations[lang] || typeof translations[lang] !== 'object') {
        console.error(`Translations for ${lang} are invalid`);
        return;
    }
    
    // Update current language
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Determine RTL status
    const isRTL = lang === 'he';
    
    // CRITICAL: Prevent layout shifts by using requestAnimationFrame
    requestAnimationFrame(() => {
        // Update HTML lang and dir attributes IMMEDIATELY
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
        
        // Update body class and font for RTL support (without causing reflow)
        if (isRTL) {
            document.body.classList.add('rtl');
            document.body.style.fontFamily = "'Heebo', sans-serif";
            document.body.style.direction = 'rtl';
        } else {
            document.body.classList.remove('rtl');
            document.body.style.fontFamily = "'Montserrat', sans-serif";
            document.body.style.direction = 'ltr';
        }
        
        // Update ALL translations - this must happen after direction is set
        updateTranslations();
        
        // Update language button states
        updateLanguageButtons(lang);
        
        // CRITICAL: Restore scroll position immediately after updates
        requestAnimationFrame(() => {
            window.scrollTo(0, scrollPosition);
            
            // Verify no translation keys are visible
            setTimeout(() => {
                verifyTranslations();
            }, 100);
        });
    });
    
    console.log(`✓ Language switched to ${lang} (${isRTL ? 'RTL' : 'LTR'})`);
}

// # Update language button active states
function updateLanguageButtons(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// # Verify no translation keys are visible on the page
function verifyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    let issues = [];
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const text = element.textContent || element.alt || element.placeholder || '';
        
        // Check if text content matches the key (indicates translation failed)
        if (text === key || text.includes(key.split('.').pop())) {
            // This might be a false positive, but log it
            if (element.tagName !== 'OPTION' || text !== '') {
                issues.push({ element, key, text });
            }
        }
    });
    
    if (issues.length > 0) {
        console.warn(`⚠ Found ${issues.length} potential translation issues:`, issues);
    } else {
        console.log('✓ All translations verified - no keys visible');
    }
}

// # Initialize language on page load
async function initLanguage() {
    console.log('Initializing i18n system...');
    
    // Determine which languages to load based on current language preference
    const languagesToLoad = [currentLang];
    
    // Always load English as fallback
    if (currentLang !== 'en') {
        languagesToLoad.push('en');
    }
    
    // Load required languages in parallel
    const loadPromises = languagesToLoad.map(lang => loadTranslations(lang));
    const results = await Promise.all(loadPromises);
    
    // Verify at least one language loaded successfully
    const loadedSuccessfully = results.some(result => result !== null);
    if (!loadedSuccessfully) {
        console.error('CRITICAL: Failed to load any translations');
        return;
    }
    
    // If current language failed, fallback to English
    if (!translations[currentLang] && translations['en']) {
        console.warn(`Failed to load ${currentLang}, falling back to English`);
        currentLang = 'en';
        localStorage.setItem('language', 'en');
    }
    
    translationsLoaded = true;
    
    // Switch to saved language or default - this will apply all translations
    await switchLanguage(currentLang);
    
    // Final verification
    console.log('✓ i18n system initialized');
}

// # Smooth scrolling for anchor links
function initSmoothScroll() {
    // Use event delegation to handle dynamically added links
    document.addEventListener('click', function(e) {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;
        
        const href = anchor.getAttribute('href');
        if (href === '#' || !href) return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const navbar = document.getElementById('navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 80;
            const offsetTop = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: Math.max(0, offsetTop),
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
}

// # Mobile menu toggle
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// # FAQ Accordion functionality
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            const answer = faqItem.querySelector('.faq-answer');
            const icon = question.querySelector('.faq-icon');
            
            // Close other open FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    const otherAnswer = item.querySelector('.faq-answer');
                    const otherIcon = item.querySelector('.faq-icon');
                    if (otherAnswer && !otherAnswer.classList.contains('hidden')) {
                        otherAnswer.classList.add('hidden');
                        if (otherIcon) {
                            otherIcon.style.transform = 'rotate(0deg)';
                        }
                    }
                }
            });
            
            // Toggle current FAQ
            if (answer) {
                answer.classList.toggle('hidden');
                if (icon) {
                    icon.style.transform = answer.classList.contains('hidden') 
                        ? 'rotate(0deg)' 
                        : 'rotate(180deg)';
                }
            }
        });
    });
}

// # Order form modal functionality
function initOrderModal() {
    const orderButtons = document.querySelectorAll('.order-btn');
    const orderModal = document.getElementById('order-modal');
    const closeModal = document.getElementById('close-order-modal');
    const orderForm = document.getElementById('order-form');
    
    // Open modal when order button is clicked
    orderButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const packageId = btn.getAttribute('data-package');
            if (orderModal && orderForm) {
                // Set selected package in form
                const packageSelect = orderForm.querySelector('select[name="package"]');
                if (packageSelect) {
                    packageSelect.value = packageId;
                }
                orderModal.classList.remove('hidden');
            }
        });
    });
    
    // Close modal
    if (closeModal && orderModal) {
        closeModal.addEventListener('click', () => {
            orderModal.classList.add('hidden');
        });
    }
    
    // Close modal when clicking outside
    if (orderModal) {
        orderModal.addEventListener('click', (e) => {
            if (e.target === orderModal) {
                orderModal.classList.add('hidden');
            }
        });
    }
    
    // Handle form submission
    if (orderForm) {
        orderForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(orderForm);
            const data = Object.fromEntries(formData);
            
            // Show success message (in real implementation, this would submit to Formspree)
            const successMsg = getTranslation('orderForm.success');
            alert(successMsg);
            
            // Reset form and close modal
            orderForm.reset();
            orderModal.classList.add('hidden');
        });
    }
}

// # Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Basic validation
            const name = contactForm.querySelector('[name="name"]').value.trim();
            const email = contactForm.querySelector('[name="email"]').value.trim();
            const message = contactForm.querySelector('[name="message"]').value.trim();
            
            if (!name || !email || !message) {
                const errorMsg = getTranslation('contact.form.error');
                if (formMessage) {
                    formMessage.textContent = errorMsg;
                    formMessage.className = 'mt-4 text-red-600';
                    formMessage.classList.remove('hidden');
                }
                return;
            }
            
            // In real implementation, this would submit to Formspree
            // For now, show success message
            const successMsg = getTranslation('contact.form.success');
            if (formMessage) {
                formMessage.textContent = successMsg;
                formMessage.className = 'mt-4 text-green-600';
                formMessage.classList.remove('hidden');
            }
            
            // Reset form
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                if (formMessage) {
                    formMessage.classList.add('hidden');
                }
            }, 5000);
        });
    }
}

// # Navbar scroll effect (add shadow on scroll)
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('shadow-lg');
        }
        
        lastScroll = currentScroll;
    });
}

// # Language switcher event listeners
function initLanguageSwitchers() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const lang = btn.getAttribute('data-lang');
            if (lang) {
                await switchLanguage(lang);
            }
        });
    });
}

// # Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded, initializing...');
    
    // Initialize language system FIRST
    await initLanguage();
    
    // Initialize all features
    initSmoothScroll();
    initMobileMenu();
    initFAQ();
    initOrderModal();
    initContactForm();
    initNavbarScroll();
    initLanguageSwitchers();
    
    console.log('✓ Elishay Fitness website initialized successfully!');
    
    // Verify translations are working
    if (translationsLoaded) {
        console.log('✓ Translations system ready');
    } else {
        console.error('✗ Translations system failed to initialize');
    }
});
