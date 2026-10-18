// ============================================
// DIVINA MAISON - Main JavaScript
// ============================================

// Global state
let currentLang = localStorage.getItem('language') || 'en';
let translations = {};
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    loadTranslations();
    initializeNavigation();
    initializeCart();
    initializeQuiz();
    initializeFAQ();
    initializeNewsletter();
    initializeSearch();
    initializeSmoothScroll();
    initializeAnimations();
});

// ============================================
// Theme Toggle
// ============================================

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

// ============================================
// Internationalization (i18n)
// ============================================

async function loadTranslations() {
    try {
        const response = await fetch(`locales/${currentLang}.json`);
        translations = await response.json();
        applyTranslations();
        updateLanguageAttributes();
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

function applyTranslations() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let value = translations;
        
        for (const k of keys) {
            value = value?.[k];
        }
        
        if (value) {
            element.textContent = value;
        }
    });
    
    // Update placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const keys = key.split('.');
        let value = translations;
        
        for (const k of keys) {
            value = value?.[k];
        }
        
        if (value) {
            element.placeholder = value;
        }
    });
    
    // Update meta tags
    if (translations.meta) {
        document.title = translations.meta.title;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = translations.meta.description;
        }
    }
}

function updateLanguageAttributes() {
    const html = document.documentElement;
    html.lang = currentLang;
    html.dir = currentLang === 'he' ? 'rtl' : 'ltr';
    
    // Font families are handled by CSS variables
}

// Language toggle
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        if (lang !== currentLang) {
            currentLang = lang;
            localStorage.setItem('language', lang);
            
            // Update active state
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Reload translations
            loadTranslations();
        }
    });
});

// Set initial active language button
document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === currentLang) {
        btn.classList.add('active');
    }
});

// ============================================
// Navigation
// ============================================

function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
    
    // Dropdown menu for mobile
    document.querySelectorAll('.dropdown > a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                link.parentElement.classList.toggle('active');
            }
        });
    });
}

// ============================================
// Smooth Scroll
// ============================================

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ============================================
// Shopping Cart
// ============================================

function initializeCart() {
    const cartBtn = document.getElementById('cartBtn');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartClose = document.getElementById('cartClose');
    const cartOverlay = document.getElementById('cartOverlay');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    // Open cart
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            cartDrawer.classList.add('active');
            cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close cart
    function closeCart() {
        cartDrawer.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (cartClose) {
        cartClose.addEventListener('click', closeCart);
    }
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }
    
    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                window.location.href = '#contact';
                closeCart();
            }
        });
    }
    
    // Add to cart buttons
    document.querySelectorAll('.product-card .btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productCard = btn.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            const productImage = productCard.querySelector('.product-image img').src;
            
            addToCart({
                name: productName,
                price: productPrice,
                image: productImage
            });
        });
    });
    
    updateCartDisplay();
}

function addToCart(product) {
    const existingItem = cart.find(item => item.name === product.name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartDisplay();
    
    // Show notification
    showNotification('Product added to cart');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartDisplay();
}

function updateCartQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        removeFromCart(index);
    } else {
        saveCart();
        updateCartDisplay();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const cartContent = document.getElementById('cartContent');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTotal = document.getElementById('cartTotal');
    const cartShipping = document.getElementById('cartShipping');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    
    // Update cart content
    if (cartContent) {
        if (cart.length === 0) {
            cartContent.innerHTML = `<p class="cart-empty" data-i18n="cart.empty">Your cart is empty</p>`;
            applyTranslations();
        } else {
            cartContent.innerHTML = cart.map((item, index) => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${item.price}</div>
                        <div class="cart-item-actions">
                            <div class="cart-item-quantity">
                                <button onclick="updateCartQuantity(${index}, -1)">−</button>
                                <span>${item.quantity}</span>
                                <button onclick="updateCartQuantity(${index}, 1)">+</button>
                            </div>
                            <button class="cart-item-remove" onclick="removeFromCart(${index})" data-i18n="cart.remove">Remove</button>
                        </div>
                    </div>
                </div>
            `).join('');
            applyTranslations();
        }
    }
    
    // Update totals
    const subtotal = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
        return sum + (price * item.quantity);
    }, 0);
    
    if (cartSubtotal) {
        cartSubtotal.textContent = `₪ ${subtotal.toFixed(0)}`;
    }
    
    const shipping = subtotal >= 500 ? 0 : 50;
    if (cartShipping) {
        cartShipping.textContent = shipping === 0 ? translations.cart?.freeShipping || 'Free' : `₪ ${shipping}`;
    }
    
    const total = subtotal + shipping;
    if (cartTotal) {
        cartTotal.textContent = `₪ ${total.toFixed(0)}`;
    }
}

// Make functions globally available for inline onclick handlers
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;

// ============================================
// Premium Quiz Experience
// ============================================

function initializeQuiz() {
    const startShortQuiz = document.getElementById('startShortQuiz');
    const startInDepthQuiz = document.getElementById('startInDepthQuiz');
    const quizModal = document.getElementById('quizModal');
    const quizClose = document.getElementById('quizClose');
    const quizContainer = document.getElementById('quizContainer');
    
    let currentQuizType = null;
    let currentQuestionIndex = 0;
    let quizAnswers = [];
    let quizQuestions = [];
    let selectedAnswer = null;
    
    function startQuiz(quizType) {
        currentQuizType = quizType;
        currentQuestionIndex = 0;
        quizAnswers = [];
        selectedAnswer = null;
        
        // Get questions from translations
        const quizData = translations.quiz?.[quizType];
        if (!quizData) return;
        
        // Convert to array format, maintaining order
        // For short quiz, ensure order: q1, q2, q3, q5, q4
        const keys = Object.keys(quizData);
        if (quizType === 'short') {
            // Reorder: q1, q2, q3, q5, q4
            const orderedKeys = ['q1', 'q2', 'q3', 'q5', 'q4'].filter(k => keys.includes(k));
            quizQuestions = orderedKeys.map(key => ({
                key: key,
                question: quizData[key].question,
                answers: quizData[key].answers
            }));
        } else {
            quizQuestions = keys.map(key => ({
                key: key,
                question: quizData[key].question,
                answers: quizData[key].answers
            }));
        }
        
        renderQuestion();
    }
    
    function renderQuestion() {
        if (currentQuestionIndex >= quizQuestions.length) {
            showResult();
            return;
        }
        
        const question = quizQuestions[currentQuestionIndex];
        const progress = translations.quiz?.progress
            .replace('{current}', currentQuestionIndex + 1)
            .replace('{total}', quizQuestions.length) || `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
        
        // Check if we have a previous answer for this question
        const previousAnswer = quizAnswers[currentQuestionIndex] || null;
        selectedAnswer = previousAnswer;
        
        const questionHTML = `
            <div class="quiz-screen active">
                <div class="quiz-progress">${progress}</div>
                <h2 class="quiz-question-title">${question.question}</h2>
                <div class="quiz-answers-grid">
                    ${question.answers.map((answer, index) => {
                        const isSelected = selectedAnswer === answer.value;
                        return `
                        <button class="quiz-answer-card ${isSelected ? 'selected' : ''}" data-value="${answer.value}" data-index="${index}">
                            <span class="quiz-answer-text">${answer.text}</span>
                        </button>
                    `;
                    }).join('')}
                </div>
                <div class="quiz-nav-buttons">
                    ${currentQuestionIndex > 0 ? `
                        <button class="quiz-nav-btn quiz-back-btn" id="quizBackBtn">
                            ${translations.quiz?.back || 'Back'}
                        </button>
                    ` : '<div></div>'}
                    <button class="quiz-nav-btn quiz-continue-btn" id="quizContinueBtn" ${!selectedAnswer ? 'disabled' : ''}>
                        ${translations.quiz?.continue || translations.quiz?.next || 'Continue'}
                    </button>
                </div>
            </div>
        `;
        
        quizContainer.innerHTML = questionHTML;
        
        // Add fade-in animation
        setTimeout(() => {
            const screen = quizContainer.querySelector('.quiz-screen');
            if (screen) screen.classList.add('fade-in');
        }, 10);
        
        // Answer selection
        quizContainer.querySelectorAll('.quiz-answer-card').forEach(card => {
            card.addEventListener('click', () => {
                // Remove previous selection
                quizContainer.querySelectorAll('.quiz-answer-card').forEach(c => c.classList.remove('selected'));
                
                // Select this card
                card.classList.add('selected');
                selectedAnswer = card.getAttribute('data-value');
                
                // Enable continue button
                const continueBtn = document.getElementById('quizContinueBtn');
                if (continueBtn) {
                    continueBtn.disabled = false;
                    continueBtn.classList.add('enabled');
                }
            });
        });
        
        // Continue button
        const continueBtn = document.getElementById('quizContinueBtn');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                if (!selectedAnswer) return;
                
                // Store answer
                if (quizAnswers[currentQuestionIndex] !== undefined) {
                    quizAnswers[currentQuestionIndex] = selectedAnswer;
                } else {
                    quizAnswers.push(selectedAnswer);
                }
                
                currentQuestionIndex++;
                selectedAnswer = null;
                
                // Fade out current screen
                const currentScreen = quizContainer.querySelector('.quiz-screen');
                currentScreen.classList.remove('active');
                currentScreen.classList.add('fade-out');
                
                // Render next question after transition
                setTimeout(() => {
                    renderQuestion();
                }, 500);
            });
        }
        
        // Back button
        const backBtn = document.getElementById('quizBackBtn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                currentQuestionIndex--;
                selectedAnswer = quizAnswers[currentQuestionIndex] || null;
                const currentScreen = quizContainer.querySelector('.quiz-screen');
                currentScreen.classList.remove('active');
                currentScreen.classList.add('fade-out');
                setTimeout(() => {
                    renderQuestion();
                }, 500);
            });
        }
    }
    
    function showResult() {
        const recommendation = calculateRecommendation(quizAnswers);
        const product = translations.products?.[recommendation];
        const resultData = translations.quiz?.results?.[recommendation];
        
        const resultHTML = `
            <div class="quiz-result-screen active">
                <div class="quiz-result-header">
                    <h2 class="quiz-result-title">${translations.quiz?.result || 'Your Perfect Match'}</h2>
                    <p class="quiz-result-subtitle">${translations.quiz?.resultSubtitle || 'We\'ve found the fragrance that speaks to your essence'}</p>
                </div>
                <div class="quiz-result-content">
                    <div class="quiz-result-product-card">
                        <h3 class="quiz-result-product-name">${product?.name || recommendation}</h3>
                        <p class="quiz-result-product-type">${product?.type || ''}</p>
                        <div class="quiz-result-explanation">
                            <h4>${translations.quiz?.whyThisFits || 'Why this fits you'}</h4>
                            <p>${resultData?.explanation || product?.description || ''}</p>
                        </div>
                        <div class="quiz-result-actions">
                            <a href="product.html?product=${recommendation}" class="btn btn-primary" onclick="sessionStorage.setItem('fromQuiz', 'true');">
                                ${translations.quiz?.viewFragrance || 'View Fragrance'}
                            </a>
                            <a href="#quiz" class="btn btn-secondary" onclick="document.getElementById('quizModal').classList.remove('active'); document.body.style.overflow = '';">
                                ${translations.quiz?.customizeScent || 'Customize This Scent'}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        quizContainer.innerHTML = resultHTML;
        
        setTimeout(() => {
            const screen = quizContainer.querySelector('.quiz-result-screen');
            if (screen) screen.classList.add('fade-in');
        }, 10);
        
        // Apply translations to result page
        applyTranslations();
    }
    
    function calculateRecommendation(answers) {
        // Smart recommendation logic mapping answers to scent families, intensity, and personality
        const scores = {
            amberFrost: 0,
            northernIron: 0,
            deepEmber: 0,
            velvetSnow: 0,
            crimsonNight: 0,
            oudMirage: 0
        };
        
        // Map answers to fragrance scores based on scent family, intensity, and personality
        answers.forEach(answer => {
            switch(answer) {
                // Warm & Intimate → Amber Frost, Velvet Snow
                case 'intimate':
                case 'soft':
                case 'warm':
                case 'warmSweet':
                case 'subtle':
                case 'warmBase':
                case 'warmEnveloping':
                case 'veryIntimate':
                    scores.amberFrost += 3;
                    scores.velvetSnow += 2;
                    break;
                
                // Bold & Powerful → Northern Iron, Deep Ember
                case 'bold':
                case 'strong':
                case 'spicySmoky':
                case 'darkSmoky':
                case 'confident':
                case 'strongTrail':
                    scores.northernIron += 3;
                    scores.deepEmber += 2;
                    break;
                
                // Elegant & Sophisticated → Amber Frost, Oud Mirage
                case 'elegant':
                case 'elegantIntriguing':
                case 'balanced':
                case 'evolving':
                    scores.amberFrost += 2;
                    scores.oudMirage += 2;
                    scores.deepEmber += 1;
                    break;
                
                // Mysterious & Sensual → Crimson Night, Oud Mirage
                case 'mysterious':
                case 'sensual':
                case 'seductive':
                case 'intense':
                    scores.crimsonNight += 3;
                    scores.oudMirage += 2;
                    break;
                
                // Fresh & Clean → Velvet Snow
                case 'fresh':
                case 'cleanFresh':
                case 'cleanAiry':
                case 'floralSoft':
                    scores.velvetSnow += 3;
                    scores.amberFrost += 1;
                    break;
                
                // Woody & Winter → Northern Iron, Deep Ember, Oud Mirage
                case 'winter':
                case 'special':
                case 'woodyDry':
                case 'woodyResinous':
                    scores.northernIron += 2;
                    scores.deepEmber += 2;
                    scores.oudMirage += 2;
                    break;
                
                // Daily/Evening → Versatile fragrances
                case 'daily':
                case 'evening':
                    scores.amberFrost += 1;
                    scores.velvetSnow += 1;
                    scores.oudMirage += 1;
                    break;
                
                // Calm & Romantic → Velvet Snow, Amber Frost
                case 'calm':
                case 'romantic':
                    scores.velvetSnow += 3;
                    scores.amberFrost += 2;
                    break;
                
                // Stable vs Evolving
                case 'stable':
                    scores.amberFrost += 1;
                    scores.velvetSnow += 1;
                    break;
                case 'evolving':
                    scores.deepEmber += 2;
                    scores.oudMirage += 1;
                    break;
            }
        });
        
        // Find highest score
        let maxScore = 0;
        let recommended = 'amberFrost';
        
        Object.keys(scores).forEach(fragrance => {
            if (scores[fragrance] > maxScore) {
                maxScore = scores[fragrance];
                recommended = fragrance;
            }
        });
        
        return recommended;
    }
    
    if (startShortQuiz) {
        startShortQuiz.addEventListener('click', () => {
            quizModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            startQuiz('short');
        });
    }
    
    if (startInDepthQuiz) {
        startInDepthQuiz.addEventListener('click', () => {
            quizModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            startQuiz('long');
        });
    }
    
    if (quizClose) {
        quizClose.addEventListener('click', () => {
            quizModal.classList.remove('active');
            document.body.style.overflow = '';
            quizContainer.innerHTML = '';
        });
    }
    
    // Close on overlay click
    if (quizModal) {
        quizModal.addEventListener('click', (e) => {
            if (e.target === quizModal) {
                quizModal.classList.remove('active');
                document.body.style.overflow = '';
                quizContainer.innerHTML = '';
            }
        });
    }
}

// ============================================
// FAQ Accordion
// ============================================

function initializeFAQ() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// ============================================
// Newsletter Popup
// ============================================

function initializeNewsletter() {
    const newsletterPopup = document.getElementById('newsletterPopup');
    const newsletterClose = document.getElementById('newsletterClose');
    const newsletterForm = document.getElementById('newsletterForm');
    
    // Show newsletter popup after 3 seconds (only once per session)
    if (!sessionStorage.getItem('newsletterShown')) {
        setTimeout(() => {
            if (newsletterPopup) {
                newsletterPopup.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }, 3000);
        sessionStorage.setItem('newsletterShown', 'true');
    }
    
    if (newsletterClose) {
        newsletterClose.addEventListener('click', () => {
            newsletterPopup.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Form will be submitted to Formspree
            showNotification('Thank you for subscribing!');
            newsletterPopup.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close on overlay click
    if (newsletterPopup) {
        newsletterPopup.addEventListener('click', (e) => {
            if (e.target === newsletterPopup) {
                newsletterPopup.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// ============================================
// Search
// ============================================

function initializeSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            searchInput.focus();
        });
    }
    
    if (searchClose) {
        searchClose.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
        });
    }
    
    if (searchOverlay) {
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                searchOverlay.classList.remove('active');
            }
        });
    }
    
    // Search functionality (basic)
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.toLowerCase();
                // Simple search - scroll to products section
                window.location.href = '#collections';
                searchOverlay.classList.remove('active');
            }
        });
    }
}

// ============================================
// Animations
// ============================================

function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Observe product cards
    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });
}

// ============================================
// Utility Functions
// ============================================

function showNotification(message) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: var(--color-gold);
        color: var(--color-black);
        padding: 1rem 2rem;
        border-radius: 4px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

