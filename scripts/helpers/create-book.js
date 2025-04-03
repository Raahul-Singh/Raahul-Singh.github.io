#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Create the books directory if it doesn't exist
const bookDir = path.join(__dirname, '../../website/books');
if (!fs.existsSync(bookDir)) {
  fs.mkdirSync(bookDir, { recursive: true });
}

/**
 * Function to create a new book
 * @param {Object} options - Options for book creation
 * @param {string} options.filename - Filename for the book (without .md)
 * @param {string} options.title - Title for the book
 * @param {string} options.author - Author of the book
 * @param {string|Array} options.tags - Tags for the book, either comma-separated string or array
 * @param {string} options.rating - Rating for the book (0-5)
 * @returns {boolean} True if successful, false otherwise
 */
function generateBook(options = {}) {
  let { filename, title, author, tags, rating = "" } = options;
  
  // Format the date
  const today = new Date();
  const dateString = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  
  // Parse tags
  let tagsList = [];
  if (Array.isArray(tags)) {
    tagsList = tags;
  } else if (typeof tags === 'string') {
    tagsList = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
  }
  
  // Create the tags section for frontmatter
  const tagsSection = tagsList.length > 0 ? `tags: [${tagsList.join(', ')}]` : 'tags: []';
  
  // Create the markdown template
  const template = `---
title: ${title || 'Untitled Book'}
author: ${author || 'Unknown Author'}
date: ${dateString}
rating: ${rating}
${tagsSection}
cover_image: 
amazon_link: 
goodreads_link: 
---

## Summary

A brief summary of the book goes here.

## Key Ideas

* First key idea or takeaway
* Second key idea or takeaway
* Third key idea or takeaway

## Favorite Quotes

> "Quote from the book goes here."

> "Another impactful quote."

## My Thoughts

Share your personal thoughts and reflections on the book here.

## Recommendations

Who would you recommend this book to? Why?

`;

  if (!filename) {
    console.error('Error: Filename is required to generate a book');
    return false;
  }

  try {
    // Write the file
    const filePath = path.join(bookDir, `${filename}.md`);
    fs.writeFileSync(filePath, template);
    
    console.log(`\nCreated new book review: ${filePath}`);
    console.log('\nTo update your website with this new book, run:');
    console.log('npm run compile-static');
    
    return true;
  } catch (error) {
    console.error('Error creating book:', error);
    return false;
  }
}

// Only execute the interactive prompts if the script is run directly
if (require.main === module) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Get parameters from command line
  let filename = process.argv[2];
  let title = process.argv[3];
  let author = process.argv[4]; 
  let tagsInput = process.argv[5];
  let rating = process.argv[6] || ""; // Optional rating parameter

  function promptForMissingInfo() {
    if (!filename) {
      rl.question('Enter the filename (without .md extension): ', answer => {
        filename = answer.trim().toLowerCase().replace(/\s+/g, '-');
        promptForMissingInfo();
      });
      return;
    }
    
    if (!title) {
      rl.question('Enter the book title: ', answer => {
        title = answer.trim();
        promptForMissingInfo();
      });
      return;
    }
    
    if (!author) {
      rl.question('Enter the book author: ', answer => {
        author = answer.trim();
        promptForMissingInfo();
      });
      return;
    }
    
    if (tagsInput === undefined) {
      rl.question('Enter tags (comma-separated, or press Enter for no tags): ', answer => {
        tagsInput = answer.trim();
        promptForMissingInfo();
      });
      return;
    }
    
    if (rating === undefined) {
      rl.question('Enter rating (0-5, can use decimals like 4.5): ', answer => {
        rating = answer.trim();
        promptForMissingInfo();
      });
      return;
    }
    
    generateBook({ filename, title, author, tags: tagsInput, rating });
    rl.close();
  }

  // Start the process
  if (filename && title && author && tagsInput !== undefined) {
    generateBook({ filename, title, author, tags: tagsInput, rating });
    rl.close();
  } else {
    promptForMissingInfo();
  }
}

// Export the book generation function
module.exports = { generateBook }; 