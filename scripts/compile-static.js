#!/usr/bin/env node

/**
 * This script statically compiles all HTML files by reading markdown files directly
 * It generates HTML for books and essays without relying on JSON files
 */

const fs = require('fs');
const path = require('path');
const marked = require('marked');

// Format a date string to be more readable
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

/**
 * Extract frontmatter from a markdown file
 * @param {string} filePath - Path to the markdown file
 * @returns {Object} An object with frontmatter data and content
 */
function extractFrontmatter(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract frontmatter between --- markers
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) return { frontmatter: {}, content };
    
    const frontmatter = {};
    const frontmatterContent = match[1];
    
    // Parse each line
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
    
    return { 
      frontmatter, 
      content: content.replace(match[0], '') // Remove frontmatter from content
    };
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return { frontmatter: {}, content: '' };
  }
}

// Generate an HTML page from a template and markdown content
function generateHtmlFromMarkdown(templatePath, markdownPath, outputPath) {
  try {
    if (!fs.existsSync(templatePath)) {
      console.error(`Template file not found: ${templatePath}`);
      return false;
    }
    
    if (!fs.existsSync(markdownPath)) {
      console.error(`Markdown file not found: ${markdownPath}`);
      return false;
    }
    
    // Read the template and extract the markdown frontmatter
    const template = fs.readFileSync(templatePath, 'utf8');
    const { frontmatter, content } = extractFrontmatter(markdownPath);
    
    // Convert markdown to HTML
    const htmlContent = marked.parse(content);
    
    // Create directories if they don't exist
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Create the HTML file with the correct page title and ID
    const contentType = markdownPath.includes('/books/') ? 'book' : 'essay';
    const id = path.basename(markdownPath, '.md');
    
    // Format date nicely if available
    let formattedDate = '';
    if (frontmatter.date) {
      const date = new Date(frontmatter.date);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      formattedDate = date.toLocaleDateString('en-US', options);
    }
    
    // Format tags if available
    let tagsHtml = '';
    if (frontmatter.tags && Array.isArray(frontmatter.tags)) {
      tagsHtml = `<div class="tags">
        ${frontmatter.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>`;
    }
    
    // Book-specific sections
    let bookInfo = '';
    if (contentType === 'book') {
      // Rating display
      let ratingHtml = '';
      if (frontmatter.rating) {
        const rating = parseFloat(frontmatter.rating);
        const stars = '★'.repeat(Math.floor(rating)) + (rating % 1 === 0.5 ? '½' : '');
        ratingHtml = `<div class="rating">${stars}</div>`;
      }
      
      // Book cover
      let coverHtml = '';
      if (frontmatter.cover_image) {
        coverHtml = `<div class="book-cover">
          <img src="${frontmatter.cover_image}" alt="Cover of ${frontmatter.title || id}">
        </div>`;
      }
      
      // External links
      let linksHtml = '';
      if (frontmatter.amazon_link || frontmatter.goodreads_link) {
        const amazonLink = frontmatter.amazon_link ? 
          `<a href="${frontmatter.amazon_link}" target="_blank" rel="noopener noreferrer" class="book-external-link amazon-link">
            <span class="book-link-icon">📚</span> Amazon
          </a>` : '';
          
        const separator = (frontmatter.amazon_link && frontmatter.goodreads_link) ? ' | ' : '';
        
        const goodreadsLink = frontmatter.goodreads_link ? 
          `<a href="${frontmatter.goodreads_link}" target="_blank" rel="noopener noreferrer" class="book-external-link goodreads-link">
            <span class="book-link-icon">📖</span> Goodreads
          </a>` : '';
          
        linksHtml = `<div class="book-links">${amazonLink}${separator}${goodreadsLink}</div>`;
      }
      
      bookInfo = `
        <div id="book-header">
          ${coverHtml}
          <h1 id="book-title">${frontmatter.title || ''}</h1>
          <p id="book-author">by ${frontmatter.author || ''}</p>
          ${ratingHtml}
          <time id="book-date" datetime="${frontmatter.date || ''}">${formattedDate}</time>
          ${tagsHtml}
          ${linksHtml}
        </div>
      `;
    } else {
      // Essay header
      bookInfo = `
        <header>
          <h1>${frontmatter.title || ''}</h1>
          <time datetime="${frontmatter.date || ''}">${formattedDate}</time>
          ${tagsHtml}
        </header>
      `;
    }
    
    // Create static content section instead of dynamic loading
    const contentSection = `
      <article>
        ${bookInfo}
        <div id="${contentType}-content">
          ${htmlContent}
        </div>
      </article>
    `;
    
    // Adjust paths for output directory
    let html = template
      // Update the title
      .replace(/<title>.*?<\/title>/, `<title>${frontmatter.title || id} - Raahul Singh</title>`)
      // Fix the paths to CSS, JS, and other assets - use a parent reference
      .replace(/href="css\//g, 'href="../css/')
      .replace(/href="assets\//g, 'href="../assets/')
      .replace(/src="js\//g, 'src="../js/')
      .replace(/src="assets\//g, 'src="../assets/')
      // Update links in navigation
      .replace(/href="index.html"/g, 'href="../index.html"')
      .replace(/href="books.html"/g, 'href="../books.html"')
      .replace(/href="essays.html"/g, 'href="../essays.html"')
      .replace(/href="about.html"/g, 'href="../about.html"')
      .replace(/href="contact.html"/g, 'href="../contact.html"')
      // Replace the content loading script and container with the actual content
      .replace(/<main[\s\S]*?<\/main>/, `<main>${contentSection}</main>`)
      // Remove the markdown parser script import
      .replace(/<script src=".*?markdown-parser.js"><\/script>/, '')
      // Remove the script that loads markdown at the bottom
      .replace(/<script>\s+\/\/ Get (book|essay) ID[\s\S]*?<\/script>/, '');
    
    // Write the output file
    fs.writeFileSync(outputPath, html);
    console.log(`Generated static HTML file: ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`Error generating HTML from markdown: ${markdownPath}`, error);
    return false;
  }
}

// Update HTML file with generated content
function updateHtmlFile(filePath, selector, content) {
  try {
    // Always create a clean version of the file
    return createCleanHtmlFile(filePath, selector, content);
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error);
    return false;
  }
}

// Create a clean HTML file with proper structure
function createCleanHtmlFile(filePath, selector, content) {
  try {
    const fileName = path.basename(filePath);
    const pageTitle = fileName.replace('.html', '').charAt(0).toUpperCase() + fileName.replace('.html', '').slice(1);
    
    let template;
    
    if (fileName === 'books.html') {
      template = `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Books | Raahul Singh</title>
    <meta name="description" content="A collection of books read and reviewed by Raahul Singh.">
    <link rel="stylesheet" href="css/style.css">
    <link rel="icon" href="assets/favicon.ico" type="image/x-icon">
    
    <!-- Theme script early load to prevent flashing -->
    <script src="js/theme.js"></script>
    
    <!-- Components script for common elements -->
    <script src="js/components.js"></script>
    
    <!-- Central navigation handler - must be after components.js -->
    <script src="js/navigation.js"></script>
    
    <!-- Social links module for rendering social icons -->
    <script src="js/social-links.js"></script>
</head>
<body>
    <!-- Header will be inserted by components.js -->
    <header></header>

    <main>
        <article>
            <h1>Books</h1>
            <p>A collection of my book notes, summaries, and reviews. Books are listed in chronological order with the most recent at the top.</p>
            
            <!-- Book list container - this will be populated by compile-static.js -->
            <div id="books-container" class="card-grid">
${content}
</div>
        </article>
    </main>

    <!-- Footer will be inserted by components.js -->
    <footer></footer>

    <script src="js/main.js" defer></script>
</body>
</html>`;
    } else if (fileName === 'essays.html') {
      template = `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Essays | Raahul Singh</title>
    <meta name="description" content="A collection of essays written by Raahul Singh.">
    <link rel="stylesheet" href="css/style.css">
    <link rel="icon" href="assets/favicon.ico" type="image/x-icon">
    
    <!-- Theme script early load to prevent flashing -->
    <script src="js/theme.js"></script>
    
    <!-- Components script for common elements -->
    <script src="js/components.js"></script>
    
    <!-- Central navigation handler - must be after components.js -->
    <script src="js/navigation.js"></script>
    
    <!-- Social links module for rendering social icons -->
    <script src="js/social-links.js"></script>
</head>
<body>
    <!-- Header will be inserted by components.js -->
    <header></header>

    <main>
        <article>
            <h1>Essays</h1>
            <p>A collection of my essays on various topics. Essays are listed in chronological order with the most recent at the top.</p>
            
            <!-- Essay list container - this will be populated by compile-static.js -->
            <div id="essays-container" class="card-grid">
${content}
</div>
        </article>
    </main>

    <!-- Footer will be inserted by components.js -->
    <footer></footer>

    <script src="js/main.js" defer></script>
</body>
</html>`;
    } else if (fileName === 'index.html') {
      template = `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Raahul Singh</title>
    <meta name="description" content="Personal website of Raahul Singh - Essays, book notes, and more.">
    <link rel="stylesheet" href="css/style.css">
    <link rel="icon" href="assets/favicon.ico" type="image/x-icon">
    
    <!-- Theme script early load to prevent flashing -->
    <script src="js/theme.js"></script>
    
    <!-- Components script for common elements -->
    <script src="js/components.js"></script>
    
    <!-- Central navigation handler - must be after components.js -->
    <script src="js/navigation.js"></script>
    
    <!-- Social links module for rendering social icons -->
    <script src="js/social-links.js"></script>
</head>
<body>
    <!-- Header will be inserted by components.js -->
    <header></header>

    <main>
        <section class="welcome">
            <div class="profile-container">
                <div class="profile-photo">
                    <img src="assets/profile-image.jpg" alt="Raahul Singh" />
                </div>
                <div class="profile-info">
                    <h1>Welcome</h1>
                    <p>This is my personal website where I share my thoughts, essays, and book notes.</p>
                </div>
            </div>
        </section>
        
        <section class="recent">
            <h2>Recent Books</h2>
            <div id="recent-books" class="card-grid">
${selector === 'recent-books' ? content : '<!-- Loading recent books... -->'}
</div>
            <p class="view-all"><a href="books.html">View all books →</a></p>
            
            <h2>Recent Essays</h2>
            <div id="recent-essays" class="card-grid">
${selector === 'recent-essays' ? content : '<!-- Loading recent essays... -->'}
</div>
            <p class="view-all"><a href="essays.html">View all essays →</a></p>
        </section>
    </main>

    <!-- Footer will be inserted by components.js -->
    <footer></footer>

    <script src="js/main.js" defer></script>
</body>
</html>`;
    } else {
      console.error(`Unknown file type: ${fileName}`);
      return false;
    }
    
    // Write the clean file
    fs.writeFileSync(filePath, template);
    console.log(`Created clean HTML file: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error creating clean HTML file: ${filePath}`, error);
    return false;
  }
}

// Read all markdown files in a directory
function readMarkdownFiles(dir) {
  try {
    if (!fs.existsSync(dir)) {
      console.warn(`Directory ${dir} does not exist`);
      return [];
    }
    
    const files = fs.readdirSync(dir).filter(file => file.endsWith('.md'));
    return files.map(file => {
      const filePath = path.join(dir, file);
      const { frontmatter } = extractFrontmatter(filePath);
      
      return {
        id: file.replace('.md', ''),
        ...frontmatter,
        filename: file
      };
    }).sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, newest first
  } catch (error) {
    console.error(`Error reading markdown files from ${dir}:`, error);
    return [];
  }
}

// Main function to compile all static HTML files
async function compileStatic() {
  console.log('Starting static HTML compilation...');
  
  try {
    // Define all directories
    const websiteDir = path.join(__dirname, '../website');
    
    // Source markdown directories (also where we'll put the HTML files)
    const booksDir = path.join(websiteDir, 'books');
    const essaysDir = path.join(websiteDir, 'essays');
    
    // Create the directories if they don't exist
    if (!fs.existsSync(booksDir)) {
      fs.mkdirSync(booksDir, { recursive: true });
    }
    
    if (!fs.existsSync(essaysDir)) {
      fs.mkdirSync(essaysDir, { recursive: true });
    }
    
    console.log('Reading markdown files...');
    const books = readMarkdownFiles(booksDir);
    const essays = readMarkdownFiles(essaysDir);
    
    console.log(`Found ${books.length} books and ${essays.length} essays`);
    
    // Get template files
    const bookTemplate = path.join(websiteDir, 'book-template.html');
    const essayTemplate = path.join(websiteDir, 'essay-template.html');
    
    // Generate HTML files for each book
    books.forEach(book => {
      const markdownPath = path.join(booksDir, `${book.id}.md`);
      const outputPath = path.join(booksDir, `${book.id}.html`);
      generateHtmlFromMarkdown(bookTemplate, markdownPath, outputPath);
    });
    
    // Generate HTML files for each essay
    essays.forEach(essay => {
      const markdownPath = path.join(essaysDir, `${essay.id}.md`);
      const outputPath = path.join(essaysDir, `${essay.id}.html`);
      generateHtmlFromMarkdown(essayTemplate, markdownPath, outputPath);
    });
    
    // Get the most recent ones for the homepage
    const recentBooks = books.slice(0, 3);
    const recentEssays = essays.slice(0, 3);
    
    // Generate HTML for each section with links to compiled files
    // Note: No data attributes needed anymore since we extract IDs from the URL
    const allBooksHtml = books.map(book => {
      const { id, title, author, rating, date, tags, cover_image } = book;
      
      return `
        <div class="card book-card">
          ${cover_image ? 
            `<div class="book-card-cover">
              <a href="books/${id}.html" class="book-link">
                <img src="${cover_image}" alt="Cover of ${title}" class="book-cover-thumb">
              </a>
            </div>` : ''}
          <div class="book-card-content">
            <h3><a href="books/${id}.html" class="book-link">${title}</a></h3>
            <p class="book-author">by ${author}</p>
            ${rating ? `<div class="rating">${'★'.repeat(Math.floor(parseFloat(rating)))}${parseFloat(rating) % 1 === 0.5 ? '½' : ''}</div>` : ''}
            <p class="book-date">${formatDate(date)}</p>
            ${tags && tags.length > 0 ? 
              `<div class="tags">${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : ''}
          </div>
        </div>
      `;
    }).join('\n');
    
    const allEssaysHtml = essays.map(essay => {
      const { id, title, date, tags } = essay;
      
      return `
        <div class="card">
          <h3><a href="essays/${id}.html" class="essay-link">${title}</a></h3>
          <p class="essay-date">${formatDate(date)}</p>
          ${tags && tags.length > 0 ? 
            `<div class="tags">${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : ''}
        </div>
      `;
    }).join('\n');
    
    const recentBooksHtml = recentBooks.map(book => {
      const { id, title, author, rating, date, tags, cover_image } = book;
      
      return `
        <div class="card book-card">
          ${cover_image ? 
            `<div class="book-card-cover">
              <a href="books/${id}.html" class="book-link">
                <img src="${cover_image}" alt="Cover of ${title}" class="book-cover-thumb">
              </a>
            </div>` : ''}
          <div class="book-card-content">
            <h3><a href="books/${id}.html" class="book-link">${title}</a></h3>
            <p class="book-author">by ${author}</p>
            ${rating ? `<div class="rating">${'★'.repeat(Math.floor(parseFloat(rating)))}${parseFloat(rating) % 1 === 0.5 ? '½' : ''}</div>` : ''}
            <p class="book-date">${formatDate(date)}</p>
            ${tags && tags.length > 0 ? 
              `<div class="tags">${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : ''}
          </div>
        </div>
      `;
    }).join('\n');
    
    const recentEssaysHtml = recentEssays.map(essay => {
      const { id, title, date, tags } = essay;
      
      return `
        <div class="card">
          <h3><a href="essays/${id}.html" class="essay-link">${title}</a></h3>
          <p class="essay-date">${formatDate(date)}</p>
          ${tags && tags.length > 0 ? 
            `<div class="tags">${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : ''}
        </div>
      `;
    }).join('\n');
    
    // Update all HTML files
    const updates = [
      updateHtmlFile(path.join(websiteDir, 'books.html'), 'books-container', allBooksHtml || '<p>No book reviews yet.</p>'),
      updateHtmlFile(path.join(websiteDir, 'essays.html'), 'essays-container', allEssaysHtml || '<p>No essays yet.</p>'),
      updateHtmlFile(path.join(websiteDir, 'index.html'), 'recent-books', recentBooksHtml || '<p>No book reviews yet.</p>'),
      updateHtmlFile(path.join(websiteDir, 'index.html'), 'recent-essays', recentEssaysHtml || '<p>No essays yet.</p>')
    ];
    
    if (updates.every(Boolean)) {
      console.log('Static HTML compilation completed successfully!');
      return true;
    } else {
      console.error('Some HTML files could not be updated.');
      return false;
    }
  } catch (error) {
    console.error('Error during static HTML compilation:', error);
    return false;
  }
}

// Run the compilation if called directly
if (require.main === module) {
  compileStatic();
}

// Export for use in other scripts
module.exports = { compileStatic }; 