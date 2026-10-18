# Divina Maison - Luxury Fragrance Website

## Overview

A premium, bilingual (English/Hebrew) e-commerce website for Divina Maison, a luxury custom perfume brand. This is a flagship brand experience featuring an intelligent fragrance discovery quiz and dedicated product pages.

## Project Structure

```
DivinaMaison/
├── index.html              # Homepage with quiz
├── shop.html               # Shop page
├── product.html            # Dynamic product page template
├── styles.css              # Main stylesheet
├── app.js                  # Core JavaScript (i18n, cart, quiz)
├── product-page.js         # Product page logic
├── locales/
│   ├── en.json            # English translations
│   └── he.json            # Hebrew translations
├── images/                 # Logo and product images
│   ├── logo-with-text.jpg
│   └── logo-icon.png
└── README.md              # This file
```

## Brand Identity

### Color Palette (STRICT)

- **Cream/Ivory** (`#F8F0E3`) - Main background
- **Deep Brown** (`#321F15`) - Text and structure
- **Soft Metallic Gold** (`#D4AF37`) - Accents, dividers, focus states
- **Royal Blue** (`#4169E1`) - Limited use only (active states, links, accessibility focus)

❌ **No red, green, loud gradients, neon, or experimental colors**

### Typography

- **English**: Playfair Display (headings) + Montserrat (body)
- **Hebrew**: Assistant (headings) + Heebo (body)

## Multi-Language Support

### Languages
- **English (LTR)** - Left-to-right layout
- **Hebrew (RTL)** - Right-to-left layout

### Rules
- **NOT literal translations** - Each language has culturally natural phrasing
- **No shared strings** - Separate language files
- **Zero foreign-language leakage** - No English in Hebrew mode, no Hebrew in English mode

### Translation Files
- `locales/en.json` - All English content
- `locales/he.json` - All Hebrew content

## Product Routing & URLs

### URL Structure (Strict)

All product pages follow this exact pattern:

```
product.html?product={productKey}
```

**Product Keys:**
- `amberFrost` → Amber Frost
- `northernIron` → Northern Iron
- `deepEmber` → Deep Ember
- `velvetSnow` → Velvet Snow
- `crimsonNight` → Crimson Night
- `oudMirage` → Oud Mirage

**Product Slugs (for future use):**
- `amber-frost`
- `northern-iron`
- `deep-ember`
- `velvet-snow`
- `crimson-night`
- `oud-mirage`

### Product Page Sections (Required Order)

1. **Hero Section** - Product name, vibe statement, CTAs
2. **Fragrance Identity** - Expression, intensity, season, timing, projection
3. **Scent Profile** - Top/Heart/Base notes
4. **Emotional Description** - Why this fragrance exists
5. **Oil vs Alcohol Recommendation** - Format suggestion
6. **How & When to Wear** - Usage guide
7. **Fragrance Tips** - Reusable tips section
8. **Connection to Quiz** - If arrived from quiz (subtle badge)
9. **Conversion Area** - Final CTAs (Buy, Customize, Consultation)

## Fragrance Discovery Quiz

### Quiz Modes

1. **Short Quiz** - "Fast Match"
   - 5 essential questions
   - ~45 seconds
   - Questions: Q1, Q2, Q3, Q5, Q4 (in that order)

2. **In-Depth Quiz** - "Perfect Match"
   - 10 questions total
   - ~2-3 minutes
   - All questions from the master list

### Quiz UX/UI Rules

- **One question per screen** - No scrolling
- **Smooth transitions** - 400-600ms fade + slide
- **Progress indicator** - "Question X of Y" / "שאלה X מתוך Y"
- **Card/tile answers** - No radio buttons
- **Gold accent** - On selected cards (bottom border)
- **Continue button** - No auto-advance
- **Back button** - For navigation

### Quiz Logic

The quiz maps answers to:
- **Scent family** (warm, fresh, woody, spicy, floral)
- **Intensity** (intimate, balanced, strong)
- **Personality match** (soft ↔ powerful)
- **Seasonal fit** (winter, all seasons, etc.)
- **Oil vs alcohol** recommendation

### Result Page

- Shows recommended fragrance(s)
- Short emotional explanation
- CTAs: "View Fragrance" | "Customize This Scent"
- Links to product page with `fromQuiz` flag

## Product Catalog

### Fragrances

1. **Amber Frost** (Unisex)
   - Vibe: Warm, soft, lightly smoky. Luxurious, not sweet.
   - Notes: Clementine, Cardamom, Black Tea / Golden Amber, Soft Incense, Jasmine Sambac / Madagascar Vanilla, Sandalwood, Clean Musk, Hint of Leather

2. **Northern Iron** (Very Masculine)
   - Vibe: Dark, dry, powerful. Winter masculinity.
   - Notes: Black Pepper, Juniper / Smoky Vetiver, Sage, Cedar / Dry Patchouli, Grey Amber, Rough Leather

3. **Deep Ember** (Very Masculine)
   - Vibe: Warm, spicy, deep. Heavy but elegant.
   - Notes: Cinnamon, Clove, Bitter Orange / Sweet Tobacco, Dark Lavender, Cashmere Woods / Tonka Bean, Frankincense, Light Oud

4. **Velvet Snow** (Very Feminine)
   - Vibe: Soft, creamy, indulgent. Wrapped winter femininity.
   - Notes: Pear, Bergamot / Turkish Rose, White Orchid / Vanilla, Soft Musk, Creamy Sandalwood

5. **Crimson Night** (Very Feminine)
   - Vibe: Sensual, warm, dark fruits. Winter nights.
   - Notes: Pomegranate, Pink Pepper / Dense Jasmine, Black Plum, Ylang-Ylang / Sweet Patchouli, Dark Amber, Winter Resins

6. **Oud Mirage** (Unisex – Middle Eastern)
   - Vibe: Clean oud, woody, smoky-elegant. Deep and impressive.
   - Notes: Soft Cinnamon, Cardamom, Bitter Orange / Clean Cambodian Oud, Dry Damask Rose, White Incense / Dark Amber, Lebanese Cedar, Light Tonka, Dry Musk

## Logo Placement

### Header
- Fixed size, no resize on scroll
- Mirrored for RTL/LTR
- Fallback text: "DIVINA MAISON"

### Footer
- Subtle presence
- No overuse

**Logo Files:**
- `images/logo-with-text.jpg` - Full logo
- `images/logo-icon.png` - Icon only

## Technical Requirements

### No Page Reloads
- All navigation uses smooth transitions
- No layout jumps
- No content flashing

### RTL/LTR Support
- Full RTL layout for Hebrew
- Mirrored navigation and icons
- Correct text alignment

### Responsive Design
- Mobile-first approach
- Breakpoints: mobile (≤640px), tablet (641–1024px), desktop (1025px+)

### Performance
- Lazy loading for images
- Optimized animations
- Minimal JavaScript

## Setup & Installation

### Local Development

1. **Clone or download** the project files
2. **Start a local server** (required for JSON loading):
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx http-server
   ```
3. **Open** `http://localhost:8000` in your browser

### Production Deployment

1. Upload all files to your web server
2. Ensure `locales/` folder is accessible
3. Replace `YOUR_FORM_ID` in forms with your Formspree ID
4. Update logo images in `images/` folder

## Updating Content

### Translations

All text content is in JSON files:
- `locales/en.json` - English
- `locales/he.json` - Hebrew

**To update:**
1. Open the appropriate JSON file
2. Find the key you want to update
3. Modify the value
4. Save and refresh browser

**Example:**
```json
{
  "hero": {
    "title": "Divina Maison",
    "subtitle": "Your new subtitle"
  }
}
```

### Adding a New Product

1. Add product data to both `en.json` and `he.json`:
   ```json
   "products": {
     "newProduct": {
       "name": "New Fragrance",
       "slug": "new-fragrance",
       "type": "Unisex",
       "vibe": "Description...",
       "topNotes": "...",
       "middleNotes": "...",
       "baseNotes": "..."
     }
   }
   ```

2. Add to `productSlugMap` in `product-page.js`
3. Add product image mapping
4. Update product links throughout the site

### Quiz Questions

Quiz questions are in:
- `locales/en.json` → `quiz.short` and `quiz.long`
- `locales/he.json` → `quiz.short` and `quiz.long`

**Short quiz order:** Q1, Q2, Q3, Q5, Q4

## Formspree Configuration

Replace `YOUR_FORM_ID` in:
- `index.html` - Contact form
- `index.html` - Newsletter form

Get your Formspree ID from: https://formspree.io

## QA Checklist

- [ ] All product pages load correctly
- [ ] Quiz works in both languages
- [ ] RTL layout correct for Hebrew
- [ ] No foreign-language leakage
- [ ] All links work
- [ ] Cart functionality works
- [ ] Forms submit correctly
- [ ] Images load properly
- [ ] Responsive on mobile/tablet/desktop
- [ ] No console errors
- [ ] Smooth animations
- [ ] Logo displays correctly

## UX Principles

- **No reloads** - Smooth transitions only
- **No jumps** - Stable layouts
- **No flashing** - Content loads gracefully
- **Calm pacing** - Generous spacing
- **Premium feel** - Elegant, intentional design

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2025 Divina Maison. All rights reserved.

## Support

For questions or issues, refer to the code comments or contact the development team.
