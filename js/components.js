/**
 * Components.js - Handles common page components like header and footer
 * This centralizes these elements for easier maintenance
 */

document.addEventListener('DOMContentLoaded', function() {
    insertHeader();
    insertFooter();
});

/**
 * Inserts the common header into the page
 */
function insertHeader() {
    const headerEl = document.querySelector('header');
    if (!headerEl) return;

    const headerHTML = `
        <div class="header-top">
            <h1>Raahul Singh</h1>
            <div class="header-controls">
                <div class="header-social-links" data-social-links></div>
                <button id="theme-toggle" class="theme-toggle" aria-label="Toggle dark mode">
                    <svg class="icon sun-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06z"></path>
                    </svg>
                    <svg class="icon moon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"></path>
                    </svg>
                </button>
            </div>
        </div>
        <nav></nav>
    `;
    
    headerEl.innerHTML = headerHTML;
}

/**
 * Inserts the common footer into the page
 */
function insertFooter() {
    const footerEl = document.querySelector('footer');
    if (!footerEl) return;
    
    const currentYear = new Date().getFullYear();
    
    const footerHTML = `
        <p>&copy; <span id="current-year">${currentYear}</span> Raahul Singh</p>
        <div data-social-links></div>
        <p class="acknowledgement">
            Created with the assistance of <a href="https://cursor.sh/" target="_blank" rel="noopener noreferrer">Cursor</a>
        </p>
    `;
    
    footerEl.innerHTML = footerHTML;
} 