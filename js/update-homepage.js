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
    
    // Update recent essays from essays.json
    updateEssays();
    
    // Update recent books from books.json
    updateBooks();
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
 * Updates the books section by reading from books.json
 */
function updateBooks() {
    const container = document.querySelector('.recent-books .book-list');
    
    if (!container) {
        console.error('Books container not found');
        return;
    }
    
    console.log('Updating recent books from books.json');
    
    // Clear existing content
    container.innerHTML = '';
    
    // Load books from the JSON file
    fetch('books.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load books.json: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(books => {
            console.log(`Loaded ${books.length} books from books.json for homepage`);
            
            if (books.length === 0) {
                container.innerHTML = '<li>No recent books available.</li>';
                return;
            }
            
            // Display the most recent books (limit to 3)
            const limit = 3;
            books.slice(0, limit).forEach(book => {
                addContentItem(container, 'books', book);
            });
            
            console.log(`Added ${Math.min(books.length, limit)} books to home page`);
        })
        .catch(error => {
            console.error('Error loading books for homepage:', error);
            container.innerHTML = '<li class="error-message">Failed to load recent books.</li>';
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