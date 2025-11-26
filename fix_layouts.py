import os
import re
from pathlib import Path

# Define paths
BASE_DIR = Path('/Users/MAC/Documents/AGEF')
PAGES_DIR = BASE_DIR / 'pages'
PAGES_BACKUP_DIR = BASE_DIR / 'pages_backup'
INDEX_FILE = BASE_DIR / 'index.html'

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def extract_templates(index_content):
    """Extract head, header, and footer templates from index.html"""
    
    # Extract Head
    head_match = re.search(r'(<!DOCTYPE html>.*?</head>)', index_content, re.DOTALL)
    if not head_match:
        raise Exception("Could not find HEAD in index.html")
    head_template = head_match.group(1)
    
    # Extract Header (from body start to page-content start)
    header_match = re.search(r'(<body.*?)<div id="page-content">', index_content, re.DOTALL)
    if not header_match:
        raise Exception("Could not find HEADER in index.html")
    header_template = header_match.group(1)
    
    # Extract Footer (from page-content end to file end)
    # We look for the closing div of page-content, then the footer comment
    footer_match = re.search(r'(<!-- Footer -->.*</html>)', index_content, re.DOTALL)
    if not footer_match:
        raise Exception("Could not find FOOTER in index.html")
    footer_template = footer_match.group(1)
    
    return head_template, header_template, footer_template

def fix_paths(content):
    """Add ../ to relative paths for subpages"""
    # Fix CSS links
    content = content.replace('href="css/', 'href="../css/')
    content = content.replace("href='css/", "href='../css/")
    
    # Fix JS scripts
    content = content.replace('src="js/', 'src="../js/')
    content = content.replace("src='js/", "src='../js/")
    
    # Fix Images
    content = content.replace('src="images/', 'src="../images/')
    content = content.replace("src='images/", "src='../images/")
    content = content.replace('href="images/', 'href="../images/')
    
    # Fix Links
    content = content.replace('href="index.html"', 'href="../index.html"')
    content = content.replace('href="pages/', 'href="../pages/')
    
    return content

def extract_page_content(page_content):
    """Extract the main content from a subpage"""
    # Try to find content inside <div id="page-content"> ... </div>
    # We need to be careful to match the closing div correctly.
    # Since we know the structure, we can look for the start and the footer start
    
    start_marker = '<div id="page-content">'
    end_marker = '<footer id="wp-footer"'
    
    start_pos = page_content.find(start_marker)
    end_pos = page_content.find(end_marker)
    
    if start_pos == -1 or end_pos == -1:
        print("Warning: Could not find standard content markers. Trying fallback.")
        # Fallback: try to find the elementor section
        start_pos = page_content.find('<section id="wp-main-content"')
        if start_pos != -1:
             # Just take everything from there until the footer
             return '<div id="page-content">' + page_content[start_pos:end_pos] + '</div>'
        return None
    
    # Extract content including the wrapper div
    # We need to find the last </div> before the footer
    content_area = page_content[start_pos:end_pos]
    
    # Clean up: remove the last closing div if it belongs to wrapper-page (which is outside page-content in index.html)
    # Actually, in the subpages, the structure might be different.
    # Let's just grab the content inside page-content.
    
    inner_start = start_pos + len(start_marker)
    # Find the last </div> before end_pos
    last_div = content_area.rfind('</div>')
    
    # Return the content wrapped in the div
    return content_area[:last_div] + '</div>'

def extract_page_title(page_content):
    """Extract the title from the page"""
    match = re.search(r'<title>(.*?)</title>', page_content)
    if match:
        return match.group(1)
    return "Agence de Gestion Foncière"

def extract_page_css(page_content):
    """Find all page-specific Elementor CSS files"""
    # Look for all post-XXXX.css
    matches = re.findall(r'href=[\'"]\.\./images/elementor/css/(post-\d+\.css)', page_content)
    if matches:
        print(f"  Found CSS matches: {matches}")
    # Return unique matches
    return list(set(matches))

def main():
    print("Starting layout fix for all subpages...")
    
    # 1. Get templates from index.html
    index_content = read_file(INDEX_FILE)
    head_tpl, header_tpl, footer_tpl = extract_templates(index_content)
    
    # Prepare templates for subpages (fix paths)
    head_tpl = fix_paths(head_tpl)
    header_tpl = fix_paths(header_tpl)
    footer_tpl = fix_paths(footer_tpl)
    
    # 2. Process each page from BACKUP
    if not PAGES_BACKUP_DIR.exists():
        print(f"Error: {PAGES_BACKUP_DIR} does not exist!")
        return

    for page_file in PAGES_BACKUP_DIR.glob('*.html'):
        print(f"Processing {page_file.name}...")
        
        page_content = read_file(page_file)
        
        # Extract unique content
        unique_content = extract_page_content(page_content)
        if not unique_content:
            print(f"  Skipping {page_file.name}: Could not extract content")
            continue
            
        # Extract page specific CSS
        page_css_files = extract_page_css(page_content)
        
        # Extract Title
        page_title = extract_page_title(page_content)
        
        # Modify Head to include page CSS and Title
        current_head = head_tpl
        # Replace Title
        current_head = re.sub(r'<title>.*?</title>', f'<title>{page_title}</title>', current_head)
        
        for css_file in page_css_files:
            # Skip if already in head (check both local and ../ paths just in case)
            if css_file in current_head or f"css/{css_file}" in current_head:
                continue
                
            css_link = f'<link rel="stylesheet" href="../images/elementor/css/{css_file}" type="text/css" media="all" />'
            current_head = current_head.replace('</head>', f'    {css_link}\n</head>')
            print(f"  Added CSS: {css_file}")
        
        # Construct new page
        new_content = f"{current_head}\n{header_tpl}\n{unique_content}\n{footer_tpl}"
        
        # Write back to PAGES_DIR
        target_file = PAGES_DIR / page_file.name
        write_file(target_file, new_content)
        print(f"  Fixed layout for {page_file.name}")

    print("All pages processed!")

if __name__ == '__main__':
    main()
