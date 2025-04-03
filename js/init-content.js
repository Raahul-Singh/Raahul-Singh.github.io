/**
 * init-content.js
 * Runs server-side scripts to generate content JSON files if needed
 * 
 * Note: This is a client-side script that provides warnings if JSON files are missing
 * The actual generation must happen server-side through CI/CD or manual processes
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Checking content JSON files...');
    
    // Check if essays.json exists
    fetch('essays.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load essays.json: ${response.status}`);
            }
            console.log('essays.json loaded successfully');
            return response.json();
        })
        .then(data => {
            console.log(`Found ${data.length} essays in essays.json`);
        })
        .catch(error => {
            console.warn('essays.json not found or invalid:', error.message);
            console.warn('Run node generate-essays-json.js to create it');
            showJsonWarning('essays');
        });
    
    // Check if books.json exists
    fetch('books.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load books.json: ${response.status}`);
            }
            console.log('books.json loaded successfully');
            return response.json();
        })
        .then(data => {
            console.log(`Found ${data.length} books in books.json`);
        })
        .catch(error => {
            console.warn('books.json not found or invalid:', error.message);
            console.warn('Run node generate-books-json.js to create it');
            showJsonWarning('books');
        });
    
    /**
     * Shows a warning on the page if JSON files are missing
     * @param {string} contentType - 'essays' or 'books'
     */
    function showJsonWarning(contentType) {
        // Only show warnings for the relevant page
        const warningPages = {
            'essays': ['index.html', 'essays.html'],
            'books': ['index.html', 'books.html']
        };
        
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        if (!warningPages[contentType].includes(currentPage)) {
            return;
        }
        
        const warningDiv = document.createElement('div');
        warningDiv.className = 'json-warning';
        warningDiv.style.cssText = 'background:#ffe0e0; color:#d00; padding:10px; margin:10px 0; border-radius:4px; font-size:14px;';
        warningDiv.innerHTML = `<strong>Warning:</strong> ${contentType}.json file not found. Content may not display correctly.<br>
                               To fix this, run <code>node generate-${contentType}-json.js</code> to generate the JSON file.`;
        
        // Insert at the top of the main content area
        const main = document.querySelector('main');
        if (main && main.firstChild) {
            main.insertBefore(warningDiv, main.firstChild);
        }
    }
}); 