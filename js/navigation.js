/**
 * Simple navigation handler
 * Basic navigation script to handle page transitions and ensure content loads properly
 */

// Add handlers once DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // 1. Add page-ready class to enable CSS transitions
    document.body.classList.add('page-ready');
    
    // 2. Mark current page in navigation
    const currentPath = window.location.pathname;
    document.querySelectorAll('nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.endsWith(href) || 
           (href === 'index.html' && (currentPath === '/' || currentPath.endsWith('/')))) {
            link.classList.add('current');
        }
    });
    
    // 3. Simple reload for home page when clicked from home page
    document.querySelectorAll('a[href="index.html"], a[href="/"], a[href=""]').forEach(link => {
        link.addEventListener('click', function(e) {
            if (currentPath.endsWith('index.html') || currentPath === '/' || currentPath.endsWith('/')) {
                e.preventDefault();
                window.location.reload();
            }
        });
    });
    
    // 4. Basic check for empty content
    setTimeout(function() {
        const main = document.querySelector('main');
        if (main && (main.offsetHeight < 10 || main.innerHTML.trim() === '')) {
            console.log('Content appears to be missing, reloading page');
            window.location.reload();
        }
    }, 300);
}); 