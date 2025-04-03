// Theme management

// Immediately check for theme preference before DOM loads
(function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }
})();

document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    // Function to set theme
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        console.log('Theme set to:', theme);
    }
    
    // Function to toggle theme
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }
    
    // Add event listener to theme toggle button
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function(e) {
            console.log('Theme toggle clicked');
            toggleTheme();
            e.preventDefault();
        });
    } else {
        console.warn('Theme toggle button not found!');
        // Try again after a short delay in case components.js hasn't finished
        setTimeout(() => {
            const delayedToggleBtn = document.getElementById('theme-toggle');
            if (delayedToggleBtn) {
                delayedToggleBtn.addEventListener('click', function(e) {
                    console.log('Theme toggle clicked (delayed)');
                    toggleTheme();
                    e.preventDefault();
                });
            } else {
                console.error('Theme toggle button still not found after delay');
            }
        }, 500);
    }
    
    // Check for saved theme preference or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        // If we have a saved preference, use it
        setTheme(savedTheme);
    } else {
        // Otherwise, check for system preference
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        if (prefersDarkScheme.matches) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
        
        // Listen for changes in system preference
        prefersDarkScheme.addEventListener('change', (e) => {
            const newTheme = e.matches ? 'dark' : 'light';
            setTheme(newTheme);
        });
    }
    
    // MathJax in dark mode needs special handling
    function adjustMathJaxForTheme() {
        if (typeof MathJax !== 'undefined' && MathJax.startup) {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            
            if (currentTheme === 'dark') {
                // Add CSS for MathJax in dark mode
                const style = document.createElement('style');
                style.id = 'mathjax-dark-theme';
                style.textContent = `
                    .MathJax {
                        color: #eee !important;
                    }
                `;
                document.head.appendChild(style);
            } else {
                // Remove dark mode CSS for MathJax
                const darkStyle = document.getElementById('mathjax-dark-theme');
                if (darkStyle) {
                    darkStyle.remove();
                }
            }
            
            // Rerender MathJax if it's already rendered
            if (document.querySelectorAll('.MathJax').length > 0) {
                MathJax.typesetPromise().catch(function (err) {
                    console.error('Error typesetting math:', err);
                });
            }
        }
    }
    
    // Adjust MathJax when theme changes
    document.documentElement.addEventListener('data-theme-changed', adjustMathJaxForTheme);
    
    // Observe attribute changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                // Dispatch custom event
                document.documentElement.dispatchEvent(new CustomEvent('data-theme-changed'));
                adjustMathJaxForTheme();
            }
        });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    // Initial adjustment
    adjustMathJaxForTheme();
}); 