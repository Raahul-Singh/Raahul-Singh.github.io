#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const generateBooksJson = require('./generate-books-json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Create the books directory if it doesn't exist
const bookDir = path.join(__dirname, 'books');
if (!fs.existsSync(bookDir)) {
  fs.mkdirSync(bookDir, { recursive: true });
}

// Get parameters from command line or prompt for them
let filename = process.argv[2];
let title = process.argv[3];
let author = process.argv[4]; 
let tagsInput = process.argv[5];
let rating = process.argv[6] || ""; // Optional rating parameter

function generateBook() {
  // Format the date
  const today = new Date();
  const dateString = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  
  // Parse tags
  const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
  
  // Create the tags section for frontmatter
  const tagsSection = tags.length > 0 ? `tags: [${tags.join(', ')}]` : 'tags: []';
  
  // Create the markdown template
  const template = `---
title: ${title}
author: ${author}
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

  // Write the file
  const filePath = path.join(bookDir, `${filename}.md`);
  fs.writeFileSync(filePath, template);
  
  console.log(`\nCreated new book review: ${filePath}`);
  
  // Generate the books.json file
  console.log('\nUpdating books.json file...');
  if (generateBooksJson()) {
    console.log('The book has been added to books.json and will automatically appear on your website.');
  } else {
    console.log('There was an error updating books.json. Your book might not appear on the website.');
  }
  
  rl.close();
}

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
  
  generateBook();
}

// Start the process
promptForMissingInfo();

// If all arguments are provided, generate the book immediately
if (filename && title && author && tagsInput !== undefined) {
  generateBook();
} 