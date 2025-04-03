#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const generateEssaysJson = require('./generate-essays-json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Create the essays directory if it doesn't exist
const essayDir = path.join(__dirname, 'essays');
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
  const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
  
  // Create the tags section for frontmatter
  const tagsSection = tags.length > 0 ? `tags: [${tags.join(', ')}]` : 'tags: []';
  
  // Create the markdown template
  const template = `---
title: ${title}
date: ${dateString}
${tagsSection}
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
  
  // Generate the essays.json file
  console.log('\nUpdating essays.json file...');
  if (generateEssaysJson()) {
    console.log('The essay has been added to essays.json and will automatically appear on your website.');
  } else {
    console.log('There was an error updating essays.json. Your essay might not appear on the website.');
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
    rl.question('Enter the essay title: ', answer => {
      title = answer.trim();
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
  
  generateEssay();
}

// Start the process
promptForMissingInfo();

// If all arguments are provided, generate the essay immediately
if (filename && title && tagsInput !== undefined) {
  generateEssay();
} 