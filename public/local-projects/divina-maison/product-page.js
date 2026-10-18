// ============================================
// Product Page Logic
// ============================================

// Product slug to key mapping
const productSlugMap = {
    'amber-frost': 'amberFrost',
    'northern-iron': 'northernIron',
    'deep-ember': 'deepEmber',
    'velvet-snow': 'velvetSnow',
    'crimson-night': 'crimsonNight',
    'oud-mirage': 'oudMirage'
};

// Product images mapping
const productImages = {
    'amberFrost': 'https://images.unsplash.com/photo-1595425970377-c97073c6fd0b?w=1200&q=80',
    'northernIron': 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=1200&q=80',
    'deepEmber': 'https://images.unsplash.com/photo-1612817159949-195b6eb9e1af?w=1200&q=80',
    'velvetSnow': 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=1200&q=80',
    'crimsonNight': 'https://images.unsplash.com/photo-1612817159949-195b6eb9e1af?w=1200&q=80',
    'oudMirage': 'https://images.unsplash.com/photo-1595425970377-c97073c6fd0b?w=1200&q=80'
};

let currentProduct = null;
let translations = null;

// Initialize product page
document.addEventListener('DOMContentLoaded', async () => {
    // Load translations first
    const currentLang = localStorage.getItem('language') || 'en';
    const response = await fetch(`locales/${currentLang}.json`);
    translations = await response.json();
    
    // Get product from URL
    let productKey = null;
    
    // Try query parameter first (for backward compatibility)
    const urlParams = new URLSearchParams(window.location.search);
    const queryProduct = urlParams.get('product');
    if (queryProduct) {
        productKey = queryProduct;
    } else {
        // Try to get from path (slug-based routing)
        const path = window.location.pathname;
        const slug = path.split('/').pop().replace('.html', '').replace('product', '');
        if (slug) {
            productKey = productSlugMap[slug] || Object.keys(productSlugMap).find(key => 
                translations.products?.[productSlugMap[key]]?.slug === slug
            ) ? productSlugMap[slug] : null;
        }
    }
    
    if (productKey && translations.products?.[productKey]) {
        currentProduct = translations.products[productKey];
        currentProduct.key = productKey;
        renderProductPage();
    } else {
        // Redirect to home if product not found
        window.location.href = 'index.html';
    }
});

function renderProductPage() {
    const product = currentProduct;
    const isFromQuiz = sessionStorage.getItem('fromQuiz') === 'true';
    
    const pageContent = `
        <!-- Breadcrumb Navigation -->
        <section style="padding-top: 120px; padding-bottom: var(--spacing-sm); background-color: var(--color-secondary);">
            <div class="container">
                <nav style="display: flex; align-items: center; gap: var(--spacing-xs); font-size: 0.9rem;">
                    <a href="index.html" style="color: var(--product-text-primary); text-decoration: none; opacity: 0.7;">${translations.nav?.home || 'Home'}</a>
                    <span style="color: var(--product-text-primary); opacity: 0.5;">/</span>
                    <a href="shop.html" style="color: var(--product-text-primary); text-decoration: none; opacity: 0.7;">${translations.nav?.shop || 'Shop'}</a>
                    <span style="color: var(--product-text-primary); opacity: 0.5;">/</span>
                    <span style="color: var(--product-text-primary);">${product.name}</span>
                </nav>
            </div>
        </section>

        <!-- Hero Section -->
        <section class="product-hero" style="padding-top: var(--spacing-md); padding-bottom: var(--spacing-xl); background: linear-gradient(135deg, var(--color-secondary) 0%, rgba(245, 237, 224, 0.95) 100%);">
            <div class="container">
                ${isFromQuiz ? `
                    <div class="quiz-recommendation-badge" style="text-align: center; margin-bottom: var(--spacing-md); padding: var(--spacing-sm) var(--spacing-md); background: rgba(201, 169, 97, 0.1); border: 1px solid var(--color-accent); border-radius: 4px; display: inline-block; color: var(--product-text-primary); font-size: 0.9rem;">
                        ${translations.quiz?.recommended || 'Recommended based on your fragrance profile'}
                    </div>
                ` : ''}
                <div class="product-hero-content" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-xl); align-items: center;">
                    <div class="product-hero-image" style="position: relative;">
                        <img src="${productImages[product.key]}" alt="${product.name}" style="width: 100%; height: 600px; object-fit: cover; border-radius: 8px; box-shadow: 0 20px 60px rgba(44, 24, 16, 0.15);">
                    </div>
                    <div class="product-hero-info">
                        <h1 style="font-size: 3rem; color: var(--color-text-on-white); margin-bottom: var(--spacing-sm); font-weight: 400; letter-spacing: 0.5px; text-shadow: -2.5px -2.5px 0 var(--outline-for-black-text), 2.5px -2.5px 0 var(--outline-for-black-text), -2.5px 2.5px 0 var(--outline-for-black-text), 2.5px 2.5px 0 var(--outline-for-black-text), -2px -2px 0 var(--outline-for-black-text), 2px -2px 0 var(--outline-for-black-text), -2px 2px 0 var(--outline-for-black-text), 2px 2px 0 var(--outline-for-black-text), -1px -1px 0 var(--outline-for-black-text), 1px -1px 0 var(--outline-for-black-text), -1px 1px 0 var(--outline-for-black-text), 1px 1px 0 var(--outline-for-black-text), 0 0 0 var(--outline-for-black-text); text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">${product.name}</h1>
                        <p class="product-vibe-statement" style="font-size: 1.3rem; color: var(--color-text-on-beige); font-style: italic; margin-bottom: var(--spacing-lg); line-height: 1.6; text-shadow: -2px -2px 0 var(--outline-for-gold-text), 2px -2px 0 var(--outline-for-gold-text), -2px 2px 0 var(--outline-for-gold-text), 2px 2px 0 var(--outline-for-gold-text), -1px -1px 0 var(--outline-for-gold-text), 1px -1px 0 var(--outline-for-gold-text), -1px 1px 0 var(--outline-for-gold-text), 1px 1px 0 var(--outline-for-gold-text), 0 0 0 var(--outline-for-gold-text); text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">${product.vibe}</p>
                        <div class="product-price" style="font-size: 2rem; color: var(--color-text-on-beige); margin-bottom: var(--spacing-md); font-weight: 400; text-shadow: -2.5px -2.5px 0 var(--outline-for-gold-text), 2.5px -2.5px 0 var(--outline-for-gold-text), -2.5px 2.5px 0 var(--outline-for-gold-text), 2.5px 2.5px 0 var(--outline-for-gold-text), -2px -2px 0 var(--outline-for-gold-text), 2px -2px 0 var(--outline-for-gold-text), -2px 2px 0 var(--outline-for-gold-text), 2px 2px 0 var(--outline-for-gold-text), -1px -1px 0 var(--outline-for-gold-text), 1px -1px 0 var(--outline-for-gold-text), -1px 1px 0 var(--outline-for-gold-text), 1px 1px 0 var(--outline-for-gold-text), 0 0 0 var(--outline-for-gold-text); text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">₪ 350</div>
                        <div class="product-hero-cta" style="display: flex; gap: var(--spacing-md); margin-top: var(--spacing-xl); flex-wrap: wrap;">
                            <button class="btn btn-primary" id="buyFragranceBtn" style="min-width: 200px;">
                                ${translations.shop?.buyFragrance || 'Buy This Fragrance'}
                            </button>
                            <button class="btn btn-secondary" id="customizeScentBtn" style="min-width: 200px;">
                                ${translations.quiz?.customizeScent || 'Customize This Scent'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Fragrance Identity -->
        <section class="product-identity" style="padding: var(--spacing-xl) 0; background-color: var(--color-white);">
            <div class="container">
                <div class="product-identity-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-lg); text-align: center;">
                    <div class="identity-item">
                        <h4 style="color: var(--color-accent); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: var(--spacing-xs);">${translations.shop?.genderExpression || 'Expression'}</h4>
                        <p style="color: var(--color-text-on-white); font-size: 1.1rem; text-shadow: -2px -2px 0 var(--outline-for-black-text), 2px -2px 0 var(--outline-for-black-text), -2px 2px 0 var(--outline-for-black-text), 2px 2px 0 var(--outline-for-black-text), -1px -1px 0 var(--outline-for-black-text), 1px -1px 0 var(--outline-for-black-text), -1px 1px 0 var(--outline-for-black-text), 1px 1px 0 var(--outline-for-black-text), 0 0 0 var(--outline-for-black-text); text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">${product.type}</p>
                    </div>
                    <div class="identity-item">
                        <h4 style="color: var(--color-accent); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: var(--spacing-xs);">${translations.shop?.intensity || 'Intensity'}</h4>
                        <p style="color: var(--color-text-on-white); font-size: 1.1rem; text-shadow: -2px -2px 0 var(--outline-for-black-text), 2px -2px 0 var(--outline-for-black-text), -2px 2px 0 var(--outline-for-black-text), 2px 2px 0 var(--outline-for-black-text), -1px -1px 0 var(--outline-for-black-text), 1px -1px 0 var(--outline-for-black-text), -1px 1px 0 var(--outline-for-black-text), 1px 1px 0 var(--outline-for-black-text), 0 0 0 var(--outline-for-black-text); text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">${product.intensity || 'Moderate'}</p>
                    </div>
                    <div class="identity-item">
                        <h4 style="color: var(--color-accent); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: var(--spacing-xs);">${translations.shop?.seasonalFit || 'Season'}</h4>
                        <p style="color: var(--color-text-on-white); font-size: 1.1rem; text-shadow: -2px -2px 0 var(--outline-for-black-text), 2px -2px 0 var(--outline-for-black-text), -2px 2px 0 var(--outline-for-black-text), 2px 2px 0 var(--outline-for-black-text), -1px -1px 0 var(--outline-for-black-text), 1px -1px 0 var(--outline-for-black-text), -1px 1px 0 var(--outline-for-black-text), 1px 1px 0 var(--outline-for-black-text), 0 0 0 var(--outline-for-black-text); text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">${product.seasonalFit || 'All Seasons'}</p>
                    </div>
                    <div class="identity-item">
                        <h4 style="color: var(--color-accent); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: var(--spacing-xs);">${translations.shop?.dayNight || 'Timing'}</h4>
                        <p style="color: var(--color-text-on-white); font-size: 1.1rem; text-shadow: -2px -2px 0 var(--outline-for-black-text), 2px -2px 0 var(--outline-for-black-text), -2px 2px 0 var(--outline-for-black-text), 2px 2px 0 var(--outline-for-black-text), -1px -1px 0 var(--outline-for-black-text), 1px -1px 0 var(--outline-for-black-text), -1px 1px 0 var(--outline-for-black-text), 1px 1px 0 var(--outline-for-black-text), 0 0 0 var(--outline-for-black-text); text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">${product.dayNight || 'Day & Evening'}</p>
                    </div>
                    <div class="identity-item">
                        <h4 style="color: var(--color-accent); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: var(--spacing-xs);">${translations.shop?.projection || 'Projection'}</h4>
                        <p style="color: var(--color-text-on-white); font-size: 1.1rem; text-shadow: -2px -2px 0 var(--outline-for-black-text), 2px -2px 0 var(--outline-for-black-text), -2px 2px 0 var(--outline-for-black-text), 2px 2px 0 var(--outline-for-black-text), -1px -1px 0 var(--outline-for-black-text), 1px -1px 0 var(--outline-for-black-text), -1px 1px 0 var(--outline-for-black-text), 1px 1px 0 var(--outline-for-black-text), 0 0 0 var(--outline-for-black-text); text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">${product.projection || 'Balanced'}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Scent Profile -->
        <section class="product-scent-profile" style="padding: var(--spacing-xl) 0; background-color: var(--color-secondary);">
            <div class="container">
                <h2 style="text-align: center; color: var(--color-text-on-beige); font-size: 2rem; margin-bottom: var(--spacing-xl); font-weight: 400; text-shadow: -2.5px -2.5px 0 var(--outline-for-gold-text), 2.5px -2.5px 0 var(--outline-for-gold-text), -2.5px 2.5px 0 var(--outline-for-gold-text), 2.5px 2.5px 0 var(--outline-for-gold-text), -2px -2px 0 var(--outline-for-gold-text), 2px -2px 0 var(--outline-for-gold-text), -2px 2px 0 var(--outline-for-gold-text), 2px 2px 0 var(--outline-for-gold-text), -1px -1px 0 var(--outline-for-gold-text), 1px -1px 0 var(--outline-for-gold-text), -1px 1px 0 var(--outline-for-gold-text), 1px 1px 0 var(--outline-for-gold-text), 0 0 0 var(--outline-for-gold-text); text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">${translations.shop?.scentProfile || 'Scent Profile'}</h2>
                <div class="scent-notes-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--spacing-xl); max-width: 1000px; margin: 0 auto;">
                    <div class="note-section">
                        <h3 style="color: var(--color-accent); font-size: 1.2rem; margin-bottom: var(--spacing-md); text-transform: uppercase; letter-spacing: 1px; font-weight: 500;">${translations.shop?.topNotes || 'Top Notes'}</h3>
                        <p style="color: var(--color-text-on-beige); font-size: 1.1rem; line-height: 1.8; text-shadow: -2px -2px 0 var(--outline-for-gold-text), 2px -2px 0 var(--outline-for-gold-text), -2px 2px 0 var(--outline-for-gold-text), 2px 2px 0 var(--outline-for-gold-text), -1px -1px 0 var(--outline-for-gold-text), 1px -1px 0 var(--outline-for-gold-text), -1px 1px 0 var(--outline-for-gold-text), 1px 1px 0 var(--outline-for-gold-text), 0 0 0 var(--outline-for-gold-text); text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">${product.topNotes}</p>
                    </div>
                    <div class="note-section">
                        <h3 style="color: var(--color-accent); font-size: 1.2rem; margin-bottom: var(--spacing-md); text-transform: uppercase; letter-spacing: 1px; font-weight: 500;">${translations.shop?.middleNotes || 'Heart Notes'}</h3>
                        <p style="color: var(--color-text-on-beige); font-size: 1.1rem; line-height: 1.8; text-shadow: -2px -2px 0 var(--outline-for-gold-text), 2px -2px 0 var(--outline-for-gold-text), -2px 2px 0 var(--outline-for-gold-text), 2px 2px 0 var(--outline-for-gold-text), -1px -1px 0 var(--outline-for-gold-text), 1px -1px 0 var(--outline-for-gold-text), -1px 1px 0 var(--outline-for-gold-text), 1px 1px 0 var(--outline-for-gold-text), 0 0 0 var(--outline-for-gold-text); text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">${product.middleNotes}</p>
                    </div>
                    <div class="note-section">
                        <h3 style="color: var(--color-accent); font-size: 1.2rem; margin-bottom: var(--spacing-md); text-transform: uppercase; letter-spacing: 1px; font-weight: 500;">${translations.shop?.baseNotes || 'Base Notes'}</h3>
                        <p style="color: var(--color-text-on-beige); font-size: 1.1rem; line-height: 1.8; text-shadow: -2px -2px 0 var(--outline-for-gold-text), 2px -2px 0 var(--outline-for-gold-text), -2px 2px 0 var(--outline-for-gold-text), 2px 2px 0 var(--outline-for-gold-text), -1px -1px 0 var(--outline-for-gold-text), 1px -1px 0 var(--outline-for-gold-text), -1px 1px 0 var(--outline-for-gold-text), 1px 1px 0 var(--outline-for-gold-text), 0 0 0 var(--outline-for-gold-text); text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">${product.baseNotes}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Emotional Description -->
        <section class="product-emotional" style="padding: var(--spacing-xl) 0; background-color: var(--product-bg);">
            <div class="container" style="max-width: 800px;">
                <div class="emotional-description" style="padding: var(--spacing-xl); background-color: var(--color-secondary); border-left: 4px solid var(--color-accent); border-radius: 6px;">
                    <h3 style="color: var(--color-text-on-white); font-size: 1.5rem; margin-bottom: var(--spacing-md); font-weight: 400; text-shadow: -2px -2px 0 var(--outline-for-black-text), 2px -2px 0 var(--outline-for-black-text), -2px 2px 0 var(--outline-for-black-text), 2px 2px 0 var(--outline-for-black-text), -1px -1px 0 var(--outline-for-black-text), 1px -1px 0 var(--outline-for-black-text), -1px 1px 0 var(--outline-for-black-text), 1px 1px 0 var(--outline-for-black-text), 0 0 0 var(--outline-for-black-text); text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">${translations.quiz?.whyThisFits || 'Why This Fragrance'}</h3>
                    <p style="color: var(--color-text-on-white); font-size: 1.15rem; line-height: 1.9; font-style: italic; font-weight: 300; text-shadow: -2px -2px 0 var(--outline-for-black-text), 2px -2px 0 var(--outline-for-black-text), -2px 2px 0 var(--outline-for-black-text), 2px 2px 0 var(--outline-for-black-text), -1px -1px 0 var(--outline-for-black-text), 1px -1px 0 var(--outline-for-black-text), -1px 1px 0 var(--outline-for-black-text), 1px 1px 0 var(--outline-for-black-text), 0 0 0 var(--outline-for-black-text); text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">${product.emotionalDescription || product.description}</p>
                </div>
            </div>
        </section>

        <!-- Oil vs Alcohol Recommendation -->
        <section class="product-format" style="padding: var(--spacing-xl) 0; background-color: var(--color-secondary);">
            <div class="container" style="max-width: 700px;">
                <h2 style="text-align: center; color: var(--color-text-on-beige); font-size: 2rem; margin-bottom: var(--spacing-lg); font-weight: 400; text-shadow: -2.5px -2.5px 0 var(--outline-for-gold-text), 2.5px -2.5px 0 var(--outline-for-gold-text), -2.5px 2.5px 0 var(--outline-for-gold-text), 2.5px 2.5px 0 var(--outline-for-gold-text), -2px -2px 0 var(--outline-for-gold-text), 2px -2px 0 var(--outline-for-gold-text), -2px 2px 0 var(--outline-for-gold-text), 2px 2px 0 var(--outline-for-gold-text), -1px -1px 0 var(--outline-for-gold-text), 1px -1px 0 var(--outline-for-gold-text), -1px 1px 0 var(--outline-for-gold-text), 1px 1px 0 var(--outline-for-gold-text), 0 0 0 var(--outline-for-gold-text); text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">${translations.shop?.formatRecommendation || 'Format Recommendation'}</h2>
                <div class="format-recommendation" style="text-align: center; padding: var(--spacing-lg); background-color: var(--product-bg); border: 2px solid var(--color-accent); border-radius: 8px;">
                    <p style="color: var(--color-text-on-white); font-size: 1.1rem; line-height: 1.8; text-shadow: -2px -2px 0 var(--outline-for-black-text), 2px -2px 0 var(--outline-for-black-text), -2px 2px 0 var(--outline-for-black-text), 2px 2px 0 var(--outline-for-black-text), -1px -1px 0 var(--outline-for-black-text), 1px -1px 0 var(--outline-for-black-text), -1px 1px 0 var(--outline-for-black-text), 1px 1px 0 var(--outline-for-black-text), 0 0 0 var(--outline-for-black-text); text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">${product.oilRecommendation || 'Available in both oil and alcohol-based formats'}</p>
                </div>
            </div>
        </section>

        <!-- How & When to Wear -->
        <section class="product-wearing" style="padding: var(--spacing-xl) 0; background-color: var(--product-bg);">
            <div class="container" style="max-width: 800px;">
                <h2 style="text-align: center; color: var(--color-text-on-beige); font-size: 2rem; margin-bottom: var(--spacing-lg); font-weight: 400; text-shadow: -2.5px -2.5px 0 var(--outline-for-gold-text), 2.5px -2.5px 0 var(--outline-for-gold-text), -2.5px 2.5px 0 var(--outline-for-gold-text), 2.5px 2.5px 0 var(--outline-for-gold-text), -2px -2px 0 var(--outline-for-gold-text), 2px -2px 0 var(--outline-for-gold-text), -2px 2px 0 var(--outline-for-gold-text), 2px 2px 0 var(--outline-for-gold-text), -1px -1px 0 var(--outline-for-gold-text), 1px -1px 0 var(--outline-for-gold-text), -1px 1px 0 var(--outline-for-gold-text), 1px 1px 0 var(--outline-for-gold-text), 0 0 0 var(--outline-for-gold-text); text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">${translations.shop?.howToWear || 'How & When to Wear'}</h2>
                <div class="wearing-guide" style="padding: var(--spacing-lg); background-color: var(--color-secondary); border-radius: 6px;">
                    <p style="color: var(--color-text-on-beige); font-size: 1.1rem; line-height: 1.9; text-shadow: -2px -2px 0 var(--outline-for-gold-text), 2px -2px 0 var(--outline-for-gold-text), -2px 2px 0 var(--outline-for-gold-text), 2px 2px 0 var(--outline-for-gold-text), -1px -1px 0 var(--outline-for-gold-text), 1px -1px 0 var(--outline-for-gold-text), -1px 1px 0 var(--outline-for-gold-text), 1px 1px 0 var(--outline-for-gold-text), 0 0 0 var(--outline-for-gold-text); text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">${product.howToWear || 'Apply to pulse points for optimal projection. Best worn during the day and evening.'}</p>
                </div>
            </div>
        </section>

        <!-- Fragrance Tips -->
        <section class="product-tips" style="padding: var(--spacing-xl) 0; background-color: var(--color-secondary);">
            <div class="container" style="max-width: 900px;">
                <h2 style="text-align: center; color: var(--color-text-on-beige); font-size: 2rem; margin-bottom: var(--spacing-xl); font-weight: 400; text-shadow: -2.5px -2.5px 0 var(--outline-for-gold-text), 2.5px -2.5px 0 var(--outline-for-gold-text), -2.5px 2.5px 0 var(--outline-for-gold-text), 2.5px 2.5px 0 var(--outline-for-gold-text), -2px -2px 0 var(--outline-for-gold-text), 2px -2px 0 var(--outline-for-gold-text), -2px 2px 0 var(--outline-for-gold-text), 2px 2px 0 var(--outline-for-gold-text), -1px -1px 0 var(--outline-for-gold-text), 1px -1px 0 var(--outline-for-gold-text), -1px 1px 0 var(--outline-for-gold-text), 1px 1px 0 var(--outline-for-gold-text), 0 0 0 var(--outline-for-gold-text); text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">${translations.tips?.title || 'Fragrance Tips'}</h2>
                <div class="tips-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--spacing-lg);">
                    <div class="tip-card" style="padding: var(--spacing-lg); background-color: var(--product-bg); border: 1px solid var(--color-accent); border-radius: 6px;">
                        <p style="color: var(--color-text-on-white); line-height: 1.8; text-shadow: -2px -2px 0 var(--outline-for-black-text), 2px -2px 0 var(--outline-for-black-text), -2px 2px 0 var(--outline-for-black-text), 2px 2px 0 var(--outline-for-black-text), -1px -1px 0 var(--outline-for-black-text), 1px -1px 0 var(--outline-for-black-text), -1px 1px 0 var(--outline-for-black-text), 1px 1px 0 var(--outline-for-black-text), 0 0 0 var(--outline-for-black-text); text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">${translations.tips?.tip1 || 'Store perfumes away from light and heat for longevity.'}</p>
                    </div>
                    <div class="tip-card" style="padding: var(--spacing-lg); background-color: var(--product-bg); border: 1px solid var(--color-accent); border-radius: 6px;">
                        <p style="color: var(--color-text-on-white); line-height: 1.8; text-shadow: -2px -2px 0 var(--outline-for-black-text), 2px -2px 0 var(--outline-for-black-text), -2px 2px 0 var(--outline-for-black-text), 2px 2px 0 var(--outline-for-black-text), -1px -1px 0 var(--outline-for-black-text), 1px -1px 0 var(--outline-for-black-text), -1px 1px 0 var(--outline-for-black-text), 1px 1px 0 var(--outline-for-black-text), 0 0 0 var(--outline-for-black-text); text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">${translations.tips?.tip2 || 'Apply to pulse points for the best projection.'}</p>
                    </div>
                    <div class="tip-card" style="padding: var(--spacing-lg); background-color: var(--product-bg); border: 1px solid var(--color-accent); border-radius: 6px;">
                        <p style="color: var(--color-text-on-white); line-height: 1.8; text-shadow: -2px -2px 0 var(--outline-for-black-text), 2px -2px 0 var(--outline-for-black-text), -2px 2px 0 var(--outline-for-black-text), 2px 2px 0 var(--outline-for-black-text), -1px -1px 0 var(--outline-for-black-text), 1px -1px 0 var(--outline-for-black-text), -1px 1px 0 var(--outline-for-black-text), 1px 1px 0 var(--outline-for-black-text), 0 0 0 var(--outline-for-black-text); text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">${translations.tips?.tip3 || 'Layer scents by using matching body products.'}</p>
                    </div>
                    <div class="tip-card" style="padding: var(--spacing-lg); background-color: var(--product-bg); border: 1px solid var(--color-accent); border-radius: 6px;">
                        <p style="color: var(--color-text-on-white); line-height: 1.8; text-shadow: -2px -2px 0 var(--outline-for-black-text), 2px -2px 0 var(--outline-for-black-text), -2px 2px 0 var(--outline-for-black-text), 2px 2px 0 var(--outline-for-black-text), -1px -1px 0 var(--outline-for-black-text), 1px -1px 0 var(--outline-for-black-text), -1px 1px 0 var(--outline-for-black-text), 1px 1px 0 var(--outline-for-black-text), 0 0 0 var(--outline-for-black-text); text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">${translations.tips?.tip4 || 'Let the fragrance develop on your skin for 30 minutes before judging.'}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Conversion Area -->
        <section class="product-conversion" style="padding: var(--spacing-xl) 0; background: linear-gradient(135deg, var(--color-secondary) 0%, rgba(245, 237, 224, 0.95) 100%);">
            <div class="container" style="max-width: 700px;">
                <div class="conversion-content" style="text-align: center; padding: var(--spacing-xl); background-color: var(--product-bg); border: 2px solid var(--color-accent); border-radius: 8px; box-shadow: 0 15px 50px rgba(44, 24, 16, 0.1);">
                    <h2 style="color: var(--color-text-on-white); font-size: 2rem; margin-bottom: var(--spacing-lg); font-weight: 400; text-shadow: -2.5px -2.5px 0 var(--outline-for-black-text), 2.5px -2.5px 0 var(--outline-for-black-text), -2.5px 2.5px 0 var(--outline-for-black-text), 2.5px 2.5px 0 var(--outline-for-black-text), -2px -2px 0 var(--outline-for-black-text), 2px -2px 0 var(--outline-for-black-text), -2px 2px 0 var(--outline-for-black-text), 2px 2px 0 var(--outline-for-black-text), -1px -1px 0 var(--outline-for-black-text), 1px -1px 0 var(--outline-for-black-text), -1px 1px 0 var(--outline-for-black-text), 1px 1px 0 var(--outline-for-black-text), 0 0 0 var(--outline-for-black-text); text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">${translations.shop?.readyToOrder || 'Ready to Order?'}</h2>
                    <div class="conversion-actions" style="display: flex; gap: var(--spacing-md); justify-content: center; flex-wrap: wrap; margin-top: var(--spacing-xl);">
                        <button class="btn btn-primary" id="addToCartFinalBtn" style="min-width: 220px; padding: var(--spacing-md) var(--spacing-lg);">
                            ${translations.shop?.addToCart || 'Add to Cart'}
                        </button>
                        <button class="btn btn-secondary" id="customizeFinalBtn" style="min-width: 220px; padding: var(--spacing-md) var(--spacing-lg);">
                            ${translations.quiz?.customizeScent || 'Customize This Scent'}
                        </button>
                        <button class="btn btn-secondary" id="consultationBtn" style="min-width: 220px; padding: var(--spacing-md) var(--spacing-lg);">
                            ${translations.shop?.requestConsultation || 'Request Consultation'}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    document.getElementById('productPageContent').innerHTML = pageContent;
    
    // Add event listeners
    setupProductPageEvents();
    
    // Clear quiz flag
    sessionStorage.removeItem('fromQuiz');
}

function setupProductPageEvents() {
    // Buy button
    const buyBtn = document.getElementById('buyFragranceBtn');
    if (buyBtn) {
        buyBtn.addEventListener('click', () => {
            document.getElementById('addToCartFinalBtn')?.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Customize buttons
    document.querySelectorAll('#customizeScentBtn, #customizeFinalBtn').forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                window.location.href = 'index.html#quiz';
            });
        }
    });
    
    // Add to cart
    const addToCartBtn = document.getElementById('addToCartFinalBtn');
    if (addToCartBtn && window.addToCart) {
        addToCartBtn.addEventListener('click', () => {
            window.addToCart({
                name: currentProduct.name,
                price: '₪ 350',
                image: productImages[currentProduct.key]
            });
        });
    }
    
    // Consultation button
    const consultationBtn = document.getElementById('consultationBtn');
    if (consultationBtn) {
        consultationBtn.addEventListener('click', () => {
            window.location.href = 'index.html#contact';
        });
    }
}

