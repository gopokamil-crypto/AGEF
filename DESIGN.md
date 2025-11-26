# AGEF Website - Design System Documentation

## 📋 **Table of Contents**
1. [Brand Identity](#brand-identity)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Layout System](#layout-system)
5. [Component Library](#component-library)
6. [Spacing & Sizing](#spacing--sizing)
7. [Responsive Design](#responsive-design)
8. [HTML Structure Patterns](#html-structure-patterns)
9. [CSS Architecture](#css-architecture)
10. [Elementor Patterns](#elementor-patterns)

---

## 🎨 **Brand Identity**

### Primary Brand Color
- **AGEF Green**: `#2B8E38`
  - Used for: Primary CTAs, headings, highlights, active menu items
  - RGB: `rgb(43, 142, 56)`
  - Usage: Buttons, links, accents, brand elements

### Secondary Brand Color
- **AGEF Orange**: `#DF5311`
  - Used for: Secondary accents, highlights
  - RGB: `rgb(223, 83, 17)`
  - Usage: Special highlights, featured content

### Dark Background
- **AGEF Dark Green**: `#1E4925`
  - Used for: Section backgrounds, hero sections
  - RGB: `rgb(30, 73, 37)`
  - Usage: Dark sections, contrast backgrounds

---

## 🎨 **Color Palette**

### Primary Colors
```css
--e-global-color-primary: #2B8E38;     /* AGEF Green */
--paroti-body-color: #666666;           /* Body text */
--paroti-heading-color: #144047;        /* Headings */
```

### Neutral Colors
```css
--color-white: #FFFFFF;
--color-black: #000000;
--color-dark-text: #144047;             /* Dark headings */
--color-body-text: #666666;             /* Body text */
--color-light-gray: #F8F9FA;            /* Light backgrounds */
--color-border: #EDEDED;                /* Borders, inputs */
--color-gray-bg: #F1F6F7;               /* Section backgrounds */
```

### Semantic Colors
```css
--color-success: #2B8E38;               /* Success states */
--color-warning: #DF5311;               /* Warning/attention */
--color-error: #cf2e2e;                 /* Error states */
--color-info: #0693e3;                  /* Information */
```

### Background Colors
```css
--bg-white: #FFFFFF;
--bg-light: #F8F9FA;
--bg-dark-green: #1E4925;
--bg-gray: #F1F6F7;
```

---

## ✍️ **Typography**

### Font Families
```css
/* Primary Font */
font-family: 'Manrope', sans-serif;
/* Weights: 300, 400, 500, 600, 700, 800 */

/* Heading Font */
--paroti-heading-font-family: 'Manrope', sans-serif;

/* Alternative Fonts (WordPress defaults) */
--wp--preset--font-family--inter: "Inter", sans-serif;
--wp--preset--font-family--cardo: Cardo;
```

### Font Sizes
```css
/* Base */
body {
  font-size: 16px;
  line-height: 1.8em;
}

/* Headings */
h1 { font-size: 48px; line-height: 1.2; }
h2 { font-size: 36px; line-height: 1.3; }
h3 { font-size: 28px; line-height: 1.4; }
h4 { font-size: 24px; line-height: 1.4; }
h5 { font-size: 20px; line-height: 1.5; }
h6 { font-size: 18px; line-height: 1.5; }

/* WordPress Presets */
--wp--preset--font-size--small: 13px;
--wp--preset--font-size--medium: 20px;
--wp--preset--font-size--large: 36px;
--wp--preset--font-size--x-large: 42px;
```

### Font Weights
```css
--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
```

### Heading Styles
```css
h1, h2, h3, h4, h5, h6 {
  margin-top: 15px;
  margin-bottom: 20px;
  letter-spacing: -0.6px;
  font-family: var(--paroti-heading-font-family);
  color: #144047;
}
```

---

## 📐 **Layout System**

### Container Widths
```css
.container, .elementor-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.container-full {
  width: 100%;
  padding: 0;
}
```

### Grid System (Bootstrap-based)
```css
.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
}

.col-12 { flex: 0 0 100%; max-width: 100%; }
.col-6  { flex: 0 0 50%;  max-width: 50%; }
.col-4  { flex: 0 0 33.333%; max-width: 33.333%; }
.col-3  { flex: 0 0 25%;  max-width: 25%; }

/* Elementor Columns */
.elementor-col-100 { width: 100%; }
.elementor-col-50  { width: 50%; }
.elementor-col-33  { width: 33.333%; }
.elementor-col-25  { width: 25%; }
```

### Section Padding
```css
/* Standard Section Padding */
.elementor-section {
  padding: 80px 0;
}

/* Large Section Padding */
.section-large {
  padding: 100px 0;
}

/* Small Section Padding */
.section-small {
  padding: 60px 0;
}

/* Mobile Adjustments */
@media (max-width: 767px) {
  .elementor-section {
    padding: 30px 0;
  }
}
```

---

## 🧩 **Component Library**

### 1. Buttons

#### Primary Button
```html
<a class="btn-theme" href="#">
  Button Text
</a>
```

```css
.btn-theme {
  display: inline-block;
  padding: 12px 30px;
  background-color: #2B8E38;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 600;
  transition: all 0.35s;
}

.btn-theme:hover {
  background-color: #237a2f;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.16);
  color: white;
}
```

#### WordPress Block Button
```css
.wp-block-button__link {
  color: #fff !important;
  background-color: #32373c;
  border-radius: 9999px;
  padding: calc(.667em + 2px) calc(1.333em + 2px);
  font-size: 1.125em;
  transition: all 0.35s;
}

.wp-block-button__link:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.16);
}
```

### 2. Headings Component (gsc-heading)

```html
<div class="gsc-heading box-align-left auto-responsive">
  <div class="content-inner">
    <div class="sub-title">
      <span class="tagline">Subtitle Text</span>
    </div>
    <h2 class="title">
      <span>Main Heading</span>
    </h2>
    <div class="title-desc">
      Description text goes here
    </div>
  </div>
</div>
```

```css
.gsc-heading .sub-title .tagline {
  color: #2B8E38;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.gsc-heading .title {
  color: #2B8E38;
  font-size: 36px;
  margin-bottom: 10px;
  font-weight: 700;
}

.gsc-heading .title-desc {
  color: #666666;
  line-height: 1.8;
  padding: 25px 0 0 0;
}
```

### 3. Navigation Menu

```html
<ul class="gva-nav-menu gva-main-menu">
  <li class="menu-item current-menu-item">
    <a href="index.html">
      <span class="item-content">
        <span class="menu-title">Accueil</span>
      </span>
    </a>
  </li>
  <li class="menu-item menu-item-has-children">
    <a href="#">
      <span class="item-content">
        <span class="menu-title">Services</span>
        <span class="caret"></span>
      </span>
    </a>
    <ul class="submenu-inner">
      <li><a href="#"><span class="menu-title">Submenu Item</span></a></li>
    </ul>
  </li>
</ul>
```

```css
.gva-nav-menu > li .submenu-inner li a,
.gva-nav-menu > li ul.submenu-inner li a {
  text-transform: none;
}

.current-menu-item > a {
  color: #2B8E38 !important;
}

.current-menu-ancestor > a {
  color: #2B8E38 !important;
}
```

### 4. Icon Boxes

```html
<div class="elementor-icon-box-wrapper">
  <div class="elementor-icon-box-content">
    <p class="elementor-icon-box-description">
      Description text
    </p>
  </div>
</div>
```

### 5. Social Icons

```html
<div class="elementor-social-icons-wrapper elementor-grid">
  <span class="elementor-grid-item">
    <a class="elementor-icon elementor-social-icon" href="#" target="_blank">
      <i class="fab fa-facebook"></i>
    </a>
  </span>
</div>
```

### 6. Logo Component

```html
<div class="gsc-logo text-center">
  <a class="site-branding-logo" href="index.html" title="Home">
    <img src="images/logo.png" alt="Home" />
  </a>
</div>
```

### 7. Forms & Inputs

```css
input[type="text"],
input[type="email"],
input[type="tel"],
textarea,
select {
  background-color: #FFF;
  padding: 0 12px;
  line-height: 40px;
  color: #666666;
  font-size: 15px;
  border: 2px solid #EDEDED;
  width: 100%;
  transition: all 0.35s;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: #2B8E38;
}
```

---

## 📏 **Spacing & Sizing**

### Spacing Scale
```css
--spacing-xs: 5px;
--spacing-sm: 10px;
--spacing-md: 15px;
--spacing-lg: 20px;
--spacing-xl: 30px;
--spacing-2xl: 40px;
--spacing-3xl: 60px;
--spacing-4xl: 80px;
--spacing-5xl: 100px;

/* WordPress Spacing Presets */
--wp--preset--spacing--20: 0.44rem;
--wp--preset--spacing--30: 0.67rem;
--wp--preset--spacing--40: 1rem;
--wp--preset--spacing--50: 1.5rem;
--wp--preset--spacing--60: 2.25rem;
--wp--preset--spacing--70: 3.38rem;
--wp--preset--spacing--80: 5.06rem;
```

### Border Radius
```css
--border-radius-sm: 3px;
--border-radius-md: 5px;
--border-radius-lg: 10px;
--border-radius-full: 9999px;
```

### Shadows
```css
/* WordPress Shadow Presets */
--wp--preset--shadow--natural: 6px 6px 9px rgba(0, 0, 0, 0.2);
--wp--preset--shadow--deep: 12px 12px 50px rgba(0, 0, 0, 0.4);
--wp--preset--shadow--sharp: 6px 6px 0px rgba(0, 0, 0, 0.2);
--wp--preset--shadow--crisp: 6px 6px 0px rgba(0, 0, 0, 1);

/* Button Hover Shadow */
box-shadow: 0 8px 16px rgba(0, 0, 0, 0.16);
```

---

## 📱 **Responsive Design**

### Breakpoints
```css
/* Desktop Portrait */
@media (min-width: 1200px) { }

/* Tablet Portrait */
@media (max-width: 1199px) and (min-width: 701px) { }
@media (max-width: 1024px) { }

/* Mobile Portrait */
@media (max-width: 700px) { }
@media (max-width: 767px) { }

/* Small Mobile */
@media (max-width: 640px) { }
@media (max-width: 480px) { }
```

### Responsive Patterns

#### Hide on Mobile
```css
@media (max-width: 767px) {
  .hide-mobile {
    display: none !important;
  }
}
```

#### Stack Columns on Mobile
```css
@media (max-width: 767px) {
  .elementor-col-50,
  .elementor-col-33,
  .elementor-col-25 {
    width: 100%;
    margin-bottom: 30px;
  }
}
```

#### Adjust Padding on Mobile
```css
@media (max-width: 767px) {
  .elementor-section {
    padding: 30px 0 !important;
  }
}
```

---

## 🏗️ **HTML Structure Patterns**

### Page Structure
```html
<!DOCTYPE html>
<html lang="fr-FR" class="no-js">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page Title - Agence de Gestion Foncière</title>
  
  <!-- CSS Links -->
  <link rel='stylesheet' href='../css/bootstrap.css' />
  <link rel='stylesheet' href='../css/template.css' />
  <link rel='stylesheet' href='../css/paroti-style.css' />
  
  <!-- Google Fonts -->
  <link href='https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap' rel='stylesheet' />
</head>

<body class="page-template-default page theme-paroti">
  <div class="paroti-page-loading"></div>
  
  <div class="wrapper-page">
    <!-- Header -->
    <header class="wp-site-header header-builder-frontend">
      <!-- Header content -->
    </header>
    
    <!-- Main Content -->
    <div id="page-content">
      <section id="wp-main-content" class="clearfix main-page">
        <div class="main-page-content">
          <div class="content-page">
            <div id="wp-content" class="wp-content clearfix">
              <!-- Page content -->
            </div>
          </div>
        </div>
      </section>
    </div>
    
    <!-- Footer -->
    <footer id="wp-footer" class="clearfix">
      <!-- Footer content -->
    </footer>
  </div>
  
  <!-- JavaScript -->
  <script src="../js/jquery.min.js"></script>
  <script src="../js/bootstrap.min.js"></script>
  <script src="../js/main.js"></script>
</body>
</html>
```

### Section Structure (Elementor)
```html
<section class="elementor-section elementor-top-section" data-id="unique-id" data-element_type="section">
  <div class="elementor-container elementor-column-gap-default">
    <div class="elementor-column elementor-col-100" data-element_type="column">
      <div class="elementor-widget-wrap elementor-element-populated">
        <!-- Widgets go here -->
      </div>
    </div>
  </div>
</section>
```

### Two-Column Layout
```html
<section class="elementor-section">
  <div class="elementor-container">
    <div class="row">
      <div class="col-md-6">
        <!-- Left column content -->
      </div>
      <div class="col-md-6">
        <!-- Right column content -->
      </div>
    </div>
  </div>
</section>
```

### Three-Column Layout
```html
<section class="elementor-section">
  <div class="elementor-container">
    <div class="row">
      <div class="col-md-4">
        <!-- Column 1 -->
      </div>
      <div class="col-md-4">
        <!-- Column 2 -->
      </div>
      <div class="col-md-4">
        <!-- Column 3 -->
      </div>
    </div>
  </div>
</section>
```

---

## 🎯 **CSS Architecture**

### File Organization
```
css/
├── bootstrap.css          # Grid system, utilities
├── template.css           # Main theme styles
├── paroti-style.css       # Theme-specific styles
├── paroti-child-style.css # Child theme overrides
├── frontend.min.css       # Elementor frontend
├── all.min.css            # Font Awesome icons
├── line-awesome.min.css   # Line Awesome icons
└── post-*.css             # Page-specific styles
```

### CSS Naming Conventions

#### BEM-like Structure
```css
/* Block */
.gsc-heading { }

/* Element */
.gsc-heading .title { }
.gsc-heading .sub-title { }
.gsc-heading .title-desc { }

/* Modifier */
.gsc-heading.align-center { }
.gsc-heading.style-1 { }
```

#### Elementor Classes
```css
.elementor-section { }
.elementor-container { }
.elementor-column { }
.elementor-widget-wrap { }
.elementor-widget { }
.elementor-element { }
```

### Utility Classes
```css
/* Text Alignment */
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }

/* Display */
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

/* Spacing */
.no-padding { padding: 0 !important; }
.no-margin { margin: 0 !important; }

/* Visibility */
.hide { display: none; }
.screen-reader-text { /* Accessible hidden text */ }
```

---

## 🔧 **Elementor Patterns**

### Widget Structure
```html
<div class="elementor-element elementor-widget elementor-widget-[widget-type]" 
     data-id="unique-id" 
     data-element_type="widget" 
     data-widget_type="[widget-type].default">
  <div class="elementor-widget-container">
    <!-- Widget content -->
  </div>
</div>
```

### Common Widget Types
- `gva-heading-block` - Custom heading component
- `gva-logo` - Logo component
- `gva-navigation-menu` - Navigation menu
- `text-editor` - Text content
- `image` - Image widget
- `video` - Video widget
- `icon-box` - Icon with text
- `social-icons` - Social media icons
- `icon-list` - List with icons

### Background Settings
```html
<!-- Classic Background -->
<section data-settings='{"background_background":"classic"}'>
  <div class="elementor-background-overlay"></div>
  <!-- Content -->
</section>

<!-- Slideshow Background -->
<section data-settings='{"background_background":"slideshow","background_slideshow_gallery":[...]}'>
  <div class="elementor-background-overlay"></div>
  <!-- Content -->
</section>
```

---

## 🎨 **Design Principles**

### 1. **Consistency**
- Use the AGEF green (#2B8E38) consistently for all primary actions
- Maintain consistent spacing between sections (80px desktop, 30px mobile)
- Use the same heading hierarchy across all pages

### 2. **Hierarchy**
- Page title (h1) → Section title (h2) → Subsection (h3)
- Tagline/subtitle above main heading
- Description text below heading

### 3. **Whitespace**
- Generous padding in sections (80px top/bottom)
- Consistent column gaps (15px)
- Line height of 1.8 for body text

### 4. **Accessibility**
- Sufficient color contrast (AGEF green on white passes WCAG AA)
- Focus states on interactive elements
- Screen reader text for icons

### 5. **Mobile-First Responsive**
- Stack columns on mobile
- Reduce padding on mobile (30px vs 80px)
- Ensure touch targets are at least 44x44px

---

## 📝 **Creating New Pages - Checklist**

### Required Elements
- [ ] Proper DOCTYPE and HTML structure
- [ ] Meta viewport tag for responsive design
- [ ] Title tag with " - Agence de Gestion Foncière" suffix
- [ ] Link to all required CSS files (bootstrap, template, paroti-style)
- [ ] Google Fonts link for Manrope
- [ ] Header with logo and navigation
- [ ] Main content area with proper structure
- [ ] Footer with contact information and links
- [ ] JavaScript files (jQuery, Bootstrap, main.js)

### CSS Files to Include (in order)
```html
<link rel='stylesheet' href='../css/bootstrap.css' />
<link rel='stylesheet' href='../css/all.min.css' />
<link rel='stylesheet' href='../css/line-awesome.min.css' />
<link rel='stylesheet' href='../css/paroti-style.css' />
<link rel='stylesheet' href='../css/template.css' />
<link rel='stylesheet' href='../css/paroti-child-style.css' />
<link rel='stylesheet' href='../css/frontend.min.css' />
<link href='https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap' rel='stylesheet' />
```

### JavaScript Files to Include (in order)
```html
<script src="../js/jquery.min.js"></script>
<script src="../js/bootstrap.min.js"></script>
<script src="../js/main.js"></script>
<script src="../js/frontend.min.js"></script>
```

---

## 🎯 **Common Patterns**

### Hero Section with Background
```html
<section class="elementor-section" style="background-color: #1E4925; padding: 150px 0;">
  <div class="elementor-container">
    <div class="gsc-heading box-align-center">
      <div class="content-inner">
        <h2 class="title" style="color: #FFFFFF;">
          <span>Page Title</span>
        </h2>
        <div class="title-desc" style="color: #FFFFFF;">
          Subtitle or description
        </div>
      </div>
    </div>
  </div>
</section>
```

### Content Section with Heading
```html
<section class="elementor-section" style="padding: 80px 0;">
  <div class="elementor-container">
    <div class="gsc-heading box-align-center">
      <div class="content-inner">
        <div class="sub-title">
          <span class="tagline">Section Label</span>
        </div>
        <h2 class="title">
          <span>Section Title</span>
        </h2>
        <div class="title-desc">
          Section description
        </div>
      </div>
    </div>
  </div>
</section>
```

### Two-Column Content
```html
<section class="elementor-section" style="padding: 80px 0; background-color: #FFFFFF;">
  <div class="elementor-container">
    <div class="row">
      <div class="col-md-6">
        <img src="images/example.jpg" alt="Description" style="width: 100%; border-radius: 10px;" />
      </div>
      <div class="col-md-6">
        <div class="gsc-heading box-align-left">
          <div class="content-inner">
            <div class="sub-title">
              <span class="tagline">Label</span>
            </div>
            <h2 class="title" style="color: #2B8E38;">
              <span>Heading</span>
            </h2>
            <div class="title-desc">
              <p>Content goes here...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## 📚 **Quick Reference**

### Brand Colors
- Primary: `#2B8E38` (AGEF Green)
- Secondary: `#DF5311` (AGEF Orange)
- Dark: `#1E4925` (Dark Green)
- Text: `#666666` (Body), `#144047` (Headings)

### Typography
- Font: `'Manrope', sans-serif`
- Body: `16px / 1.8em`
- H2: `36px` (Section titles)

### Spacing
- Section padding: `80px 0` (desktop), `30px 0` (mobile)
- Container: `max-width: 1200px`
- Column gap: `15px`

### Components
- Button: `.btn-theme`
- Heading: `.gsc-heading`
- Menu: `.gva-nav-menu`

---

**Last Updated**: November 22, 2025  
**Version**: 1.0  
**Maintained by**: AGEF Development Team
