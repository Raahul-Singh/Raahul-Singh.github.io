/**
 * Auto-updates the recent books and essays sections on the home page
 * based on the available markdown files in the respective directories.
 */

document.addEventListener('DOMContentLoaded', function() {
    updateRecentContent();
});

// Main function to update both books and essays
function updateRecentContent() {
    // Update recent essays with known files (most recent first)
    updateWithKnownFiles('essays', [
        { id: 'sample-philosophy-essay', title: 'Sample Philosophy Essay', date: '2023-03-01' },
        { id: 'sample-tech-essay', title: 'Sample Technology Essay', date: '2023-02-01' },
        { id: 'sample-essay', title: 'Sample Mathematics Essay', date: '2023-01-01' }
    ]);
    
    // Update recent books with known files (most recent first)
    updateWithKnownFiles('books', [
        { id: 'thinking-fast-and-slow', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', date: '2023-02-15', cover_image: 'https://m.media-amazon.com/images/I/61fdrEuPJwL._SL1200_.jpg' },
        { id: 'sample-nonfiction-book', title: 'Sample Non-Fiction Book', author: 'Author Name', date: '2023-01-01', cover_image: 'https://via.placeholder.com/300x450/e0f0ff/333333?text=Sample+Non-Fiction+Book' },
        { id: 'sample-book', title: 'Sample Book', author: 'Author Name', date: '2023-01-01', cover_image: 'https://via.placeholder.com/300x450/f5f5f5/333333?text=Sample+Book' }
    ]);
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
    
    // Clear existing content
    container.innerHTML = '';
    
    // Add each known file, up to the limit
    knownFiles.slice(0, limit).forEach(item => {
        addContentItem(container, contentType, item);
    });
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