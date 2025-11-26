
document.addEventListener('DOMContentLoaded', function () {
    // 1. Inject FontAwesome
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
        document.head.appendChild(link);
    }

    // 2. Determine Base Path
    // Assuming pages are either at root (index.html) or in pages/ directory
    const isPagesDir = window.location.pathname.includes('/pages/');
    const basePath = isPagesDir ? '../' : './';

    // 3. Define Header Content
    const headerHTML = `
    <header class="wp-site-header header-builder-frontend header-position-relative">
        <!-- Mobile Header -->
        <div class="header-mobile header_mobile_screen">
            <div class="header-mobile-content">
                <div class="header-content-inner clearfix">
                    <div class="header-left">
                        <div class="logo-mobile">
                            <a href="${basePath}index.html">
                                <img src="${basePath}images/logo.png" alt="Agence de Gestion Foncière" />
                            </a>
                        </div>
                    </div>
                    <div class="header-right">
                        <div class="canvas-mobile">
                            <div class="canvas-menu gva-offcanvas">
                                <a class="dropdown-toggle" data-canvas=".mobile" href="#"><i class="fas fa-bars"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Desktop Header -->
        <div class="header_default_screen">
            <div class="header-builder-inner">
                <div class="header-main-wrapper">
                    <!-- Logo Section -->
                    <section class="elementor-section">
                        <div class="elementor-container">
                            <div class="gsc-logo text-center">
                                <a class="site-branding-logo" href="${basePath}index.html" title="Home">
                                    <img src="${basePath}images/logo.png" alt="Home" />
                                </a>
                            </div>
                        </div>
                    </section>

                    <!-- Navigation Section -->
                    <section class="elementor-section">
                        <div class="elementor-container">
                            <div class="gva-navigation-menu menu-align-left">
                                <ul class="gva-nav-menu gva-main-menu">
                                    <li class="menu-item"><a href="${basePath}index.html"><span class="menu-title">Accueil</span></a></li>
                                    <li class="menu-item"><a href="${basePath}pages/about.html"><span class="menu-title">A propos</span></a></li>
                                    <li class="menu-item menu-item-has-children">
                                        <a href="#"><span class="menu-title">Services</span><span class="caret"></span></a>
                                        <ul class="submenu-inner">
                                            <li><a href="${basePath}pages/amenagement-foncier.html"><span class="menu-title">Amenagement foncier</span></a></li>
                                            <li><a href="${basePath}pages/commercialisation-terrains.html"><span class="menu-title">Commercialisation terrains</span></a></li>
                                            <li><a href="${basePath}pages/reserves-foncieres.html"><span class="menu-title">Réserves foncières</span></a></li>
                                            <li><a href="${basePath}pages/securisation-fonciere.html"><span class="menu-title">Sécurisation foncière</span></a></li>
                                            <li><a href="${basePath}pages/ingenierie-fonciere.html"><span class="menu-title">Ingénierie foncière</span></a></li>
                                        </ul>
                                    </li>
                                    <li class="menu-item"><a href="${basePath}pages/vente-terrain.html"><span class="menu-title">Vente de Terrains</span></a></li>
                                    <li class="menu-item menu-item-has-children">
                                        <a href="#"><span class="menu-title">Procédures</span><span class="caret"></span></a>
                                        <ul class="submenu-inner">
                                            <li><a href="${basePath}pages/procedures-acd.html"><span class="menu-title">Procédures ACD</span></a></li>
                                            <li><a href="${basePath}pages/procedure-mutation.html"><span class="menu-title">Procédure mutation</span></a></li>
                                            <li><a href="${basePath}pages/lots-de-compensation.html"><span class="menu-title">Lots de compensation</span></a></li>
                                            <li><a href="${basePath}pages/attestation-fin-de-paiement.html"><span class="menu-title">Attestation fin de paiement</span></a></li>
                                        </ul>
                                    </li>
                                    <li class="menu-item menu-item-has-children">
                                        <a href="#"><span class="menu-title">Cadre juridique</span><span class="caret"></span></a>
                                        <ul class="submenu-inner">
                                            <li><a href="${basePath}pages/lois-et-ordonnances.html"><span class="menu-title">Lois et ordonnances</span></a></li>
                                            <li><a href="${basePath}pages/decrets.html"><span class="menu-title">Décrets</span></a></li>
                                            <li><a href="${basePath}pages/arretes.html"><span class="menu-title">Arrêtés</span></a></li>
                                        </ul>
                                    </li>
                                    <li class="menu-item"><a href="${basePath}pages/realisations.html"><span class="menu-title">Réalisations</span></a></li>
                                    <li class="menu-item"><a href="${basePath}pages/contact.html"><span class="menu-title">Contactez-nous</span></a></li>
                                </ul>
                            </div>

                            <!-- Social Icons -->
                            <div class="elementor-social-icons-wrapper">
                                <span class="elementor-grid-item">
                                    <a class="elementor-icon elementor-social-icon" href="https://www.facebook.com/225agef.ci" target="_blank" style="font-size: 16px;">
                                        <i class="fab fa-facebook"></i>
                                    </a>
                                </span>
                                <span class="elementor-grid-item">
                                    <a class="elementor-icon elementor-social-icon" href="https://www.linkedin.com/company/agef-agence-de-gestion-foncière-ci/" target="_blank" style="font-size: 16px;">
                                        <i class="fab fa-linkedin"></i>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </header>
    `;

    // 4. Define Footer Content
    const footerHTML = `
    <footer id="wp-footer" class="clearfix" style="background-color: #1a1a1a; color: white; padding: 60px 0 20px;">
        <div class="footer-main">
            <section class="elementor-section">
                <div class="elementor-container">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="gsc-logo">
                                <a href="${basePath}index.html">
                                    <img src="${basePath}images/logo.png" alt="Home" style="max-width: 150px;" />
                                </a>
                            </div>
                            <p style="margin-top: 20px;">Abidjan, Cocody II Plateau 7ieme tranche-Rue L169, B.P V 186</p>
                        </div>
                        <div class="col-md-3">
                            <h2 style="font-size: 1.5rem; margin-bottom: 20px;">Menu</h2>
                            <ul style="list-style: none; padding: 0;">
                                <li><a href="${basePath}index.html" style="color: #ccc; text-decoration: none;">Accueil</a></li>
                                <li><a href="${basePath}pages/about.html" style="color: #ccc; text-decoration: none;">A propos</a></li>
                                <li><a href="${basePath}pages/realisations.html" style="color: #ccc; text-decoration: none;">Réalisations</a></li>
                                <li><a href="${basePath}pages/procedures-acd.html" style="color: #ccc; text-decoration: none;">Procédures</a></li>
                            </ul>
                        </div>
                        <div class="col-md-3">
                            <h2 style="font-size: 1.5rem; margin-bottom: 20px;">Autres liens</h2>
                            <ul style="list-style: none; padding: 0;">
                                <li><a href="${basePath}pages/ingenierie-fonciere.html" style="color: #ccc; text-decoration: none;">Ingénierie foncière</a></li>
                                <li><a href="${basePath}pages/securisation-fonciere.html" style="color: #ccc; text-decoration: none;">Sécurisation foncière</a></li>
                                <li><a href="${basePath}pages/vente-terrain.html" style="color: #ccc; text-decoration: none;">Parcelles terrain disponibles</a></li>
                                <li><a href="${basePath}pages/procedures-acd.html" style="color: #ccc; text-decoration: none;">Procédures ACD</a></li>
                            </ul>
                        </div>
                        <div class="col-md-3">
                            <h2 style="font-size: 1.5rem; margin-bottom: 20px;">Contacts</h2>
                            <ul style="list-style: none; padding: 0;">
                                <li><a href="mailto:info@agef.ci" style="color: #ccc; text-decoration: none;"><i class="fas fa-envelope"></i> info@agef.ci</a></li>
                                <li><a href="tel:+2252722409700" style="color: #ccc; text-decoration: none;"><i class="fas fa-phone"></i> (+225) 27 22 40 97 00</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section class="elementor-section" style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #333;">
                <div class="elementor-container">
                    <div class="row">
                        <div class="col-md-6">
                            <div>© 2025 Copyrights par AGEF. Tous droits réservés</div>
                        </div>
                        <div class="col-md-6" style="text-align: right;">
                            <div class="elementor-social-icons-wrapper">
                                <a href="https://www.facebook.com/225agef.ci" target="_blank" style="color: white; margin-left: 10px;">
                                    <i class="fab fa-facebook"></i>
                                </a>
                                <a href="https://www.linkedin.com/company/agef-agence-de-gestion-foncière-ci/" target="_blank" style="color: white; margin-left: 10px;">
                                    <i class="fab fa-linkedin"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </footer>
    `;

    // 5. Inject Header
    const headerPlaceholder = document.querySelector('header') || document.querySelector('#header-placeholder');
    if (headerPlaceholder) {
        // If it's an existing header tag, replace it or its content?
        // Better to replace the whole element to ensure structure
        const div = document.createElement('div');
        div.innerHTML = headerHTML;
        headerPlaceholder.replaceWith(div.firstElementChild);
    } else {
        // If we use a placeholder div
        const ph = document.getElementById('header-placeholder');
        if (ph) {
            ph.innerHTML = headerHTML;
        }
    }

    // 6. Inject Footer
    const footerPlaceholder = document.querySelector('footer') || document.querySelector('#footer-placeholder');
    if (footerPlaceholder) {
        const div = document.createElement('div');
        div.innerHTML = footerHTML;
        footerPlaceholder.replaceWith(div.firstElementChild);
    }

    // 7. Inject Mobile Menu Offcanvas
    const mobileMenuHTML = `
    <div class="gva-offcanvas-content mobile">
        <div class="top-canvas">
            <div class="logo-mm">
                <a href="${basePath}index.html">
                    <img src="${basePath}images/logo.png" alt="Agence de Gestion Foncière" />
                </a>
            </div>
            <a class="control-close-mm" href="#"><i class="fas fa-times"></i></a>
        </div>
        <div id="gva-mobile-menu" class="navbar-collapse">
            <ul class="gva-nav-menu gva-mobile-menu">
                <li class="menu-item"><a href="${basePath}index.html"><span class="menu-title">Accueil</span></a></li>
                <li class="menu-item"><a href="${basePath}pages/about.html"><span class="menu-title">A propos</span></a></li>
                <li class="menu-item menu-item-has-children">
                    <a href="#"><span class="menu-title">Services</span></a>
                    <ul class="submenu-inner">
                        <li><a href="${basePath}pages/amenagement-foncier.html"><span class="menu-title">Amenagement foncier</span></a></li>
                        <li><a href="${basePath}pages/commercialisation-terrains.html"><span class="menu-title">Commercialisation terrains</span></a></li>
                        <li><a href="${basePath}pages/reserves-foncieres.html"><span class="menu-title">Réserves foncières</span></a></li>
                        <li><a href="${basePath}pages/securisation-fonciere.html"><span class="menu-title">Sécurisation foncière</span></a></li>
                        <li><a href="${basePath}pages/ingenierie-fonciere.html"><span class="menu-title">Ingénierie foncière</span></a></li>
                    </ul>
                </li>
                <li class="menu-item"><a href="${basePath}pages/vente-terrain.html"><span class="menu-title">Vente de Terrains</span></a></li>
                <li class="menu-item menu-item-has-children">
                    <a href="#"><span class="menu-title">Procédures</span></a>
                    <ul class="submenu-inner">
                        <li><a href="${basePath}pages/procedures-acd.html"><span class="menu-title">Procédures ACD</span></a></li>
                        <li><a href="${basePath}pages/procedure-mutation.html"><span class="menu-title">Procédure mutation</span></a></li>
                        <li><a href="${basePath}pages/lots-de-compensation.html"><span class="menu-title">Lots de compensation</span></a></li>
                        <li><a href="${basePath}pages/attestation-fin-de-paiement.html"><span class="menu-title">Attestation fin de paiement</span></a></li>
                    </ul>
                </li>
                <li class="menu-item menu-item-has-children">
                    <a href="#"><span class="menu-title">Cadre juridique</span></a>
                    <ul class="submenu-inner">
                        <li><a href="${basePath}pages/lois-et-ordonnances.html"><span class="menu-title">Lois et ordonnances</span></a></li>
                        <li><a href="${basePath}pages/decrets.html"><span class="menu-title">Décrets</span></a></li>
                        <li><a href="${basePath}pages/arretes.html"><span class="menu-title">Arrêtés</span></a></li>
                    </ul>
                </li>
                <li class="menu-item"><a href="${basePath}pages/realisations.html"><span class="menu-title">Réalisations</span></a></li>
                <li class="menu-item"><a href="${basePath}pages/contact.html"><span class="menu-title">Contactez-nous</span></a></li>
            </ul>
        </div>
    </div>
    <div id="gva-overlay"></div>
    `;

    // Append mobile menu and overlay to body
    const mobileMenuContainer = document.createElement('div');
    mobileMenuContainer.innerHTML = mobileMenuHTML;
    document.body.appendChild(mobileMenuContainer);

    // 8. Highlight Active Menu (Desktop & Mobile)
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const menuItems = document.querySelectorAll('.gva-main-menu > li > a, .gva-mobile-menu > li > a');

    menuItems.forEach(item => {
        const href = item.getAttribute('href');
        // Check if href ends with currentPath
        if (href && href.endsWith(currentPath)) {
            item.parentElement.classList.add('current-menu-item');
        } else {
            item.parentElement.classList.remove('current-menu-item');
        }
    });

});
