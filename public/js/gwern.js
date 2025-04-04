/**
 * gwern.js - JavaScript enhancements for the Gwern-inspired theme
 * Features:
 * - Sidenotes for citations/footnotes
 * - Table of contents highlighting
 * - Local search functionality
 * - Image zoom
 * - External link handling
 */

document.addEventListener('DOMContentLoaded', function() {
  // Process sidenotes
  // Disabled sidenotes in favor of standard footnotes and tooltips
  // convertFootnotesToSidenotes();
  
  // Enhance footnote navigation
  enhanceFootnotes();
  
  // Handle table of contents highlighting
  setupTableOfContents();
  
  // Add external link indicators
  markExternalLinks();
  
  // Handle image zoom
  setupImageZoom();
  
  // Initialize search if enabled
  if (document.getElementById('search-form')) {
    setupSearch();
  }
});

/**
 * Convert footnotes to sidenotes for improved readability
 */
function convertFootnotesToSidenotes() {
  // Find all footnote references
  const footnoteRefs = document.querySelectorAll('.footnote-ref');
  
  if (footnoteRefs.length === 0) return;
  
  // Create sidenote counter
  document.body.insertAdjacentHTML('beforeend', '<style>body { counter-reset: sidenote-counter; }</style>');
  
  footnoteRefs.forEach(function(ref) {
    const id = ref.getAttribute('href').substring(1);
    const footnote = document.getElementById(id);
    
    if (!footnote) return;
    
    // Create sidenote
    const sidenoteNumber = document.createElement('span');
    sidenoteNumber.className = 'sidenote-number';
    ref.parentNode.replaceChild(sidenoteNumber, ref);
    
    // Get footnote content (without the backref)
    const footnoteContent = footnote.querySelector('p').cloneNode(true);
    const backref = footnoteContent.querySelector('.footnote-backref');
    if (backref) {
      footnoteContent.removeChild(backref);
    }
    
    // Create the sidenote
    const sidenote = document.createElement('span');
    sidenote.className = 'sidenote';
    sidenote.innerHTML = footnoteContent.innerHTML;
    
    // Insert the sidenote after the sidenote number
    sidenoteNumber.insertAdjacentElement('afterend', sidenote);
    
    // Hide the original footnote
    footnote.style.display = 'none';
  });
}

/**
 * Setup table of contents for active section highlighting
 */
function setupTableOfContents() {
  const toc = document.querySelector('.table-of-contents');
  if (!toc) return;
  
  const headings = document.querySelectorAll('h2, h3, h4, h5, h6');
  if (headings.length === 0) return;
  
  // Create an IntersectionObserver to highlight active section
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      if (!id) return;
      
      const tocLink = toc.querySelector(`a[href="#${id}"]`);
      if (!tocLink) return;
      
      if (entry.isIntersecting) {
        // Remove active class from all links
        toc.querySelectorAll('a').forEach(link => {
          link.classList.remove('active');
        });
        
        // Add active class to current link
        tocLink.classList.add('active');
      }
    });
  }, { rootMargin: '0px 0px -80% 0px' });
  
  // Observe each heading
  headings.forEach(heading => {
    if (heading.getAttribute('id')) {
      observer.observe(heading);
    }
  });
  
  // Add smooth scrolling to TOC links
  toc.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 20,
          behavior: 'smooth'
        });
        
        // Update URL hash without jumping
        history.pushState(null, null, `#${targetId}`);
      }
    });
  });
}

/**
 * Mark external links with an indicator and set proper attributes
 */
function markExternalLinks() {
  const currentHost = window.location.hostname;
  
  document.querySelectorAll('a').forEach(link => {
    if (link.hostname && link.hostname !== currentHost && !link.classList.contains('social-link')) {
      // Set proper attributes for external links
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      
      // Add external link indicator
      if (!link.classList.contains('no-external-icon')) {
        link.classList.add('external-link');
      }
    }
  });
}

/**
 * Setup image zoom functionality for larger images
 */
function setupImageZoom() {
  const contentImages = document.querySelectorAll('.content-body img');
  
  contentImages.forEach(img => {
    // Only add zoom to images that are large enough
    if (img.naturalWidth > 300) {
      img.classList.add('zoomable');
      
      img.addEventListener('click', () => {
        if (img.classList.contains('zoomed')) {
          img.classList.remove('zoomed');
          document.body.classList.remove('has-zoomed-image');
        } else {
          img.classList.add('zoomed');
          document.body.classList.add('has-zoomed-image');
        }
      });
    }
  });
  
  // Close zoomed image when clicking elsewhere
  document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('zoomed') && document.body.classList.contains('has-zoomed-image')) {
      document.querySelectorAll('.zoomed').forEach(zoomed => {
        zoomed.classList.remove('zoomed');
      });
      document.body.classList.remove('has-zoomed-image');
    }
  });
}

/**
 * Setup basic client-side search functionality
 */
function setupSearch() {
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  if (!searchForm || !searchInput || !searchResults) return;
  
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim().toLowerCase();
    
    if (query.length < 2) {
      searchResults.innerHTML = '<p>Please enter at least 2 characters to search.</p>';
      return;
    }
    
    // In a real implementation, this would call an API or use a pre-built search index
    // This is a simple example that searches the current page content only
    const pageContent = document.querySelector('main').textContent.toLowerCase();
    
    if (pageContent.includes(query)) {
      searchResults.innerHTML = `<p>Found matches for "${query}" on this page.</p>`;
    } else {
      searchResults.innerHTML = `<p>No matches found for "${query}" on this page.</p>`;
    }
    
    // In a full implementation, we would display actual results here
    searchResults.innerHTML += '<p>For a complete search, please use the search function on the <a href="/">homepage</a>.</p>';
  });
}

// Function to enhance footnote navigation
function enhanceFootnotes() {
  // Get all footnote references
  const footnoteRefs = document.querySelectorAll('.footnote-ref');
  
  // Process each footnote reference
  footnoteRefs.forEach(footnoteRef => {
    const id = footnoteRef.getAttribute('href').substring(1);
    const footnote = document.getElementById(id);
    
    if (footnote) {
      // Add a 'return to content' link at the end of each footnote
      const backRef = footnote.querySelector('.footnote-backref');
      
      if (backRef) {
        // Enhance the existing backref with better visibility
        backRef.innerHTML = '↩ Return to text';
        backRef.title = 'Return to where you were reading';
        backRef.style.fontWeight = 'bold';
      }
    }
  });
} 