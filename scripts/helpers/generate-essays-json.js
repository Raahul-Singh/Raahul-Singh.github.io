#!/usr/bin/env node

/**
 * This script scans the essays directory and generates a JSON file
 * containing metadata for all essays. This avoids the need for
 * directory listing on the server or hardcoding filenames.
 */

const fs = require('fs');
const path = require('path');

// Path to essays directory and output file
const essaysDir = path.join(__dirname, '../../website/essays');
const outputFile = path.join(__dirname, '../../website/essays.json');

/**
 * Extract frontmatter from a markdown file
 */
function extractFrontmatter(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract frontmatter between --- markers
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) return null;
    
    const frontmatter = {};
    const frontmatterContent = match[1];
    
    // Parse each line
    frontmatterContent.split('\n').forEach(line => {
      const colonPos = line.indexOf(':');
      if (colonPos !== -1) {
        const key = line.slice(0, colonPos).trim();
        let value = line.slice(colonPos + 1).trim();
        
        // Handle arrays in frontmatter
        if (value.startsWith('[') && value.endsWith(']')) {
          value = value.slice(1, -1).split(',').map(item => item.trim());
        }
        
        frontmatter[key] = value;
      }
    });
    
    return frontmatter;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return null;
  }
}

/**
 * Generate the essays.json file
 */
function generateEssaysJson() {
  try {
    // Check if essays directory exists
    if (!fs.existsSync(essaysDir)) {
      console.error(`Essays directory not found: ${essaysDir}`);
      return false;
    }
    
    // Make sure the website directory exists
    const websiteDir = path.dirname(outputFile);
    if (!fs.existsSync(websiteDir)) {
      fs.mkdirSync(websiteDir, { recursive: true });
    }
    
    // Read all files in the essays directory
    const files = fs.readdirSync(essaysDir);
    
    // Filter for markdown files and extract metadata
    const essays = files
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const filePath = path.join(essaysDir, file);
        const frontmatter = extractFrontmatter(filePath);
        
        if (!frontmatter) {
          console.warn(`Could not extract frontmatter from ${file}`);
          return null;
        }
        
        return {
          id: file.replace('.md', ''),
          filename: file,
          title: frontmatter.title || 'Untitled Essay',
          date: frontmatter.date || new Date().toISOString().split('T')[0],
          status: frontmatter.status || 'draft',
          tags: frontmatter.tags || []
        };
      })
      .filter(essay => essay !== null);
    
    // Sort essays by date (newest first)
    essays.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Write the JSON file
    fs.writeFileSync(outputFile, JSON.stringify(essays, null, 2));
    
    console.log(`Generated essays.json with ${essays.length} essays`);
    return true;
  } catch (error) {
    console.error('Error generating essays.json:', error);
    return false;
  }
}

// Run the function if called directly
if (require.main === module) {
  generateEssaysJson();
}

// Export for use in other scripts
module.exports = generateEssaysJson; 