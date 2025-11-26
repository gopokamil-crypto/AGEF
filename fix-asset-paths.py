#!/usr/bin/env python3
"""
Script to fix all asset paths in subpages to use correct relative paths
"""

import os
import re
from pathlib import Path

# Define the base directory
BASE_DIR = Path('/Users/MAC/Documents/AGEF')
PAGES_DIR = BASE_DIR / 'pages'

def fix_asset_paths(html_content):
    """Fix all asset paths to use ../ prefix for subpages"""
    
    # Fix CSS paths
    replacements = {
        # CSS files
        'href=\'css/': 'href=\'../css/',
        'href=\"css/': 'href=\"../css/',
        'href=\'../css/contact-form-7': 'href=\'../css/contact-form-7',
        'href=\"../css/contact-form-7': 'href=\"../css/contact-form-7',
        
        # Images
        'src=\'images/': 'src=\'../images/',
        'src=\"images/': 'src=\"../images/',
        'srcset=\"images/': 'srcset=\"../images/',
        
        # JavaScript
        'src=\'js/': 'src=\'../js/',
        'src=\"js/': 'src=\"../js/',
        
        # Fix any remaining wp-content paths that should be local
        'src=\"https://www.agef.ci/wp-content/uploads/': 'src=\"../images/',
        'src=\'https://www.agef.ci/wp-content/uploads/': 'src=\'../images/',
        'srcset=\"https://www.agef.ci/wp-content/uploads/': 'srcset=\"../images/',
        
        # Fix CSS links that might still point to live site
        'href=\"https://www.agef.ci/wp-content/themes/paroti/style.css': 'href=\"../css/paroti-style.css',
        'href=\'https://www.agef.ci/wp-content/themes/paroti/style.css': 'href=\'../css/paroti-style.css',
        'href=\"https://www.agef.ci/wp-content/themes/paroti_child/style.css': 'href=\"../css/paroti-child-style.css',
        'href=\'https://www.agef.ci/wp-content/themes/paroti_child/style.css': 'href=\'../css/paroti-child-style.css',
    }
    
    for old, new in replacements.items():
        html_content = html_content.replace(old, new)
    
    # Fix image paths in srcset attributes (multiple URLs)
    # Pattern: srcset="url1 size1, url2 size2, ..."
    def fix_srcset(match):
        srcset_content = match.group(1)
        # Replace all image URLs in srcset
        srcset_content = srcset_content.replace('https://www.agef.ci/wp-content/uploads/', '../images/')
        srcset_content = srcset_content.replace('images/', '../images/')
        return f'srcset="{srcset_content}"'
    
    html_content = re.sub(r'srcset="([^"]+)"', fix_srcset, html_content)
    
    return html_content

def process_page(file_path):
    """Process a single page file"""
    print(f"Processing: {file_path.name}")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Fix asset paths
        content = fix_asset_paths(content)
        
        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✓ Fixed: {file_path.name}")
        return True
    except Exception as e:
        print(f"✗ Error processing {file_path.name}: {e}")
        return False

def main():
    print("=" * 60)
    print("Fixing Asset Paths in All Subpages")
    print("=" * 60)
    
    if not PAGES_DIR.exists():
        print("Pages directory not found!")
        return
    
    html_files = list(PAGES_DIR.glob('*.html'))
    print(f"\nFound {len(html_files)} HTML files\n")
    
    success_count = 0
    for html_file in html_files:
        if process_page(html_file):
            success_count += 1
    
    print("\n" + "=" * 60)
    print(f"✓ Successfully fixed {success_count}/{len(html_files)} pages")
    print("=" * 60)
    print("\nAll pages now have correct paths for:")
    print("- Logo images")
    print("- CSS files")
    print("- JavaScript files")
    print("- Content images")
    print("\nYou can now browse the website at http://localhost:8080")

if __name__ == '__main__':
    main()
