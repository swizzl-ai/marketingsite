async function generateDirectoryList() {
    try {
        const response = await fetch('/api/site-structure');
        if (!response.ok) {
            throw new Error('Failed to fetch site structure');
        }
        const structure = await response.json();
        
        const directoryList = document.querySelector('.directory-list');
        if (!directoryList) return;

        // Clear existing content except the title
        const title = directoryList.querySelector('h1');
        directoryList.innerHTML = '';
        if (title) directoryList.appendChild(title);

        // Root HTML files section
        const rootSection = createSection('Root HTML Files');
        const rootFiles = structure.files.filter(file => file.endsWith('.html'));
        rootFiles.forEach(file => {
            addListItem(rootSection, file, '../' + file);
        });
        directoryList.appendChild(rootSection);

        // Folders section
        const foldersSection = createSection('Folders and Their Contents');
        Object.entries(structure.directories).forEach(([folderName, contents]) => {
            const folderGroup = document.createElement('div');
            folderGroup.className = 'folder-group';
            
            // Add folder link
            const folderItem = document.createElement('div');
            folderItem.className = 'list-item folder';
            const folderLink = document.createElement('a');
            folderLink.href = `../${folderName}`;
            folderLink.textContent = folderName;
            folderItem.appendChild(folderLink);
            folderGroup.appendChild(folderItem);

            // Add nested files
            if (contents.length > 0) {
                const nested = document.createElement('div');
                nested.className = 'nested';
                contents.forEach(file => {
                    if (file.endsWith('.html')) {
                        addListItem(nested, file, `../${folderName}/${file}`);
                    }
                });
                folderGroup.appendChild(nested);
            }

            foldersSection.appendChild(folderGroup);
        });
        directoryList.appendChild(foldersSection);
    } catch (error) {
        console.error('Error generating directory:', error);
    }
}

function createSection(title) {
    const section = document.createElement('div');
    section.className = 'section';
    const heading = document.createElement('h2');
    heading.textContent = title;
    section.appendChild(heading);
    return section;
}

function addListItem(parent, text, href) {
    const item = document.createElement('div');
    item.className = 'list-item file-item';
    const link = document.createElement('a');
    link.href = href;
    link.textContent = text;
    item.appendChild(link);
    parent.appendChild(item);
}

// Call the generator when the page loads
document.addEventListener('DOMContentLoaded', generateDirectoryList);
