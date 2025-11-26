#!/bin/bash

# Create directories for assets
mkdir -p css js images fonts

# Download main CSS files
curl -o css/styles.css "https://www.agef.ci/wp-content/plugins/contact-form-7/includes/css/styles.css?ver=6.0.6"
curl -o css/frontend.min.css "https://www.agef.ci/wp-content/plugins/elementor/assets/css/frontend.min.css?ver=3.29.0"
curl -o css/bootstrap.css "https://www.agef.ci/wp-content/themes/paroti/assets/css/bootstrap.css?ver=1.0.3"
curl -o css/template.css "https://www.agef.ci/wp-content/themes/paroti/assets/css/template.css?ver=1.0.3"
curl -o css/paroti-style.css "https://www.agef.ci/wp-content/themes/paroti/style.css?ver=6.8.2"
curl -o css/paroti-child-style.css "https://www.agef.ci/wp-content/themes/paroti_child/style.css?ver=6.8.2"
curl -o css/smartslider.min.css "https://www.agef.ci/wp-content/plugins/smart-slider-3/Public/SmartSlider3/Application/Frontend/Assets/dist/smartslider.min.css"
curl -o css/all.min.css "https://www.agef.ci/wp-content/themes/paroti/assets/css/fontawesome/css/all.min.css?ver=6.8.2"
curl -o css/line-awesome.min.css "https://www.agef.ci/wp-content/themes/paroti/assets/css/line-awesome/css/line-awesome.min.css?ver=6.8.2"

# Download Elementor CSS files
curl -o css/post-10.css "https://www.agef.ci/wp-content/uploads/elementor/css/post-10.css"
curl -o css/post-1566.css "https://www.agef.ci/wp-content/uploads/elementor/css/post-1566.css"
curl -o css/post-865.css "https://www.agef.ci/wp-content/uploads/elementor/css/post-865.css"
curl -o css/post-866.css "https://www.agef.ci/wp-content/uploads/elementor/css/post-866.css"

# Download main JavaScript files
curl -o js/jquery.min.js "https://www.agef.ci/wp-includes/js/jquery/jquery.min.js?ver=3.7.1"
curl -o js/bootstrap.min.js "https://www.agef.ci/wp-content/themes/paroti/assets/js/bootstrap.min.js?ver=6.8.2"
curl -o js/main.js "https://www.agef.ci/wp-content/themes/paroti/assets/js/main.js?ver=6.8.2"
curl -o js/frontend.min.js "https://www.agef.ci/wp-content/plugins/elementor/assets/js/frontend.min.js?ver=3.29.0"

# Download logo
curl -o images/logo.png "https://www.agef.ci/wp-content/uploads/2025/03/40B-66D07480-B3-6F839900.png"

# Download slider images
curl -o images/IMAGE-1-scaled.png "https://www.agef.ci/wp-content/uploads/2025/07/IMAGE-1-scaled.png"
curl -o images/IMAGE-2-scaled.png "https://www.agef.ci/wp-content/uploads/2025/07/IMAGE-2-scaled.png"
curl -o images/IMAGE-3-scaled.png "https://www.agef.ci/wp-content/uploads/2025/07/INVESTIR-DANS-LE-FONCIER-CEST-FRUCTIFIER-SES-BIENS-1-3-scaled.png"
curl -o images/IMAGE-4-scaled.png "https://www.agef.ci/wp-content/uploads/2025/07/INVESTIR-DANS-LE-FONCIER-CEST-FRUCTIFIER-SES-BIENS-1-5-scaled.png"
curl -o images/IMAGE-5-scaled.png "https://www.agef.ci/wp-content/uploads/2025/07/INVESTIR-DANS-LE-FONCIER-CEST-FRUCTIFIER-SES-BIENS-1-6-scaled.png"

# Download main image
curl -o images/directrice.jpg "https://www.agef.ci/wp-content/uploads/2025/03/shoot0243-scaled.jpg"
curl -o images/about-image.jpeg "https://www.agef.ci/wp-content/uploads/2025/05/WhatsApp-Image-2025-05-21-at-11.28.02-1024x768.jpeg"

echo "Download complete!"
