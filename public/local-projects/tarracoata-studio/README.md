# TarraCoata Studio - Premium Agency Website

## Project Overview

This is a **production-ready, multilingual website** for **TarraCoata Studio** – a high-end digital studio specializing in Website Design, Web Development, UX/UI, Branding, and Digital Solutions. The website features complete internationalization (i18n) support for 4 languages with seamless RTL/LTR layout switching.

## ✅ What is COMPLETE

### Language System (Fully Implemented)
- **4 Languages Supported**: English (en), Hebrew (he), Spanish (es), Russian (ru)
- **Default Language**: Hebrew (he) with RTL layout
- **Language Switcher**: Flag-based UI in navbar (desktop & mobile)
- **Complete Translation Coverage**: All text content is translatable
- **RTL Support**: Full right-to-left layout for Hebrew
- **localStorage Persistence**: Language preference is saved and restored
- **Zero Layout Shift**: Language switching is seamless with no jumps or flicker
- **Scroll Position Preservation**: Scroll position maintained during language switch

### Technical Features
- **Sticky Navigation** - Fixed navbar with smooth scroll, mobile menu
- **Hero Section** - Conversion-focused above-the-fold content
- **Services** - 5 core service offerings with detailed descriptions
- **About** - Brand narrative and positioning
- **Process** - 5-step workflow visualization
- **Portfolio** - Case studies with modal detail views (fully translated)
- **Pricing** - 3-tier pricing structure (all text translatable)
- **Authority & Trust** - Studio values and principles
- **FAQ** - Accordion-style frequently asked questions (8 questions, fully translated)
- **Contact** - Formspree-integrated contact form with validation
- **Footer** - Navigation, contact info, social links, hashtags

### Interactive Features
- Smooth scrolling navigation
- Mobile-responsive hamburger menu
- Active section highlighting on scroll
- FAQ accordion with keyboard accessibility
- Portfolio modal with project details
- Form validation and submission handling
- Scroll-triggered fade-in animations
- Hover effects and micro-interactions
- **Language switching with zero layout shift**

### Stability & UX
- **No page reloads** - All language switching is client-side
- **No layout jumps** - Scroll position preserved
- **No flicker** - Smooth transitions between languages
- **No mixed languages** - Complete translation coverage
- **Clean code** - No duplicates, no redundant logic
- **Consistent spacing** - Predictable vertical rhythm
- **Premium feel** - Calm, stable, professional UX

## 📋 What the OWNER Needs to Add

### 1. Real Images (Required)
**Current Status**: Using Unsplash placeholder images

**Action Required**:
- Replace all placeholder images in `index.html` with your actual images
- Recommended image locations: `assets/images/`

**Images to Replace**:
1. **Hero Background** (Line ~107): `https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80`
   - Recommended size: 1920x1080px
   - Format: JPEG or WebP
   - Update path: `assets/images/hero-background.jpg`

2. **About Section** (Line ~302): `https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80`
   - Recommended size: 800x600px
   - Format: JPEG or WebP
   - Update path: `assets/images/about-team.jpg`

3. **Portfolio Images** (6 images, Lines ~421, ~439, ~457, ~475, ~493, ~511):
   - Recommended size: 800x600px (4:3 aspect ratio)
   - Format: JPEG or WebP
   - Update paths: `assets/images/portfolio-1.jpg` through `assets/images/portfolio-6.jpg`

**How to Replace**:
```html
<!-- Before -->
<img src="https://images.unsplash.com/..." alt="...">

<!-- After -->
<img src="assets/images/your-image.jpg" alt="Descriptive alt text">
```

**Important**: Always include descriptive `alt` text for SEO and accessibility.

### 2. Contact Details (Verify)
**Current Contact Information**:
- **Email**: tarracoata@gmail.com ✅ (Already set)
- **Phone**: +972 54-696-9367 ✅ (Already set)
- **Instagram**: https://www.instagram.com/lielwainberg/ ✅ (Already set)
- **Facebook**: https://www.facebook.com/lielwainberg2003 ✅ (Already set)

**Action Required**: Verify all contact details are correct. Update in `index.html` footer section if needed.

### 3. Formspree Endpoint (Verify)
**Current Endpoint**: `https://formspree.io/f/mvzpgrde` ✅ (Already configured)

**Action Required**: 
- Verify the Formspree endpoint is active
- Test form submission
- Configure email notifications in Formspree dashboard

### 4. Optional: Logo Replacement
**Current Status**: Text-based logo "TarraCoata Studio"

**Action Required** (Optional):
- If you have a logo image, replace the text logo in navbar
- Recommended location: `assets/images/logo.svg` or `assets/images/logo.png`
- Update in `index.html` line ~63

### 5. Optional: Content Edits
All content is in translation files (`locales/*.json`). You can edit:
- Service descriptions
- About section text
- Process steps
- Portfolio project descriptions
- Pricing details
- FAQ questions and answers
- Contact form labels

**Note**: Changes must be made in all 4 language files (en.json, he.json, es.json, ru.json) to maintain consistency.

## ❌ What is INTENTIONALLY Left Out

### Payments
- **No payment integration** - Pricing CTAs lead to contact form
- **No checkout system** - All projects require consultation first
- **No subscription management** - Not included in scope

### CMS (Content Management System)
- **No backend CMS** - Content is in JSON translation files
- **No admin panel** - Content editing requires code access
- **No dynamic content** - All content is static

### Backend
- **No server-side code** - Pure client-side implementation
- **No database** - No data persistence beyond localStorage
- **No API endpoints** - Form submissions go to Formspree

### Analytics
- **No Google Analytics** - Not included by default
- **No tracking scripts** - Privacy-focused implementation
- **Can be added** - If needed, add GA script before `</head>` tag

### E-commerce
- **No shopping cart** - Not included
- **No product management** - Not included
- **No payment processing** - Not included

## File Structure

```
TarraCoataStudio/
├── index.html              # Main HTML file (single-page application)
├── styles/
│   └── main.css            # Custom CSS (Tailwind + custom styles + RTL support)
├── js/
│   ├── i18n.js            # Internationalization system (language switching, RTL)
│   └── app.js             # Main JavaScript (modular, commented)
├── locales/
│   ├── en.json            # English translations
│   ├── he.json            # Hebrew translations (RTL)
│   ├── es.json            # Spanish translations
│   └── ru.json            # Russian translations
├── assets/
│   ├── images/            # Image assets (YOU NEED TO ADD YOUR IMAGES HERE)
│   └── icons/             # SVG icons (if needed)
└── README.md               # This file
```

## Technologies Used

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **Vanilla JavaScript** - No heavy frameworks, clean modular code
- **Google Fonts** - Inter & Montserrat typography
- **Formspree** - Contact form handling
- **Custom i18n System** - Lightweight, client-side translation system

## Language System Details

### Supported Languages
1. **English (en)** - LTR layout
2. **Hebrew (he)** - RTL layout (default)
3. **Spanish (es)** - LTR layout
4. **Russian (ru)** - LTR layout

### How Language Switching Works
1. User clicks language flag in navbar
2. Dropdown appears with all 4 languages
3. User selects language
4. System:
   - Loads translation file (if not already loaded)
   - Updates HTML `lang` and `dir` attributes
   - Translates all elements with `data-i18n` attributes
   - Preserves scroll position
   - Updates meta tags
   - Saves preference to localStorage
5. **Zero layout shift** - Smooth, instant translation

### Translation File Structure
All translation files follow the same structure:
```json
{
  "nav": { ... },
  "hero": { ... },
  "services": { ... },
  "about": { ... },
  "process": { ... },
  "portfolio": { ... },
  "pricing": { ... },
  "authority": { ... },
  "faq": { ... },
  "contact": { ... },
  "footer": { ... },
  "meta": { ... }
}
```

## Setup & Installation

### Local Development

1. **Clone or download** this repository
2. **Open** `index.html` in a modern web browser
3. **No build process required** - uses Tailwind CSS via CDN

### Using a Local Server (Recommended)

For best results, use a local development server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

**Important**: The language system requires a server (not file://) to load translation JSON files.

## Content Editing Guide

### Updating Translations

All text content is in translation files (`locales/*.json`). To update content:

1. **Open the translation file** for the language you want to edit
2. **Find the key** you want to change (e.g., `hero.title`)
3. **Update the value** with your new text
4. **Repeat for all languages** to maintain consistency

**Example**:
```json
// locales/en.json
{
  "hero": {
    "title": "Your New Title"
  }
}

// locales/he.json
{
  "hero": {
    "title": "הכותרת החדשה שלך"
  }
}
```

### Updating Contact Information

Contact details are in the **Footer** section of `index.html` (around line 872):

```html
<p><a href="mailto:tarracoata@gmail.com">tarracoata@gmail.com</a></p>
<p><a href="tel:+972546969367">+972 54-696-9367</a></p>
```

Update these directly in the HTML file.

### Updating Social Media Links

Social links are in the **Footer** section (around line 895):

```html
<a href="https://www.instagram.com/lielwainberg/" ...>
<a href="https://www.facebook.com/lielwainberg2003" ...>
```

Update these directly in the HTML file.

## Image Replacement Guide

### Current Image Sources

All images currently use Unsplash placeholders. To replace them:

1. **Prepare your images**:
   - Optimize for web (JPEG/WebP format)
   - Recommended sizes:
     - Hero background: 1920x1080px
     - About section: 800x600px
     - Portfolio cards: 800x600px (4:3 aspect ratio)

2. **Add images to project**:
   - Place images in `assets/images/` folder
   - Use descriptive filenames (e.g., `hero-background.jpg`, `portfolio-1.jpg`)

3. **Update image paths in `index.html`**:
   ```html
   <!-- Before -->
   <img src="https://images.unsplash.com/..." alt="...">
   
   <!-- After -->
   <img src="assets/images/your-image.jpg" alt="Descriptive alt text">
   ```

4. **Important**: Always include descriptive `alt` text for SEO and accessibility.

## Formspree Integration

### Current Setup

The contact form is already configured with Formspree endpoint:
- **Endpoint**: `https://formspree.io/f/mvzpgrde`
- **Location**: `index.html` line ~823

### Formspree Configuration

1. **Form is already set up** - no changes needed
2. **To customize**:
   - Visit [Formspree Dashboard](https://formspree.io)
   - Configure email notifications
   - Set up spam protection
   - Add custom redirect after submission (optional)

### Testing the Form

1. Submit a test message through the contact form
2. Check your Formspree dashboard for submissions
3. Verify email notifications are working

### Form Fields

Current form fields:
- **Name** (required)
- **Email** (required, validated)
- **Project Type** (dropdown)
- **Message** (required)

To add/remove fields, edit the form in `index.html` and update validation in `js/app.js`.

## Deployment Checklist

### Pre-Deployment

- [ ] Replace all placeholder images with actual project images
- [ ] Update all contact information (if needed)
- [ ] Verify all social media links
- [ ] Test contact form submission
- [ ] Test language switching on all 4 languages
- [ ] Test RTL layout (Hebrew) thoroughly
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices
- [ ] Check all internal links work
- [ ] Verify SEO meta tags
- [ ] Run Lighthouse audit (aim for 90+ scores)

### Deployment Options

#### Netlify

1. **Drag and drop** the project folder to [Netlify Drop](https://app.netlify.com/drop)
2. **Or connect via Git**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin [your-repo-url]
   git push -u origin main
   ```
   Then connect repository in Netlify dashboard

#### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project directory
3. Follow prompts

#### GitHub Pages

1. Push code to GitHub repository
2. Go to Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://[username].github.io/[repo-name]`

#### Traditional Hosting

1. Upload all files via FTP/SFTP
2. Ensure `index.html` is in root directory
3. Test all functionality after upload

### Post-Deployment

- [ ] Test contact form on live site
- [ ] Verify all images load correctly
- [ ] Test language switching on live site
- [ ] Check mobile responsiveness
- [ ] Test page load speed
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics (if desired)
- [ ] Monitor Formspree submissions

## SEO Optimization

### Current SEO Features

- ✅ Semantic HTML5 structure
- ✅ Proper heading hierarchy (H1-H3)
- ✅ Meta description and keywords
- ✅ Open Graph tags for social sharing
- ✅ Structured data (JSON-LD)
- ✅ Alt text on all images
- ✅ Mobile-responsive design
- ✅ Fast load times
- ✅ Multilingual support (lang attributes)
- ✅ Hashtags in footer for social discovery

### Additional SEO Recommendations

1. **Create a sitemap.xml**:
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://yourdomain.com/</loc>
       <lastmod>2025-01-01</lastmod>
       <priority>1.0</priority>
     </url>
   </xml>
   ```

2. **Create robots.txt**:
   ```
   User-agent: *
   Allow: /
   Sitemap: https://yourdomain.com/sitemap.xml
   ```

3. **Add Google Analytics** (optional):
   - Add tracking code before `</head>` tag
   - Or use Google Tag Manager

4. **Submit to Search Engines**:
   - Google Search Console
   - Bing Webmaster Tools

## Performance Optimization

### Current Optimizations

- Tailwind CSS via CDN (fast loading)
- Optimized image URLs (Unsplash with size parameters)
- Minimal JavaScript (no heavy frameworks)
- Semantic HTML (faster parsing)
- Font-display: swap (prevents font flashing)
- Layout shift prevention (min-height on translatable elements)

### Further Optimization Tips

1. **Images**:
   - Use WebP format when possible
   - Compress images before upload
   - Use appropriate sizes (don't load 1920px images on mobile)

2. **CSS**:
   - Consider using Tailwind CLI for production (smaller file size)
   - Remove unused CSS

3. **JavaScript**:
   - Code is already optimized and modular
   - Consider minification for production

4. **Hosting**:
   - Use CDN for static assets
   - Enable gzip compression
   - Use HTTPS

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Maintenance

### Regular Updates

- **Content**: Update portfolio, services, pricing as needed
- **Images**: Refresh images periodically
- **Links**: Check all external links are working
- **Formspree**: Monitor form submissions
- **Performance**: Run Lighthouse audits quarterly
- **Translations**: Keep all language files in sync

### Security

- Keep Formspree endpoint secure
- Use HTTPS in production
- Regularly update dependencies (if using npm packages)
- Monitor for broken links

## Support & Contact

For questions about this website:

- **Email**: tarracoata@gmail.com
- **Phone**: +972 54-696-9367
- **Instagram**: [@lielwainberg](https://www.instagram.com/lielwainberg/)
- **Facebook**: [Liel Wainberg](https://www.facebook.com/lielwainberg2003)

## License

This website is proprietary to TarraCoata Studio. All rights reserved.

---

**Built with precision for TarraCoata Studio**  
*Strategic digital partners focused on quality, precision, and long-term value.*

**Hashtags**: #WebDesign #WebDevelopment #UXUI #DigitalStudio #Branding
