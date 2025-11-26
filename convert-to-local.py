#!/usr/bin/env python3
"""
Script to convert AGEF website HTML files to use local paths
"""

import os
import re
from pathlib import Path

# Define the base directory
BASE_DIR = Path('/Users/MAC/Documents/AGEF')
PAGES_DIR = BASE_DIR / 'pages'

# URL mapping: original URL -> local file path
URL_MAPPING = {
    'https://www.agef.ci/': 'index.html',
    'https://www.agef.ci': 'index.html',
    'https://www.agef.ci/about/': 'pages/about.html',
    'https://www.agef.ci/realisations/': 'pages/realisations.html',
    'https://www.agef.ci/contact/': 'pages/contact.html',
    'https://www.agef.ci/amenagement-foncier/': 'pages/amenagement-foncier.html',
    'https://www.agef.ci/commercialisation-terrains/': 'pages/commercialisation-terrains.html',
    'https://www.agef.ci/reserves-foncieres/': 'pages/reserves-foncieres.html',
    'https://www.agef.ci/securisation-fonciere/': 'pages/securisation-fonciere.html',
    'https://www.agef.ci/ingenierie-fonciere/': 'pages/ingenierie-fonciere.html',
    'https://www.agef.ci/procedures-acd/': 'pages/procedures-acd.html',
    'https://www.agef.ci/procedure-mutation/': 'pages/procedure-mutation.html',
    'https://www.agef.ci/lots-de-compensation/': 'pages/lots-de-compensation.html',
    'https://www.agef.ci/attestation-fin-de-paiement/': 'pages/attestation-fin-de-paiement.html',
    'https://www.agef.ci/lois-et-ordonnances/': 'pages/lois-et-ordonnances.html',
    'https://www.agef.ci/decrets/': 'pages/decrets.html',
    'https://www.agef.ci/arretes/': 'pages/arretes.html',
}

def convert_urls_to_local(html_content, is_subpage=False):
    """Convert all AGEF URLs to local paths"""
    
    # Determine the path prefix based on whether this is a subpage
    path_prefix = '../' if is_subpage else ''
    
    # Replace URLs in href attributes
    for original_url, local_path in URL_MAPPING.items():
        # For subpages, adjust the path
        adjusted_path = local_path if not is_subpage else f'../{local_path}'
        
        # Replace in href attributes
        html_content = html_content.replace(f'href="{original_url}"', f'href="{adjusted_path}"')
        html_content = html_content.replace(f"href='{original_url}'", f"href='{adjusted_path}'")
    
    # Convert asset URLs to local paths
    asset_replacements = {
        'https://www.agef.ci/wp-content/uploads/': f'{path_prefix}images/',
        'https://www.agef.ci/wp-content/plugins/': f'{path_prefix}css/',
        'https://www.agef.ci/wp-content/themes/paroti/assets/css/': f'{path_prefix}css/',
        'https://www.agef.ci/wp-content/themes/paroti/assets/js/': f'{path_prefix}js/',
        'https://www.agef.ci/wp-content/themes/paroti_child/': f'{path_prefix}css/',
        'https://www.agef.ci/wp-includes/js/': f'{path_prefix}js/',
        'https://www.agef.ci/wp-includes/css/': f'{path_prefix}css/',
    }
    
    for original, replacement in asset_replacements.items():
        html_content = html_content.replace(original, replacement)
    
    # Also handle escaped URLs in JSON (e.g., in data-settings attributes)
    # Replace escaped forward slashes in URLs
    escaped_replacements = {
        'https:\\/\\/www.agef.ci\\/wp-content\\/uploads\\/': f'{path_prefix}images/',
        'https:\\\\/\\\\/www.agef.ci\\\\/wp-content\\\\/uploads\\\\/': f'{path_prefix}images/',
    }
    
    for original, replacement in escaped_replacements.items():
        html_content = html_content.replace(original, replacement)
    
    return html_content

def process_html_file(file_path, is_subpage=False):
    """Process a single HTML file"""
    print(f"Processing: {file_path}")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Convert URLs
        content = convert_urls_to_local(content, is_subpage)
        
        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✓ Processed: {file_path}")
        return True
    except Exception as e:
        print(f"✗ Error processing {file_path}: {e}")
        return False

def main():
    print("=" * 60)
    print("AGEF Website - Converting URLs to Local Paths")
    print("=" * 60)
    
    # Process index.html
    print("\n1. Processing index.html...")
    index_file = BASE_DIR / 'index.html'
    if index_file.exists():
        process_html_file(index_file, is_subpage=False)
    
    # Process all pages in the pages directory
    print("\n2. Processing subpages...")
    if PAGES_DIR.exists():
        html_files = list(PAGES_DIR.glob('*.html'))
        print(f"Found {len(html_files)} HTML files in pages directory")
        
        for html_file in html_files:
            process_html_file(html_file, is_subpage=True)
    else:
        print("Pages directory not found!")
    
    print("\n" + "=" * 60)
    print("✓ Conversion complete!")
    print("=" * 60)
    print("\nYou can now browse the website locally:")
    print("- Open http://localhost:8080 in your browser")
    print("- All internal links will work locally")

if __name__ == '__main__':
    main()
