/**
 * Dynamically loads and displays books from markdown files.
 * This script categorizes books and renders them.
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Loading books...');
    loadBooks();
});

// Book data structure - maps to actual markdown files
const books = [
    { 
        id: 'thinking-fast-and-slow', 
        title: 'Thinking, Fast and Slow',
        author: 'Daniel Kahneman',
        date: '2023-02-15',
        category: 'Non-Fiction',
        cover_image: 'https://m.media-amazon.com/images/I/61fdrEuPJwL._SL1200_.jpg'
    },
    { 
        id: 'sample-nonfiction-book', 
        title: 'Sample Non-Fiction Book',
        author: 'Author Name',
        date: '2023-01-01',
        category: 'Non-Fiction',
        cover_image: 'https://via.placeholder.com/300x450/e0f0ff/333333?text=Sample+Non-Fiction+Book'
    },
    { 
        id: 'sample-book', 
        title: 'Sample Book',
        author: 'Author Name',
        date: '2023-01-01',
        category: 'Fiction',
        cover_image: 'https://via.placeholder.com/300x450/f5f5f5/333333?text=Sample+Book'
    }
];

/**
 * Main function to load and display books
 */
function loadBooks() {
    const container = document.querySelector('main article');
    if (!container) {
        console.error('Book container not found');
        return;
    }

    // Remove existing hardcoded sections
    const existingSections = container.querySelectorAll('.book-category');
    existingSections.forEach(section => section.remove());
    
    // Get existing heading and intro paragraph
    const heading = container.querySelector('h1');
    const intro = heading ? heading.nextElementSibling : null;
    
    // Group books by category
    const categories = {};
    
    books.forEach(book => {
        const category = book.category || 'Uncategorized';
        if (!categories[category]) {
            categories[category] = [];
        }
        categories[category].push(book);
    });
    
    // Sort categories alphabetically
    const sortedCategories = Object.keys(categories).sort();
    
    // Create and append sections for each category
    sortedCategories.forEach(category => {
        const section = document.createElement('section');
        section.className = 'book-category';
        
        const h2 = document.createElement('h2');
        h2.textContent = category;
        section.appendChild(h2);
        
        const ul = document.createElement('ul');
        ul.className = 'book-list';
        
        // Sort books within this category by date (newest first)
        categories[category]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .forEach(book => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = 'book-template.html';
                a.className = 'book-link';
                a.setAttribute('data-book', book.id);
                
                // Cover image
                if (book.cover_image) {
                    const img = document.createElement('img');
                    img.className = 'book-thumbnail';
                    img.src = book.cover_image;
                    img.alt = `Cover of ${book.title}`;
                    a.appendChild(img);
                }
                
                // Content div for text
                const contentDiv = document.createElement('div');
                contentDiv.className = 'book-list-content';
                
                // Title
                const titleSpan = document.createElement('span');
                titleSpan.className = 'book-title';
                titleSpan.textContent = book.title;
                contentDiv.appendChild(titleSpan);
                
                // Author
                if (book.author) {
                    const authorSpan = document.createElement('span');
                    authorSpan.className = 'book-author';
                    authorSpan.textContent = `by ${book.author}`;
                    contentDiv.appendChild(authorSpan);
                }
                
                // Date
                if (book.date) {
                    const timeElem = document.createElement('time');
                    const date = new Date(book.date);
                    timeElem.setAttribute('datetime', book.date);
                    timeElem.textContent = date.toLocaleDateString('en-US', { 
                        year: 'numeric', month: 'long', day: 'numeric' 
                    });
                    contentDiv.appendChild(timeElem);
                }
                
                a.appendChild(contentDiv);
                li.appendChild(a);
                ul.appendChild(li);
            });
        
        section.appendChild(ul);
        container.appendChild(section);
    });
    
    console.log(`Loaded ${books.length} books in ${sortedCategories.length} categories`);
    
    // Add event listeners to book links
    document.querySelectorAll('.book-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const bookId = this.getAttribute('data-book');
            if (bookId) {
                localStorage.setItem('selectedBook', bookId);
                window.location.href = this.getAttribute('href');
            }
        });
    });
} 