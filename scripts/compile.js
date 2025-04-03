#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Import helper functions
const generateBooksJson = require('./helpers/generate-books-json');
const generateEssaysJson = require('./helpers/generate-essays-json');

/**
 * Main compilation function - builds the website data
 */
function compileWebsite() {
  console.log('Starting website compilation...');
  
  // Generate JSON files for books and essays
  const booksGenerated = generateBooksJson();
  const essaysGenerated = generateEssaysJson();
  
  if (booksGenerated && essaysGenerated) {
    console.log('Website compilation complete!');
    return true;
  } else {
    console.log('Website compilation had errors. Check the logs above.');
    return false;
  }
}

// Run the compilation if called directly
if (require.main === module) {
  compileWebsite();
}

// Export for use in other scripts
module.exports = { compileWebsite }; 