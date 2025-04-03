#!/usr/bin/env node

/**
 * Main entry point for the personal website
 * 
 * This file provides convenient exports for all scripts
 */

const { compileStatic } = require('./scripts/compile-static');
const { deploy } = require('./scripts/deploy');
const { generateBook } = require('./scripts/helpers/create-book');
const { generateEssay } = require('./scripts/helpers/create-essay');

/**
 * Main function to run the requested script based on command line args
 */
function run() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch (command) {
    case 'create-book':
      require('./scripts/helpers/create-book');
      break;
    case 'create-essay':
      require('./scripts/helpers/create-essay');
      break;
    case 'compile-static':
      compileStatic();
      break;
    case 'deploy':
      deploy();
      break;
    default:
      console.log('Available commands:');
      console.log('  create-book    - Create a new book review');
      console.log('  create-essay   - Create a new essay');
      console.log('  compile-static - Generate static HTML from markdown');
      console.log('  deploy         - Deploy to GitHub Pages');
      console.log('\nOr use npm scripts defined in package.json');
  }
}

// Run if called directly
if (require.main === module) {
  run();
}

// Export all functions for programmatic use
module.exports = {
  compileStatic,
  deploy,
  generateBook,
  generateEssay
}; 