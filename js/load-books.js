/**
 * Dynamically loads and displays books from books.json.
 * This script displays books in a chronological list.
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Loading books...');
    loadBooks();
});

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
    const existingSections = container.querySelectorAll('.book-list');
    existingSections.forEach(section => section.remove());
    
    // Get existing heading and intro paragraph
    const heading = container.querySelector('h1');
    const intro = heading ? heading.nextElementSibling : null;
    
    // Load books from the JSON file
    fetch('books.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load books.json: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(books => {
            console.log(`Loaded ${books.length} books from books.json`);
            
            if (books.length === 0) {
                const noBooks = document.createElement('p');
                noBooks.textContent = 'No books available. Add some books to get started.';
                container.appendChild(noBooks);
                return;
            }
            
            // Create a single list for all books
            const bookList = document.createElement('ul');
            bookList.className = 'book-list';
            
            // Sort books by date (newest first)
            books.sort((a, b) => new Date(b.date) - new Date(a.date))
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
                    
                    // Rating (if available)
                    if (book.rating) {
                        const ratingSpan = document.createElement('span');
                        ratingSpan.className = 'book-rating';
                        // Format the rating to show numeric value out of 5
                        const ratingText = book.rating.includes('★') 
                            ? book.rating  // Keep star rating for existing books
                            : `Rating: ${book.rating}/5`;  // Format numeric rating
                        ratingSpan.textContent = ratingText;
                        contentDiv.appendChild(ratingSpan);
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
                    
                    // Tags (optional)
                    if (book.tags && book.tags.length > 0) {
                        const tagsDiv = document.createElement('div');
                        tagsDiv.className = 'tags';
                        book.tags.forEach(tag => {
                            const tagSpan = document.createElement('span');
                            tagSpan.className = 'tag';
                            tagSpan.textContent = tag;
                            tagsDiv.appendChild(tagSpan);
                        });
                        contentDiv.appendChild(tagsDiv);
                    }
                    
                    a.appendChild(contentDiv);
                    li.appendChild(a);
                    bookList.appendChild(li);
                });
            
            container.appendChild(bookList);
            console.log(`Displayed ${books.length} books`);
            
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
        })
        .catch(error => {
            console.error('Error loading books:', error);
            const errorMessage = document.createElement('p');
            errorMessage.className = 'error-message';
            errorMessage.textContent = `Failed to load books: ${error.message}. Make sure books.json exists.`;
            container.appendChild(errorMessage);
        });
} 