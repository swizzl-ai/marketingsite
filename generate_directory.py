import os
import json
from datetime import datetime

def get_site_structure(base_dir):
    structure = {
        'files': [],
        'directories': {}
    }
    
    # Get root files
    for item in os.listdir(base_dir):
        if os.path.isfile(os.path.join(base_dir, item)) and item.endswith('.html'):
            structure['files'].append(item)
    
    # Get directory contents
    for item in os.listdir(base_dir):
        item_path = os.path.join(base_dir, item)
        if os.path.isdir(item_path) and not item.startswith('.'):
            structure['directories'][item] = []
            for root, _, files in os.walk(item_path):
                rel_path = os.path.relpath(root, item_path)
                for file in files:
                    if file.endswith('.html'):
                        file_path = os.path.join(rel_path, file)
                        if rel_path == '.':
                            structure['directories'][item].append(file)
                        else:
                            structure['directories'][item].append(file_path)

    return structure

def generate_html(structure):
    html_template = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Site Directory</title>
    <link rel="stylesheet" href="../styles.css">
    <style>
        .directory-list {{
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }}
        .section {{
            margin-bottom: 30px;
        }}
        .section h2 {{
            color: #333;
            border-bottom: 2px solid #eee;
            padding-bottom: 10px;
        }}
        .list-item {{
            padding: 8px 0;
        }}
        .list-item a {{
            color: #0066cc;
            text-decoration: none;
        }}
        .list-item a:hover {{
            text-decoration: underline;
        }}
        .folder {{
            color: #666;
            font-weight: bold;
        }}
        .nested {{
            margin-left: 20px;
            border-left: 2px solid #eee;
            padding-left: 15px;
        }}
        .file-item {{
            color: #444;
            font-size: 0.95em;
        }}
        #loginForm {{
            max-width: 300px;
            margin: 100px auto;
            padding: 20px;
            text-align: center;
            display: none;
        }}
        #loginForm input {{
            width: 100%;
            padding: 8px;
            margin: 10px 0;
        }}
        #loginForm button {{
            width: 100%;
            padding: 10px;
            background: #0066cc;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }}
        #loginForm button:hover {{
            background: #0052a3;
        }}
        #protectedContent {{
            display: none;
        }}
        .last-updated {{
            text-align: center;
            color: #666;
            font-size: 0.9em;
            margin-top: 40px;
        }}
        .search-container {{
            margin-bottom: 20px;
        }}
        .search-container input {{
            width: 100%;
            padding: 10px;
            font-size: 1em;
        }}
    </style>
</head>
<body>
    <div id="loginForm">
        <h2>Password Required</h2>
        <input type="password" id="passwordInput" placeholder="Enter password">
        <button onclick="checkPassword()">Submit</button>
    </div>

    <div id="protectedContent">
        <div class="directory-list">
            <h1>Site Directory</h1>
            
            <div class="search-container">
                <input type="text" id="searchInput" placeholder="Search pages..." oninput="filterDirectory()">
            </div>

            <div class="section">
                <h2>Root HTML Files</h2>
                {root_files}
            </div>

            <div class="section">
                <h2>Folders and Their Contents</h2>
                {folders}
            </div>

            <p class="last-updated">Last updated: {timestamp}</p>
        </div>
    </div>

    <script>
        const correctPassword = "swizzrizz";
        
        function checkPassword() {{
            const password = document.getElementById('passwordInput').value;
            if (password === correctPassword) {{
                localStorage.setItem('authenticated', 'true');
                document.getElementById('loginForm').style.display = 'none';
                document.getElementById('protectedContent').style.display = 'block';
            }} else {{
                alert('Incorrect password');
            }}
        }}

        function onload() {{
            if (localStorage.getItem('authenticated') === 'true') {{
                document.getElementById('loginForm').style.display = 'none';
                document.getElementById('protectedContent').style.display = 'block';
            }} else {{
                document.getElementById('loginForm').style.display = 'block';
                document.getElementById('protectedContent').style.display = 'none';
            }}
        }}

        function filterDirectory() {{
            const searchText = document.getElementById('searchInput').value.toLowerCase();
            const fileItems = document.querySelectorAll('.file-item');
            const folderGroups = document.querySelectorAll('.folder-group');
            const sections = document.querySelectorAll('.section');
            
            // First, handle file items
            fileItems.forEach(item => {{
                const link = item.querySelector('a');
                const text = link.textContent.toLowerCase();
                const matches = text.includes(searchText);
                item.style.display = matches ? '' : 'none';
            }});
            
            // Then handle folder groups
            folderGroups.forEach(group => {{
                const folderItem = group.querySelector('.folder');
                const nestedDiv = group.querySelector('.nested');
                const folderName = folderItem.textContent.toLowerCase();
                const folderMatches = folderName.includes(searchText);
                
                // Check if any nested items are visible
                let hasVisibleNestedItems = false;
                if (nestedDiv) {{
                    const nestedItems = nestedDiv.querySelectorAll('.file-item');
                    hasVisibleNestedItems = Array.from(nestedItems).some(item => item.style.display !== 'none');
                }}
                
                // Show folder group if folder name matches or has visible nested items
                group.style.display = (folderMatches || hasVisibleNestedItems) ? '' : 'none';
                folderItem.style.display = ''; // Always show folder name if group is visible
            }});
            
            // Finally, handle sections
            sections.forEach(section => {{
                const items = section.querySelectorAll('.file-item, .folder-group');
                const hasVisibleItems = Array.from(items).some(item => item.style.display !== 'none');
                section.style.display = hasVisibleItems ? '' : 'none';
            }});
        }}
        
        onload();
    </script>
</body>
</html>
'''

    # Generate root files HTML
    root_files_html = []
    for file in sorted(structure['files']):
        root_files_html.append(f'<div class="list-item file-item"><a href="../{file}">{file}</a></div>')
    
    # Generate folders HTML
    folders_html = []
    for folder in sorted(structure['directories'].keys()):
        folder_html = [
            f'<div class="folder-group">',
            f'    <div class="list-item folder"><a href="../{folder}">{folder}</a></div>'
        ]
        
        if structure['directories'][folder]:
            folder_html.append('    <div class="nested">')
            for file in sorted(structure['directories'][folder]):
                folder_html.append(f'        <div class="list-item file-item"><a href="../{folder}/{file}">{file}</a></div>')
            folder_html.append('    </div>')
        
        folder_html.append('</div>')
        folders_html.extend(folder_html)
    
    # Get current timestamp
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    # Replace placeholders in template
    html_content = html_template.format(
        root_files='\n                '.join(root_files_html),
        folders='\n                '.join(folders_html),
        timestamp=timestamp
    )
    
    return html_content

if __name__ == '__main__':
    base_dir = os.path.dirname(os.path.abspath(__file__))
    structure = get_site_structure(base_dir)
    html_content = generate_html(structure)
    
    # Write to index.html
    output_path = os.path.join(base_dir, 'all', 'index.html')
    with open(output_path, 'w') as f:
        f.write(html_content)
    
    print(f"Directory index has been generated at: {output_path}")
