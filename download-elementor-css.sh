#!/bin/bash

echo "Downloading Elementor CSS files..."

# Create the directory structure
mkdir -p images/elementor/css

# Base URL for Elementor CSS files
BASE_URL="https://www.agef.ci/wp-content/uploads/elementor/css"

# List of CSS files to download
CSS_FILES=(
    "post-10.css"
    "post-1577.css"
    "post-1789.css"
    "post-1824.css"
    "post-2046.css"
    "post-2055.css"
    "post-2070.css"
    "post-2084.css"
    "post-2090.css"
    "post-2104.css"
    "post-2109.css"
    "post-2189.css"
    "post-22.css"
    "post-2413.css"
    "post-2431.css"
    "post-2438.css"
    "post-865.css"
    "post-866.css"
)

# Download each CSS file
for css_file in "${CSS_FILES[@]}"; do
    echo "Downloading $css_file..."
    curl -L "${BASE_URL}/${css_file}" -o "images/elementor/css/${css_file}"
done

echo ""
echo "✓ All Elementor CSS files downloaded successfully!"
echo "✓ Files saved to images/elementor/css/"
echo ""
ls -lh images/elementor/css/
