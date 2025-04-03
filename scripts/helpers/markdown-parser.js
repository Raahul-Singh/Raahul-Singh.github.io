/**
 * This is a markdown parser that converts markdown content to HTML.
 * It handles common markdown syntax like headers, lists, links, etc.
 */

/**
 * Convert markdown to HTML
 * @param {string} markdown - The markdown content to convert
 * @returns {string} The HTML content
 */
function markdownToHtml(markdown) {
  if (!markdown) return '';
  
  let html = markdown;
  
  // Extract frontmatter (we won't convert this to HTML)
  const frontmatterMatch = html.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const frontmatter = frontmatterMatch ? frontmatterMatch[0] : '';
  
  // Remove frontmatter from content to be processed
  if (frontmatter) {
    html = html.replace(frontmatter, '');
  }
  
  // Convert headers ## Header -> <h2>Header</h2>
  html = html.replace(/^#{6}\s+(.*$)/gm, '<h6>$1</h6>');
  html = html.replace(/^#{5}\s+(.*$)/gm, '<h5>$1</h5>');
  html = html.replace(/^#{4}\s+(.*$)/gm, '<h4>$1</h4>');
  html = html.replace(/^#{3}\s+(.*$)/gm, '<h3>$1</h3>');
  html = html.replace(/^#{2}\s+(.*$)/gm, '<h2>$1</h2>');
  html = html.replace(/^#{1}\s+(.*$)/gm, '<h1>$1</h1>');
  
  // Convert blockquotes > Quote -> <blockquote>Quote</blockquote>
  html = html.replace(/^>\s+(.*$)/gm, '<blockquote>$1</blockquote>');
  
  // Convert unordered lists * Item -> <ul><li>Item</li></ul>
  // This is a simplified version that doesn't handle nested lists
  let inList = false;
  let listLines = [];
  
  html = html.split('\n').map(line => {
    const listMatch = line.match(/^(\s*)[*+-]\s+(.*$)/);
    
    if (listMatch) {
      if (!inList) {
        inList = true;
        listLines = [`<ul>`];
      }
      
      listLines.push(`<li>${listMatch[2]}</li>`);
      return null; // Will be replaced with list HTML later
    } else if (inList && line.trim() === '') {
      inList = false;
      listLines.push('</ul>');
      const listHtml = listLines.join('');
      listLines = [];
      return listHtml;
    } else if (inList) {
      // Continue previous list item with more text
      const lastItem = listLines.pop();
      listLines.push(lastItem.replace(/<\/li>$/, ' ' + line + '</li>'));
      return null;
    }
    
    return line;
  }).filter(line => line !== null).join('\n');
  
  // Close any open list
  if (inList) {
    listLines.push('</ul>');
    html += listLines.join('');
  }
  
  // Convert ordered lists 1. Item -> <ol><li>Item</li></ol>
  // Similar simplified approach as unordered lists
  inList = false;
  listLines = [];
  
  html = html.split('\n').map(line => {
    const listMatch = line.match(/^(\s*)\d+\.\s+(.*$)/);
    
    if (listMatch) {
      if (!inList) {
        inList = true;
        listLines = [`<ol>`];
      }
      
      listLines.push(`<li>${listMatch[2]}</li>`);
      return null;
    } else if (inList && line.trim() === '') {
      inList = false;
      listLines.push('</ol>');
      const listHtml = listLines.join('');
      listLines = [];
      return listHtml;
    } else if (inList) {
      const lastItem = listLines.pop();
      listLines.push(lastItem.replace(/<\/li>$/, ' ' + line + '</li>'));
      return null;
    }
    
    return line;
  }).filter(line => line !== null).join('\n');
  
  // Close any open list
  if (inList) {
    listLines.push('</ol>');
    html += listLines.join('');
  }
  
  // Convert links [text](url) -> <a href="url">text</a>
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  
  // Convert images ![alt](url) -> <img src="url" alt="alt">
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
  
  // Convert strong **text** -> <strong>text</strong>
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  // Convert emphasis *text* -> <em>text</em>
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  
  // Convert code blocks ```code``` -> <pre><code>code</code></pre>
  html = html.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>');
  
  // Convert inline code `code` -> <code>code</code>
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Convert paragraphs (lines with content)
  html = html.split('\n').map(line => {
    // Skip lines that are already wrapped in HTML tags or are empty
    if (line.trim() === '' || 
        /^<\/?[a-z][\s\S]*>/i.test(line)) {
      return line;
    }
    return `<p>${line}</p>`;
  }).join('\n');
  
  return html;
}

/**
 * Load markdown from a file and render it to HTML
 * @param {object} options - Options object
 * @param {string} options.markdownPath - Path to the markdown file
 * @param {string} options.containerId - ID of the container to render into
 */
function loadAndRenderMarkdown(options) {
  const { markdownPath, containerId } = options;
  
  fetch(markdownPath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load ${markdownPath}: ${response.status} ${response.statusText}`);
      }
      return response.text();
    })
    .then(markdown => {
      // Extract frontmatter
      const frontmatterMatch = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      const frontmatterContent = frontmatterMatch ? frontmatterMatch[1] : '';
      
      // Parse frontmatter
      const frontmatter = {};
      if (frontmatterContent) {
        frontmatterContent.split('\n').forEach(line => {
          const colonPos = line.indexOf(':');
          if (colonPos !== -1) {
            const key = line.slice(0, colonPos).trim();
            let value = line.slice(colonPos + 1).trim();
            
            // Handle arrays in frontmatter
            if (value.startsWith('[') && value.endsWith(']')) {
              value = value.slice(1, -1).split(',').map(item => item.trim());
            }
            
            frontmatter[key] = value;
          }
        });
      }
      
      // Convert markdown to HTML
      const html = markdownToHtml(markdown);
      
      // Update the container
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = html;
        
        // Update other elements with frontmatter data if they exist
        if (frontmatter.title) {
          const titleElement = document.getElementById('book-title') || document.getElementById('essay-title');
          if (titleElement) titleElement.textContent = frontmatter.title;
          
          // Also update the page title
          document.title = `${frontmatter.title} - Raahul Singh`;
        }
        
        if (frontmatter.author) {
          const authorElement = document.getElementById('book-author');
          if (authorElement) authorElement.textContent = `by ${frontmatter.author}`;
        }
        
        if (frontmatter.date) {
          const dateElement = document.getElementById('book-date') || document.getElementById('essay-date');
          if (dateElement) {
            const date = new Date(frontmatter.date);
            dateElement.textContent = date.toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            });
          }
        }
        
        if (frontmatter.rating) {
          const ratingElement = document.getElementById('book-rating');
          if (ratingElement) {
            const rating = parseFloat(frontmatter.rating);
            if (!isNaN(rating)) {
              const fullStars = Math.floor(rating);
              const hasHalfStar = rating % 1 === 0.5;
              
              ratingElement.innerHTML = '★'.repeat(fullStars) + (hasHalfStar ? '½' : '');
            }
          }
        }
        
        if (frontmatter.tags && Array.isArray(frontmatter.tags)) {
          const tagsElement = document.getElementById('book-tags') || document.getElementById('essay-tags');
          if (tagsElement) {
            tagsElement.innerHTML = frontmatter.tags
              .map(tag => `<span class="tag">${tag}</span>`)
              .join('');
          }
        }
      }
    })
    .catch(error => {
      console.error('Error rendering markdown:', error);
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = `<p class="error">Failed to load content: ${error.message}</p>`;
      }
    });
}

// Export the functions if in a Node.js environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { markdownToHtml, loadAndRenderMarkdown };
} 