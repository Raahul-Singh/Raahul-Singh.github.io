// Simplified markdown parser
function loadAndRenderMarkdown(options) {
    const { containerId, markdownPath } = options;
    const markdownContainer = document.getElementById(containerId);

    if (!markdownContainer) {
        console.error(`Markdown container with ID '${containerId}' not found.`);
        return;
    }
    if (!markdownPath) {
        console.error('Markdown path not provided.');
        markdownContainer.innerHTML = '<p class="error">Error: Markdown path not specified.</p>';
        return;
    }

    const contentType = containerId === 'book-content' ? 'book' : 'essay';
    markdownContainer.innerHTML = `<p>Loading ${contentType}...</p>`;
    console.log(`Loading markdown from: ${markdownPath}`);

    // Function to parse front matter
    function parseFrontMatter(markdown) {
        const frontMatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
        const match = markdown.match(frontMatterRegex);
        if (!match) {
            console.warn('Front matter not found in markdown file:', markdownPath);
            return { frontMatter: {}, content: markdown };
        }
        const frontMatterText = match[1];
        const content = match[2];
        const frontMatter = {};
        frontMatterText.split('\n').forEach(line => {
            const colonPos = line.indexOf(':');
            if (colonPos !== -1) {
                const key = line.slice(0, colonPos).trim();
                let value = line.slice(colonPos + 1).trim();
                if (value.startsWith('[') && value.endsWith(']')) {
                    value = value.slice(1, -1).split(',').map(tag => tag.trim());
                }
                frontMatter[key] = value;
            }
        });
        return { frontMatter, content };
    }

    // Load a script dynamically
    function loadScript(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // Render the content using marked
    function renderContent(markdown) {
        try {
            const { frontMatter, content } = parseFrontMatter(markdown);
            console.log('Rendering content. Front matter:', frontMatter);
            
            // Convert markdown to HTML - manually if needed
            let html;
            
            if (typeof marked === 'function') {
                console.log('Using marked.js to parse markdown');
                html = marked(content);
            } else {
                console.warn('Marked.js not found - using basic markdown parsing');
                // Very basic markdown parsing fallback
                html = content
                    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/\n\* (.*)/gm, '<ul><li>$1</li></ul>')
                    .replace(/\n> (.*)/gm, '<blockquote>$1</blockquote>')
                    .replace(/\n/gm, '<br>');
            }

            // Update metadata
            if (frontMatter.title) {
                document.title = frontMatter.title + ' - Raahul Singh';
                const titleEl = document.getElementById('book-title') || document.querySelector('article header h1');
                if (titleEl) titleEl.textContent = frontMatter.title;
            }
            if (frontMatter.author && document.getElementById('book-author')) {
                document.getElementById('book-author').textContent = 'by ' + frontMatter.author;
            }
            if (frontMatter.rating && document.getElementById('book-rating')) {
                document.getElementById('book-rating').textContent = frontMatter.rating;
            }
            if (frontMatter.date) {
                const dateEl = document.getElementById('book-date') || document.querySelector('article header time');
                if (dateEl) {
                    const date = new Date(frontMatter.date);
                    const options = { year: 'numeric', month: 'long', day: 'numeric' };
                    dateEl.textContent = date.toLocaleDateString('en-US', options);
                    dateEl.setAttribute('datetime', frontMatter.date);
                }
            }
            if (frontMatter.tags && Array.isArray(frontMatter.tags)) {
                const tagsEl = document.getElementById('book-tags') || document.querySelector('article header .tags');
                if (tagsEl) {
                    tagsEl.innerHTML = frontMatter.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
                }
            }
            
            // Add book links and cover image
            if (containerId === 'book-content') {
                const bookHeaderEl = document.getElementById('book-header');
                
                // Add cover image if provided
                if (frontMatter.cover_image && bookHeaderEl) {
                    const coverContainerEl = document.createElement('div');
                    coverContainerEl.className = 'book-cover';
                    
                    const imgEl = document.createElement('img');
                    imgEl.src = frontMatter.cover_image;
                    imgEl.alt = frontMatter.title ? `Cover of ${frontMatter.title}` : 'Book cover';
                    
                    coverContainerEl.appendChild(imgEl);
                    bookHeaderEl.insertBefore(coverContainerEl, bookHeaderEl.firstChild);
                }
                
                // Add links to Amazon and Goodreads
                const linksEl = document.createElement('div');
                linksEl.className = 'book-links';
                
                let hasLinks = false;
                
                if (frontMatter.amazon_link) {
                    const amazonLink = document.createElement('a');
                    amazonLink.href = frontMatter.amazon_link;
                    amazonLink.target = '_blank';
                    amazonLink.rel = 'noopener noreferrer';
                    amazonLink.innerHTML = '<span class="book-link-icon">📚</span> Amazon';
                    amazonLink.className = 'book-external-link amazon-link';
                    linksEl.appendChild(amazonLink);
                    hasLinks = true;
                }
                
                if (frontMatter.goodreads_link) {
                    if (hasLinks) {
                        linksEl.appendChild(document.createTextNode(' | '));
                    }
                    
                    const goodreadsLink = document.createElement('a');
                    goodreadsLink.href = frontMatter.goodreads_link;
                    goodreadsLink.target = '_blank';
                    goodreadsLink.rel = 'noopener noreferrer';
                    goodreadsLink.innerHTML = '<span class="book-link-icon">📖</span> Goodreads';
                    goodreadsLink.className = 'book-external-link goodreads-link';
                    linksEl.appendChild(goodreadsLink);
                    hasLinks = true;
                }
                
                // Only add links container if there are links
                if (hasLinks && bookHeaderEl) {
                    // Find the last child of book-header (should be tags)
                    const tagsEl = document.getElementById('book-tags');
                    if (tagsEl) {
                        bookHeaderEl.insertBefore(linksEl, tagsEl.nextSibling);
                    } else {
                        bookHeaderEl.appendChild(linksEl);
                    }
                }
            }

            // Insert the converted HTML
            markdownContainer.innerHTML = html;

            // Re-render MathJax if present
            if (typeof MathJax !== 'undefined') {
                MathJax.typesetPromise([markdownContainer]).catch(err => console.error('Error typesetting math:', err));
            }
        } catch (error) {
            console.error('Error rendering markdown:', error);
            markdownContainer.innerHTML = `<p class="error">Error rendering content: ${error.message}. Please check the console.</p>`;
        }
    }

    // Fetch the markdown file
    fetch(markdownPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
            }
            return response.text();
        })
        .then(markdown => {
            console.log('Markdown file loaded successfully, length:', markdown.length);
            
            // Check if marked is available, if not, try to load it
            if (typeof marked !== 'function') {
                console.log('Marked.js not available, trying to load it');
                return loadScript('https://cdn.jsdelivr.net/npm/marked/marked.min.js')
                    .then(() => {
                        console.log('Marked.js loaded successfully');
                        return markdown;
                    })
                    .catch(error => {
                        console.warn('Failed to load marked.js:', error);
                        return markdown; // Continue with basic parsing
                    });
            }
            return markdown;
        })
        .then(markdown => {
            renderContent(markdown);
        })
        .catch(error => {
            console.error('Error loading markdown file:', error);
            const returnPage = contentType === 'book' ? 'books.html' : 'essays.html';
            markdownContainer.innerHTML = `<p class="error">Error loading ${contentType}: ${error.message}. Please <a href="${returnPage}">return to the ${contentType}s list</a>.</p>`;
        });
} 