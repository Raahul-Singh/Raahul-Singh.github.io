#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Create the markdown-books directory if it doesn't exist
const bookDir = path.join(__dirname, 'markdown-books');
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
  const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()) : [];
  
  // Create the markdown template
  const template = `---
title: ${title}
author: ${author}
date: ${dateString}
rating: ${rating}
tags: [${tags.join(', ')}]
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
  
  // Create HTML for books.html
  const month = today.toLocaleString('default', { month: 'long' });
  const day = today.getDate();
  const year = today.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;
  
  const htmlListItem = `<li>
    <a href="book-template.html?book=${filename}">
        <span class="book-title">${title}</span>
        <span class="book-author">by ${author}</span>
        <time datetime="${dateString}">${formattedDate}</time>
    </a>
</li>`;

  console.log('\nHTML for books.html:');
  console.log(htmlListItem);
  
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
  
  if (!tagsInput) {
    rl.question('Enter tags (comma-separated): ', answer => {
      tagsInput = answer.trim();
      promptForMissingInfo();
    });
    return;
  }
  
  if (!rating) {
    rl.question('Enter rating (1-5 stars, leave blank if none): ', answer => {
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
if (filename && title && author && tagsInput) {
  generateBook();
} 