#!/usr/bin/env node

/**
 * This script handles the deployment process for GitHub Pages
 * It compiles the JSON files and ensures all necessary files are in place
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { compileStatic } = require('./compile-static');

/**
 * Main deployment function
 */
function deploy() {
  console.log('Starting deployment process for GitHub Pages...');
  
  try {
    // Step 1: Run the static compilation process
    console.log('Compiling website with static HTML...');
    const compilationSuccess = compileStatic();
    
    if (!compilationSuccess) {
      console.error('Static compilation failed. Deployment aborted.');
      process.exit(1);
    }
    
    // Step 2: Create .nojekyll file to disable Jekyll processing
    console.log('Setting up GitHub Pages deployment...');
    const nojekyllPath = path.join(__dirname, '../website/.nojekyll');
    fs.writeFileSync(nojekyllPath, '');
    console.log('Created .nojekyll file in website directory');
    
    // Provide deployment instructions
    console.log('\nDeployment preparation complete!');
    console.log('\nTo deploy to GitHub Pages:');
    console.log('1. Verify your compiled website in the "website" directory');
    console.log('2. Use one of these methods:');
    console.log('   a. If using GitHub Pages with a custom domain:');
    console.log('      - Create a CNAME file in the website directory with your domain name');
    console.log('   b. Deploy directly from GitHub:');
    console.log('      - Go to your repository settings → Pages');
    console.log('      - Select branch: gh-pages, folder: / (root)');
    console.log('   c. Or manually from command line:');
    console.log('      - git subtree push --prefix website origin gh-pages');
    
    console.log('\nDeployment process completed successfully!');
  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
}

// Run the deployment if called directly
if (require.main === module) {
  deploy();
}

// Export for use in other scripts
module.exports = { deploy }; 