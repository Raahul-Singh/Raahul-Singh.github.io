#!/usr/bin/env node

/**
 * This script scans the books directory and generates a JSON file
 * containing metadata for all books. This avoids the need for
 * directory listing on the server or hardcoding filenames.
 */

const fs = require('fs');
const path = require('path');

// Path to books directory and output file
const booksDir = path.join(__dirname, '../../website/books');
const outputFile = path.join(__dirname, '../../website/books.json');

/**
 * Extract frontmatter from a markdown file
 */
function extractFrontmatter(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract frontmatter between --- markers
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) return null;
    
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
    
    return frontmatter;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return null;
  }
}

/**
 * Generate the books.json file
 */
function generateBooksJson() {
  try {
    // Check if books directory exists
    if (!fs.existsSync(booksDir)) {
      console.error(`Books directory not found: ${booksDir}`);
      return false;
    }
    
    // Make sure the website directory exists
    const websiteDir = path.dirname(outputFile);
    if (!fs.existsSync(websiteDir)) {
      fs.mkdirSync(websiteDir, { recursive: true });
    }
    
    // Read all files in the books directory
    const files = fs.readdirSync(booksDir);
    
    // Filter for markdown files and extract metadata
    const books = files
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const filePath = path.join(booksDir, file);
        const frontmatter = extractFrontmatter(filePath);
        
        if (!frontmatter) {
          console.warn(`Could not extract frontmatter from ${file}`);
          return null;
        }
        
        return {
          id: file.replace('.md', ''),
          filename: file,
          title: frontmatter.title || 'Untitled',
          author: frontmatter.author || 'Unknown Author',
          date: frontmatter.date || new Date().toISOString().split('T')[0],
          rating: frontmatter.rating || '',
          cover_image: frontmatter.cover_image || '',
          amazon_link: frontmatter.amazon_link || '',
          goodreads_link: frontmatter.goodreads_link || '',
          tags: frontmatter.tags || []
        };
      })
      .filter(book => book !== null);
    
    // Sort books by date (newest first)
    books.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Write the JSON file
    fs.writeFileSync(outputFile, JSON.stringify(books, null, 2));
    
    console.log(`Generated books.json with ${books.length} books`);
    return true;
  } catch (error) {
    console.error('Error generating books.json:', error);
    return false;
  }
}

// Run the function if called directly
if (require.main === module) {
  generateBooksJson();
}

// Export for use in other scripts
module.exports = generateBooksJson; 