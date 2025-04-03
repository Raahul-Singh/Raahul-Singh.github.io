#!/usr/bin/env node

/**
 * This script is a launcher for creating new content (books and essays).
 * It provides a simple CLI interface to choose what content to create.
 */

const readline = require('readline');
const { generateBook } = require('./helpers/create-book');
const { generateEssay } = require('./helpers/create-essay');
const { compileWebsite } = require('./compile');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log('\nRaahul Singh Website Content Creator');
  console.log('===================================');
  console.log('1. Create a new book review');
  console.log('2. Create a new essay');
  console.log('3. Compile website');
  console.log('4. Exit');
  console.log('');
  
  rl.question('Choose an option (1-4): ', answer => {
    switch (answer.trim()) {
      case '1':
        console.log('\nCreating a new book review...');
        rl.close();
        // The create-book script will handle its own user input
        require('./helpers/create-book');
        break;
      
      case '2':
        console.log('\nCreating a new essay...');
        rl.close();
        // The create-essay script will handle its own user input
        require('./helpers/create-essay');
        break;
      
      case '3':
        console.log('\nCompiling website...');
        compileWebsite();
        rl.close();
        break;
      
      case '4':
        console.log('\nExiting...');
        rl.close();
        break;
      
      default:
        console.log('\nInvalid option. Please try again.');
        showMenu();
        break;
    }
  });
}

// Display the menu when the script is run
showMenu(); 