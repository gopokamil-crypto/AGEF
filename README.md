# AGEF Website - Local Copy

This is a local copy of the AGEF (Agence de Gestion Foncière) website extracted from https://www.agef.ci/

## What Was Done

1. **HTML Extraction**: Downloaded the complete HTML source code from the live website
2. **CSS Files**: Downloaded all CSS stylesheets including:
   - Bootstrap CSS
   - Theme styles (Paroti theme)
   - Elementor page builder styles
   - Font Awesome icons
   - Line Awesome icons
   - Custom theme CSS

3. **JavaScript Files**: Downloaded essential JavaScript files:
   - jQuery
   - Bootstrap JS
   - Theme main scripts
   - Elementor frontend scripts

4. **Images**: Downloaded key images including:
   - Logo
   - Slider images (5 images)
   - Director's photo
   - About section image

5. **Simplified HTML**: Created a clean, simplified version of the homepage that:
   - Uses local file paths for all assets
   - Includes a working image slider
   - Maintains the original design and layout
   - Is fully responsive
   - Includes all main sections: Header, Hero Slider, About, Services, Footer

## Directory Structure

```
AGEF/
├── index.html              # Main homepage
├── agef-source.html        # Original HTML source
├── download-assets.sh      # Script used to download assets
├── css/                    # All CSS files
│   ├── bootstrap.css
│   ├── template.css
│   ├── paroti-style.css
│   ├── frontend.min.css
│   └── ...
├── js/                     # All JavaScript files
│   ├── jquery.min.js
│   ├── bootstrap.min.js
│   ├── main.js
│   └── ...
└── images/                 # All images
    ├── logo.png
    ├── IMAGE-1-scaled.png
    ├── directrice.jpg
    └── ...
```

## How to Use

### Option 1: Open Directly in Browser
Simply double-click on `index.html` to open it in your default web browser.

### Option 2: Use a Local Server (Recommended)
For better performance and to avoid CORS issues:

**Using Python:**
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js (http-server):**
```bash
npx http-server -p 8000
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then open your browser and navigate to: `http://localhost:8000`

## Features

### Working Features:
- ✅ Responsive navigation menu
- ✅ Auto-rotating image slider (changes every 5 seconds)
- ✅ Manual slider controls (previous/next buttons)
- ✅ Responsive layout (mobile, tablet, desktop)
- ✅ Social media links
- ✅ Footer with contact information
- ✅ All styling from original website

### Limitations:
- ⚠️ Some advanced WordPress/Elementor features may not work
- ⚠️ Dynamic content (blog posts, forms) are static
- ⚠️ Some external resources may still reference the original website
- ⚠️ Video content and complex galleries are simplified

## Customization

You can customize the website by editing:
- `index.html` - Main structure and content
- `css/` files - Styling and appearance
- `js/` files - Interactive features

## Original Website

This is a local copy of: https://www.agef.ci/

All content and design belong to AGEF (Agence de Gestion Foncière).

## Technical Details

- **Framework**: WordPress with Elementor Page Builder
- **Theme**: Paroti (Child Theme)
- **CSS Framework**: Bootstrap
- **Icons**: Font Awesome, Line Awesome
- **Slider**: Custom JavaScript implementation (simplified from Smart Slider 3)

## Notes

- This is a static snapshot of the website taken on the extraction date
- For the most up-to-date information, visit the official website at https://www.agef.ci/
- Some features that require server-side processing (forms, search, etc.) will not work in this static version

## Browser Compatibility

Tested and working on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

---

Created: 2025
