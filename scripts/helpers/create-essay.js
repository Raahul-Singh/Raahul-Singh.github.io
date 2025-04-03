#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Create the essays directory if it doesn't exist
const essayDir = path.join(__dirname, '../../website/essays');
if (!fs.existsSync(essayDir)) {
  fs.mkdirSync(essayDir, { recursive: true });
}

/**
 * Function to create a new essay
 * @param {Object} options - Options for essay creation
 * @param {string} options.filename - Filename for the essay (without .md)
 * @param {string} options.title - Title for the essay
 * @param {string|Array} options.tags - Tags for the essay, either comma-separated string or array
 * @returns {boolean} True if successful, false otherwise
 */
function generateEssay(options = {}) {
  let { filename, title, tags } = options;
  
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
title: ${title || 'Untitled Essay'}
date: ${dateString}
${tagsSection}
status: draft
---

## Introduction

An introduction to your essay topic goes here.

## Main Section

The main content of your essay, with your key arguments and thoughts.

### Subsection 1

Supporting evidence, examples, or deeper exploration of a specific aspect.

### Subsection 2

Additional supporting points or a different perspective on the topic.

## Conclusion

Summarize your main points and present your final thoughts on the topic.

## References

- [Reference 1](https://example.com)
- [Reference 2](https://example.com)

`;

  if (!filename) {
    console.error('Error: Filename is required to generate an essay');
    return false;
  }

  try {
    // Write the file
    const filePath = path.join(essayDir, `${filename}.md`);
    fs.writeFileSync(filePath, template);
    
    console.log(`\nCreated new essay: ${filePath}`);
    console.log('\nTo update your website with this new essay, run:');
    console.log('npm run compile-static');
    
    return true;
  } catch (error) {
    console.error('Error creating essay:', error);
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
  let tagsInput = process.argv[4];

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
    
    generateEssay({ filename, title, tags: tagsInput });
    rl.close();
  }

  // Start the process
  if (filename && title && tagsInput !== undefined) {
    generateEssay({ filename, title, tags: tagsInput });
    rl.close();
  } else {
    promptForMissingInfo();
  }
}

// Export the essay generation function
module.exports = { generateEssay }; 