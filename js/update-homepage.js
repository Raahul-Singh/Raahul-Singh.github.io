/**
 * Auto-updates the recent books and essays sections on the home page
 * based on the available markdown files in the respective directories.
 */

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Update homepage: Initializing...');
    updateRecentContent();
});

// Main function to update both books and essays
function updateRecentContent() {
    console.log('Updating recent content on homepage...');
    
    // Update recent essays by scanning the essays directory
    updateEssays();
    
    // Update recent books with known files (most recent first)
    updateWithKnownFiles('books', [
        { id: 'thinking-fast-and-slow', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', date: '2023-02-15', cover_image: 'https://m.media-amazon.com/images/I/61fdrEuPJwL._SL1200_.jpg' },
        { id: 'sample-nonfiction-book', title: 'Sample Non-Fiction Book', author: 'Author Name', date: '2023-01-01', cover_image: 'https://via.placeholder.com/300x450/e0f0ff/333333?text=Sample+Non-Fiction+Book' },
        { id: 'sample-book', title: 'Sample Book', author: 'Author Name', date: '2023-01-01', cover_image: 'https://via.placeholder.com/300x450/f5f5f5/333333?text=Sample+Book' }
    ]);
}

/**
 * Updates the essays section by reading from essays.json
 */
function updateEssays() {
    const container = document.querySelector('.recent-essays .essay-list');
    
    if (!container) {
        console.error('Essays container not found');
        return;
    }
    
    console.log('Updating recent essays from essays.json');
    
    // Clear existing content
    container.innerHTML = '';
    
    // Load essays from the JSON file
    fetch('essays.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load essays.json: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(essays => {
            console.log(`Loaded ${essays.length} essays from essays.json for homepage`);
            
            if (essays.length === 0) {
                container.innerHTML = '<li>No recent essays available.</li>';
                return;
            }
            
            // Display the most recent essays (limit to 3)
            const limit = 3;
            essays.slice(0, limit).forEach(essay => {
                addContentItem(container, 'essays', essay);
            });
            
            console.log(`Added ${Math.min(essays.length, limit)} essays to home page`);
        })
        .catch(error => {
            console.error('Error loading essays for homepage:', error);
            container.innerHTML = '<li class="error-message">Failed to load recent essays.</li>';
        });
}

/**
 * Updates a content section with known files
 * @param {string} contentType - 'books' or 'essays'
 * @param {Array} knownFiles - Array of file metadata objects
 * @param {number} limit - Maximum number of items to display (default: 3)
 */
function updateWithKnownFiles(contentType, knownFiles, limit = 3) {
    const containerSelector = contentType === 'books' ? '.recent-books .book-list' : '.recent-essays .essay-list';
    const container = document.querySelector(containerSelector);
    
    if (!container) {
        console.error(`Container ${containerSelector} not found`);
        return;
    }
    
    console.log(`Found container for ${contentType}: ${containerSelector}`);
    
    // Clear existing content
    container.innerHTML = '';
    
    // Add each known file, up to the limit
    knownFiles.slice(0, limit).forEach(item => {
        addContentItem(container, contentType, item);
    });
    
    console.log(`Added ${Math.min(knownFiles.length, limit)} ${contentType} to home page`);
}

/**
 * Adds a content item to the container
 */
function addContentItem(container, contentType, item) {
    const li = document.createElement('li');
    
    // Create link with appropriate data attribute
    const a = document.createElement('a');
    a.href = contentType === 'books' ? 'book-template.html' : 'essay-template.html';
    a.className = contentType === 'books' ? 'book-link' : 'essay-link';
    a.setAttribute(`data-${contentType === 'books' ? 'book' : 'essay'}`, item.id);
    
    // Add appropriate content based on content type
    if (contentType === 'books') {
        // For books: title, author, date
        if (item.cover_image) {
            const img = document.createElement('img');
            img.className = 'book-thumbnail';
            img.src = item.cover_image;
            img.alt = `Cover of ${item.title || 'book'}`;
            a.appendChild(img);
            
            // Create content div for text
            const contentDiv = document.createElement('div');
            contentDiv.className = 'book-list-content';
            
            const titleSpan = document.createElement('span');
            titleSpan.className = 'book-title';
            titleSpan.textContent = item.title || 'Untitled Book';
            contentDiv.appendChild(titleSpan);
            
            if (item.author) {
                const authorSpan = document.createElement('span');
                authorSpan.className = 'book-author';
                authorSpan.textContent = `by ${item.author}`;
                contentDiv.appendChild(authorSpan);
            }
            
            if (item.date) {
                const timeElem = document.createElement('time');
                const date = new Date(item.date);
                timeElem.setAttribute('datetime', item.date);
                timeElem.textContent = date.toLocaleDateString('en-US', { 
                    year: 'numeric', month: 'long', day: 'numeric' 
                });
                contentDiv.appendChild(timeElem);
            }
            
            a.appendChild(contentDiv);
        } else {
            // Fallback without image
            const titleSpan = document.createElement('span');
            titleSpan.className = 'book-title';
            titleSpan.textContent = item.title || 'Untitled Book';
            a.appendChild(titleSpan);
            
            if (item.author) {
                const authorSpan = document.createElement('span');
                authorSpan.className = 'book-author';
                authorSpan.textContent = `by ${item.author}`;
                a.appendChild(authorSpan);
            }
            
            if (item.date) {
                const timeElem = document.createElement('time');
                const date = new Date(item.date);
                timeElem.setAttribute('datetime', item.date);
                timeElem.textContent = date.toLocaleDateString('en-US', { 
                    year: 'numeric', month: 'long', day: 'numeric' 
                });
                a.appendChild(timeElem);
            }
        }
    } else {
        // For essays: title, date
        const titleSpan = document.createElement('span');
        titleSpan.className = 'essay-title';
        titleSpan.textContent = item.title || 'Untitled Essay';
        a.appendChild(titleSpan);
        
        if (item.date) {
            const timeElem = document.createElement('time');
            const date = new Date(item.date);
            timeElem.setAttribute('datetime', item.date);
            timeElem.textContent = date.toLocaleDateString('en-US', { 
                year: 'numeric', month: 'long', day: 'numeric' 
            });
            a.appendChild(timeElem);
        }
    }
    
    // No need to add event listeners here since they're handled globally in main.js
    
    li.appendChild(a);
    container.appendChild(li);
} 