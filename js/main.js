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
}); 