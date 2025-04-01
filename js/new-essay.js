// New Essay Template Generator

/**
 * Use this function in the browser console to generate a template for a new essay.
 * For example:
 *   generateNewEssayTemplate('title-of-your-essay', 'Title of Your Essay', ['Tag1', 'Tag2'])
 * 
 * @param {string} filename - The filename to use (without .md extension)
 * @param {string} title - The title of the essay
 * @param {Array<string>} tags - Array of tags for the essay
 * @returns {string} Markdown template that can be copied to a new file
 */
function generateNewEssayTemplate(filename, title, tags = []) {
    const today = new Date();
    const dateString = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    
    let template = `---
title: ${title}
date: ${dateString}
tags: [${tags.join(', ')}]
---

## Abstract

Write your abstract here. This should be a brief summary of the essay.

## Introduction

Write your introduction here. Explain the topic and why it's interesting or important.

`;

    console.log('Essay template for: ' + title);
    console.log('Filename should be: markdown-essays/' + filename + '.md');
    console.log('\n');
    console.log(template);
    
    // Create a link for the essay listing in essays.html
    const month = today.toLocaleString('default', { month: 'long' });
    const day = today.getDate();
    const year = today.getFullYear();
    const formattedDate = `${month} ${day}, ${year}`;
    
    let htmlListItem = `<li>
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
    
    return template;
}

// Example usage (comment this out in production)
// generateNewEssayTemplate('example-essay', 'Example Essay Title', ['Example', 'Tutorial']); 