// New Book Template Generator

/**
 * Use this function in the browser console to generate a template for a new book review.
 * For example:
 *   generateNewBookTemplate('title-of-book', 'Title of Book', 'Author Name', ['Tag1', 'Tag2'], '★★★★☆')
 * 
 * @param {string} filename - The filename to use (without .md extension)
 * @param {string} title - The title of the book
 * @param {string} author - The author of the book
 * @param {Array<string>} tags - Array of tags for the book
 * @param {string} rating - Optional rating (e.g., '★★★★☆')
 * @returns {string} Markdown template that can be copied to a new file
 */
function generateNewBookTemplate(filename, title, author, tags = [], rating = '') {
    const today = new Date();
    const dateString = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    
    let template = `---
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

    console.log('Book template for: ' + title + ' by ' + author);
    console.log('Filename should be: markdown-books/' + filename + '.md');
    console.log('\n');
    console.log(template);
    
    // Create a link for the book listing in books.html
    const month = today.toLocaleString('default', { month: 'long' });
    const day = today.getDate();
    const year = today.getFullYear();
    const formattedDate = `${month} ${day}, ${year}`;
    
    let htmlListItem = `<li>
    <a href="book-template.html?book=${filename}">
        <span class="book-title">${title}</span>
        <span class="book-author">by ${author}</span>
        <time datetime="${dateString}">${formattedDate}</time>
    </a>
</li>`;

    console.log('\nHTML for books.html:');
    console.log(htmlListItem);
    
    return template;
}

// Example usage (comment this out in production)
// generateNewBookTemplate('example-book', 'Example Book Title', 'Example Author', ['Fiction', 'Fantasy'], '★★★★☆'); 