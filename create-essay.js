#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Create the markdown-essays directory if it doesn't exist
const essayDir = path.join(__dirname, 'markdown-essays');
if (!fs.existsSync(essayDir)) {
  fs.mkdirSync(essayDir, { recursive: true });
}

// Get filename from command line or prompt for it
let filename = process.argv[2];
let title = process.argv[3];
let tagsInput = process.argv[4];

function generateEssay() {
  // Format the date
  const today = new Date();
  const dateString = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  
  // Parse tags
  const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()) : [];
  
  // Create the markdown template
  const template = `---
title: ${title}
date: ${dateString}
tags: [${tags.join(', ')}]
---

## Abstract

Write your abstract here. This should be a brief summary of the essay.

## Introduction

Write your introduction here. Explain the topic and why it's interesting or important.

`;

  // Write the file
  const filePath = path.join(essayDir, `${filename}.md`);
  fs.writeFileSync(filePath, template);
  
  console.log(`\nCreated new essay: ${filePath}`);
  
  // Create HTML for essays.html
  const month = today.toLocaleString('default', { month: 'long' });
  const day = today.getDate();
  const year = today.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;
  
  const htmlListItem = `<li>
    <a href="essay-template.html?essay=${filename}">
        <h3>${title}</h3>
        <time datetime="${dateString}">${formattedDate}</time>
        <p>Brief description of the essay...</p>
        <div class="tags">
            ${tags.map(tag => `<span class="tag">${tag}</span>`).join('\n            ')}
        </div>
    </a>
</li>`;

  console.log('\nHTML for essays.html:');
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
    rl.question('Enter the essay title: ', answer => {
      title = answer.trim();
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
  
  generateEssay();
}

// Start the process
promptForMissingInfo();

// If all arguments are provided, generate the essay immediately
if (filename && title && tagsInput) {
  generateEssay();
} 