#!/bin/bash

echo "Downloading missing images from AGEF website..."

# Create the directory structure
mkdir -p images/2025/03

# Download the specific images referenced in the pages
echo "Downloading logo and images..."

# Logo image
curl -L "https://www.agef.ci/wp-content/uploads/2025/03/40B-66D07480-B3-6F839900.png" -o images/2025/03/40B-66D07480-B3-6F839900.png

# AGEF logo
curl -L "https://www.agef.ci/wp-content/uploads/2025/03/LOGO-AGEF_VRAI-05.jpg" -o images/2025/03/LOGO-AGEF_VRAI-05.jpg

# Favicon images
curl -L "https://www.agef.ci/wp-content/uploads/2025/03/cropped-LOGO-AGEF_VRAI-09-32x32.jpg" -o images/2025/03/cropped-LOGO-AGEF_VRAI-09-32x32.jpg
curl -L "https://www.agef.ci/wp-content/uploads/2025/03/cropped-LOGO-AGEF_VRAI-09-192x192.jpg" -o images/2025/03/cropped-LOGO-AGEF_VRAI-09-192x192.jpg
curl -L "https://www.agef.ci/wp-content/uploads/2025/03/cropped-LOGO-AGEF_VRAI-09-180x180.jpg" -o images/2025/03/cropped-LOGO-AGEF_VRAI-09-180x180.jpg
curl -L "https://www.agef.ci/wp-content/uploads/2025/03/cropped-LOGO-AGEF_VRAI-09-270x270.jpg" -o images/2025/03/cropped-LOGO-AGEF_VRAI-09-270x270.jpg

# Content images
curl -L "https://www.agef.ci/wp-content/uploads/2025/03/1.jpg" -o images/2025/03/1.jpg
curl -L "https://www.agef.ci/wp-content/uploads/2025/03/1-600x400.jpg" -o images/2025/03/1-600x400.jpg
curl -L "https://www.agef.ci/wp-content/uploads/2025/03/1-1024x682.jpg" -o images/2025/03/1-1024x682.jpg
curl -L "https://www.agef.ci/wp-content/uploads/2025/03/1-768x512.jpg" -o images/2025/03/1-768x512.jpg

# Songon terrain image
curl -L "https://www.agef.ci/wp-content/uploads/2025/03/PUB-TERRAIN-SONGON.jpg" -o images/2025/03/PUB-TERRAIN-SONGON.jpg
curl -L "https://www.agef.ci/wp-content/uploads/2025/03/PUB-TERRAIN-SONGON-1024x726.jpg" -o images/2025/03/PUB-TERRAIN-SONGON-1024x726.jpg
curl -L "https://www.agef.ci/wp-content/uploads/2025/03/PUB-TERRAIN-SONGON-600x426.jpg" -o images/2025/03/PUB-TERRAIN-SONGON-600x426.jpg
curl -L "https://www.agef.ci/wp-content/uploads/2025/03/PUB-TERRAIN-SONGON-768x545.jpg" -o images/2025/03/PUB-TERRAIN-SONGON-768x545.jpg

# Background images for hero sections
curl -L "https://www.agef.ci/wp-content/uploads/2025/03/bienvenue-11.jpg" -o images/2025/03/bienvenue-11.jpg
curl -L "https://www.agef.ci/wp-content/uploads/2025/03/bienvenue-5.jpg" -o images/2025/03/bienvenue-5.jpg

echo ""
echo "✓ All images downloaded successfully!"
echo "✓ Images saved to images/2025/03/"
echo ""
ls -lh images/2025/03/
