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
    
    // The common navigation HTML
    const navHTML = `
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="essays.html">Essays</a></li>
            <li><a href="books.html">Books</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>
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
    // Get the current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Find the link that matches the current page
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        // Check if the href matches the current page
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    console.log('Current page highlighted in navigation');
} 