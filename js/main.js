// Main JavaScript file for the website

// Social links are handled separately in social-links.js
// We don't need to import, as social-links.js self-initializes

/**
 * Initialize everything when the DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Main.js: DOM loaded, initializing...');
    
    // Set page ready class for transition effect
    setTimeout(() => {
        document.body.classList.add('page-ready');
    }, 50);
    
    // Update current year in the footer
    const yearElem = document.getElementById('current-year');
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }
    
    // Add a class to the body when the page is fully loaded
    document.body.classList.add('loaded');
    
    // Handle dark mode toggle if we implement it later
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Function to load Plotly charts (to be used later)
    window.loadPlotlyChart = function(elementId, jsonData) {
        if (typeof Plotly !== 'undefined' && document.getElementById(elementId)) {
            Plotly.newPlot(elementId, JSON.parse(jsonData));
        }
    };
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Handle book and essay links with localStorage
    setupContentLinks();
});

/**
 * Set up event listeners for book and essay links
 */
function setupContentLinks() {
    // Handle book links - store ID in localStorage when clicking a link
    document.querySelectorAll('.book-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // Extract the book ID from the URL path
            const href = this.getAttribute('href');
            const bookId = href.split('/').pop().replace('.html', '');
            
            if (bookId) {
                localStorage.setItem('selectedBook', bookId);
                console.log(`Stored book ID: ${bookId} in localStorage`);
                // Let the default navigation happen
            }
        });
    });
    
    // Handle essay links - store ID in localStorage when clicking a link
    document.querySelectorAll('.essay-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // Extract the essay ID from the URL path
            const href = this.getAttribute('href');
            const essayId = href.split('/').pop().replace('.html', '');
            
            if (essayId) {
                localStorage.setItem('selectedEssay', essayId);
                console.log(`Stored essay ID: ${essayId} in localStorage`);
                // Let the default navigation happen
            }
        });
    });
    
    // Also check the current URL to see if we're on a book or essay page
    // and set the localStorage accordingly
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('/books/')) {
        const bookId = currentPath.split('/').pop().replace('.html', '');
        if (bookId) {
            localStorage.setItem('selectedBook', bookId);
            console.log(`Set selectedBook to ${bookId} from URL path`);
        }
    } else if (currentPath.includes('/essays/')) {
        const essayId = currentPath.split('/').pop().replace('.html', '');
        if (essayId) {
            localStorage.setItem('selectedEssay', essayId);
            console.log(`Set selectedEssay to ${essayId} from URL path`);
        }
    }
} 