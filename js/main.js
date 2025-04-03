// Main JavaScript file for the website

document.addEventListener('DOMContentLoaded', function() {
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
    
    // Handle book links
    document.addEventListener('click', function(e) {
        if (e.target.closest('.book-link')) {
            e.preventDefault();
            const bookLink = e.target.closest('.book-link');
            const bookId = bookLink.getAttribute('data-book');
            if (bookId) {
                localStorage.setItem('currentBookId', bookId);
                window.location.href = 'book-template.html';
            }
        }
    });
    
    // Handle essay links
    document.addEventListener('click', function(e) {
        if (e.target.closest('.essay-link')) {
            e.preventDefault();
            const essayLink = e.target.closest('.essay-link');
            const essayId = essayLink.getAttribute('data-essay');
            if (essayId) {
                localStorage.setItem('currentEssayId', essayId);
                window.location.href = 'essay-template.html';
            }
        }
    });
}); 