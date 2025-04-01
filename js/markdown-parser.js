// Markdown parser for essays
document.addEventListener('DOMContentLoaded', function() {
    // If we're on a page that needs to load Markdown
    const markdownContainer = document.getElementById('markdown-content');
    if (!markdownContainer) return;
    
    // Show loading indicator
    markdownContainer.innerHTML = '<p class="loading-message"><span class="loading"></span> Loading essay content...</p>';
    
    // Get the path to the markdown file from the data attribute
    const markdownPath = markdownContainer.getAttribute('data-markdown-path');
    if (!markdownPath) {
        markdownContainer.innerHTML = '<p class="error">No essay specified. Please select an essay from the <a href="essays.html">essays page</a>.</p>';
        return;
    }
    
    // Function to parse front matter and markdown content
    function parseFrontMatter(markdown) {
        const frontMatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
        const match = markdown.match(frontMatterRegex);
        
        if (!match) {
            return { 
                frontMatter: {}, 
                content: markdown 
            };
        }
        
        const frontMatterText = match[1];
        const content = match[2];
        const frontMatter = {};
        
        // Parse YAML-like front matter
        frontMatterText.split('\n').forEach(line => {
            const colonPos = line.indexOf(':');
            if (colonPos !== -1) {
                const key = line.slice(0, colonPos).trim();
                let value = line.slice(colonPos + 1).trim();
                
                // Handle arrays in tags: [tag1, tag2]
                if (value.startsWith('[') && value.endsWith(']')) {
                    value = value.slice(1, -1).split(',').map(tag => tag.trim());
                }
                
                frontMatter[key] = value;
            }
        });
        
        return { frontMatter, content };
    }
    
    // Load Marked.js if not already loaded
    function loadMarkedJS() {
        return new Promise((resolve, reject) => {
            if (typeof marked !== 'undefined') {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load marked.js'));
            document.head.appendChild(script);
        });
    }
    
    // Load the Markdown file
    fetch(markdownPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load markdown file: ${response.status} ${response.statusText}`);
            }
            return response.text();
        })
        .then(markdown => {
            // Parse front matter
            const { frontMatter, content } = parseFrontMatter(markdown);
            
            // Load Marked.js and then render the content
            return loadMarkedJS().then(() => {
                renderMarkdown(content, frontMatter);
            });
        })
        .catch(error => {
            console.error('Error loading markdown:', error);
            markdownContainer.innerHTML = `<p class="error">Error loading essay: ${error.message}. Please try again later or <a href="essays.html">return to essays list</a>.</p>`;
        });
    
    // Function to render markdown content
    function renderMarkdown(content, frontMatter) {
        try {
            // Configure marked with appropriate options
            marked.setOptions({
                gfm: true,         // GitHub Flavored Markdown
                breaks: false,     // Treat newlines as hard breaks
                pedantic: false,   // Don't conform strictly to original spec
                smartLists: true,  // Smarter list behavior than original markdown
                smartypants: true, // Smart typographic punctuation
                xhtml: false       // Don't close HTML tags as XHTML
            });
            
            // Convert markdown to HTML
            const html = marked(content);
            
            // Update document title
            if (frontMatter.title) {
                document.title = frontMatter.title + ' - Your Name';
                
                // Update the essay title in the header
                const titleElement = document.querySelector('article header h1');
                if (titleElement) {
                    titleElement.textContent = frontMatter.title;
                }
            }
            
            // Update the publication date
            if (frontMatter.date) {
                const dateElement = document.querySelector('article header time');
                if (dateElement) {
                    const date = new Date(frontMatter.date);
                    const options = { year: 'numeric', month: 'long', day: 'numeric' };
                    const formattedDate = date.toLocaleDateString('en-US', options);
                    dateElement.textContent = formattedDate;
                    dateElement.setAttribute('datetime', frontMatter.date);
                }
            }
            
            // Update tags
            if (frontMatter.tags && Array.isArray(frontMatter.tags)) {
                const tagsContainer = document.querySelector('article header .tags');
                if (tagsContainer) {
                    tagsContainer.innerHTML = '';
                    frontMatter.tags.forEach(tag => {
                        const tagSpan = document.createElement('span');
                        tagSpan.className = 'tag';
                        tagSpan.textContent = tag;
                        tagsContainer.appendChild(tagSpan);
                    });
                }
            }
            
            // Insert the converted HTML
            markdownContainer.innerHTML = html;
            
            // Re-render MathJax if present
            if (typeof MathJax !== 'undefined') {
                MathJax.typesetPromise([markdownContainer]).catch(function (err) {
                    console.error('Error typesetting math:', err);
                });
            }
            
            // Initialize Plotly if needed
            if (document.getElementById('plotDiv') && typeof Plotly !== 'undefined') {
                initializePlot();
            }
        } catch (error) {
            console.error('Error rendering markdown:', error);
            markdownContainer.innerHTML = `<p class="error">Error rendering content: ${error.message}. Please try again later.</p>`;
        }
    }
    
    // Function to initialize the plot (same as in our original sample-essay.html)
    function initializePlot() {
        const plotDiv = document.getElementById('plotDiv');
        if (!plotDiv) return;
        
        try {
            // Generate x values
            const x = [];
            for (let i = -3; i <= 3; i += 0.1) {
                x.push(i);
            }
            
            // Calculate function values: f(x) = x^2
            const y1 = x.map(val => val * val);
            
            // Calculate derivative values: f'(x) = 2x
            const y2 = x.map(val => 2 * val);
            
            // Create the plot
            const data = [
                {
                    x: x,
                    y: y1,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'f(x) = x²',
                    line: {
                        color: 'rgb(55, 128, 191)',
                        width: 3
                    }
                },
                {
                    x: x,
                    y: y2,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'f\'(x) = 2x',
                    line: {
                        color: 'rgb(219, 64, 82)',
                        width: 3
                    }
                }
            ];
            
            const layout = {
                title: 'Function and its Derivative',
                xaxis: {
                    title: 'x'
                },
                yaxis: {
                    title: 'y'
                },
                autosize: true,
                margin: {
                    l: 50,
                    r: 50,
                    b: 50,
                    t: 50,
                    pad: 4
                },
                // Dark theme adjustments
                paper_bgcolor: document.documentElement.getAttribute('data-theme') === 'dark' ? '#1e1e1e' : '#fff',
                plot_bgcolor: document.documentElement.getAttribute('data-theme') === 'dark' ? '#1e1e1e' : '#fff',
                font: {
                    color: document.documentElement.getAttribute('data-theme') === 'dark' ? '#eee' : '#111'
                }
            };
            
            Plotly.newPlot('plotDiv', data, layout, {responsive: true});
        } catch (error) {
            console.error('Error initializing plot:', error);
            plotDiv.innerHTML = `<p class="error">Error initializing plot: ${error.message}</p>`;
        }
    }
}); 