/**
 * navigation.js
 * Handles common navigation elements across the site
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Insert common navigation
    insertCommonNavigation();
    
    // Highlight current page in navigation
    highlightCurrentPage();
});

/**
 * Inserts the common navigation menu into the page
 */
function insertCommonNavigation() {
    const navPlaceholder = document.querySelector('nav');
    
    if (!navPlaceholder) {
        console.error('Navigation placeholder not found');
        return;
    }
    
    // Determine if we're in a subdirectory
    const path = window.location.pathname;
    const isInSubdirectory = path.includes('/books/') || path.includes('/essays/');
    
    // Base path prefix for navigation links
    const basePrefix = isInSubdirectory ? '../' : '';
    
    // The common navigation HTML
    const navHTML = `
        <ul>
            <li><a href="${basePrefix}index.html">Home</a></li>
            <li><a href="${basePrefix}essays.html">Essays</a></li>
            <li><a href="${basePrefix}books.html">Books</a></li>
            <li><a href="${basePrefix}about.html">About</a></li>
            <li><a href="${basePrefix}contact.html">Contact</a></li>
        </ul>
    `;
    
    // Insert the navigation
    navPlaceholder.innerHTML = navHTML;
    
    console.log('Common navigation inserted');
}

/**
 * Highlights the current page in the navigation menu
 */
function highlightCurrentPage() {
    // Get the current page path and filename
    const path = window.location.pathname;
    const currentPage = path.split('/').pop() || 'index.html';
    
    // Find the link that matches the current page
    const navLinks = document.querySelectorAll('nav a');
    
    // Check if we're on a book or essay page
    const isBookPage = path.includes('/books/');
    const isEssayPage = path.includes('/essays/');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // For book or essay detail pages, highlight the corresponding section
        if (isBookPage && href.endsWith('books.html')) {
            link.classList.add('active');
        } else if (isEssayPage && href.endsWith('essays.html')) {
            link.classList.add('active');
        }
        // For main pages, check the filename
        else if (!isBookPage && !isEssayPage && href.endsWith(currentPage)) {
            link.classList.add('active');
        }
    });
    
    console.log('Current page highlighted in navigation');
} 