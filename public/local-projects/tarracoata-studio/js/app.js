// TarraCoata Studio - Main JavaScript
// Modular, commented code for all interactive functionality

// ============================================
// Mobile Menu Toggle
// ============================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        // Toggle hamburger icon (optional enhancement)
        const isOpen = !mobileMenu.classList.contains('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });
    
    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });
}

// ============================================
// Smooth Scrolling
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Active Navigation Highlighting
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('text-gold');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('text-gold');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav(); // Initial call

// ============================================
// FAQ Accordion
// ============================================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.closest('.faq-item');
        const isExpanded = question.getAttribute('aria-expanded') === 'true';
        
        // Close all other FAQ items
        faqQuestions.forEach(q => {
            if (q !== question) {
                q.setAttribute('aria-expanded', 'false');
                q.closest('.faq-item').classList.remove('active');
            }
        });
        
        // Toggle current item
        if (isExpanded) {
            question.setAttribute('aria-expanded', 'false');
            faqItem.classList.remove('active');
        } else {
            question.setAttribute('aria-expanded', 'true');
            faqItem.classList.add('active');
        }
    });
    
    // Keyboard accessibility
    question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
        }
    });
});

// ============================================
// Portfolio Modal
// ============================================
const portfolioCards = document.querySelectorAll('.portfolio-card');
const portfolioModal = document.getElementById('portfolio-modal');
const modalClose = document.querySelector('.portfolio-modal-close');
const modalBody = document.getElementById('modal-body');

// Portfolio project data is now loaded from translation files
// No need for hardcoded data - all translations are in locales/*.json

// Open modal on portfolio card click
portfolioCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        
        if (portfolioModal && modalBody && window.i18n) {
            const project = window.i18n.translations[window.i18n.currentLang]?.portfolio?.projects?.[projectId];
            
            if (project) {
                modalBody.innerHTML = `
                    <div class="mb-4">
                        <span class="portfolio-category">${project.category}</span>
                        <h2 class="text-3xl font-bold font-montserrat mt-4 mb-6">${project.title}</h2>
                    </div>
                    <div class="space-y-6">
                        <div>
                            <h3 class="text-xl font-bold font-montserrat mb-2 text-gold">${window.i18n.t('portfolio.modal.challenge')}</h3>
                            <p class="text-gray-300">${project.challenge}</p>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold font-montserrat mb-2 text-gold">${window.i18n.t('portfolio.modal.solution')}</h3>
                            <p class="text-gray-300">${project.solution}</p>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold font-montserrat mb-2 text-gold">${window.i18n.t('portfolio.modal.outcome')}</h3>
                            <p class="text-gray-300">${project.outcome}</p>
                        </div>
                    </div>
                `;
                portfolioModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        }
    });
});

// Close modal
if (modalClose) {
    modalClose.addEventListener('click', () => {
        if (portfolioModal) {
            portfolioModal.classList.add('hidden');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
}

// Close modal on overlay click
if (portfolioModal) {
    const overlay = portfolioModal.querySelector('.portfolio-modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', () => {
            portfolioModal.classList.add('hidden');
            document.body.style.overflow = '';
        });
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !portfolioModal.classList.contains('hidden')) {
            portfolioModal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// Form Validation & Submission
// ============================================
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Client-side validation
        if (!name || !email || !message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Submit to Formspree
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showFormMessage('Thank you! Your message has been sent. We\'ll respond within 24 hours.', 'success');
                contactForm.reset();
            } else {
                const data = await response.json();
                if (data.errors) {
                    showFormMessage(data.errors.map(error => error.message).join(', '), 'error');
                } else {
                    showFormMessage('Something went wrong. Please try again later.', 'error');
                }
            }
        } catch (error) {
            showFormMessage('Network error. Please check your connection and try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Show form message
function showFormMessage(message, type) {
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.classList.remove('hidden');
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-hide after 5 seconds for success messages
        if (type === 'success') {
            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 5000);
        }
    }
}

// ============================================
// Scroll Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .process-step, .portfolio-card, .pricing-card, .trust-card');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// ============================================
// Navbar Scroll Effect
// ============================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }
});

// ============================================
// Initialize on DOM Load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // All initialization is handled above
    // Language system initializes automatically via i18n.js
});

