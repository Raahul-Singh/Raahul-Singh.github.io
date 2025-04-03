# Raahul Singh's Personal Website

This is the source code for my personal website where I share essays and projects. The site is built with plain HTML, CSS, and JavaScript.

## Features

- Responsive design that works on desktop and mobile
- Dark mode toggle with automatic system preference detection
- Clean, content-focused layout
- Markdown-based essay system
- MathJax integration for mathematical notation
- Resume download functionality
- Contact form for direct communication
- Smooth page transitions
- Social media integration

## Structure

- `index.html` - Home page
- `essays.html` - Collection of all essays
- `books.html` - Collection of all book notes
- `about.html` - About me page
- `contact.html` - Contact form and information
- `essay-template.html` - Template for individual essays
- `book-template.html` - Template for individual book notes
- `css/` - Stylesheets
- `js/` - JavaScript files
- `essays/` - Markdown files for essays
- `markdown-books/` - Markdown files for book notes
- `assets/` - Resume and other downloadable files

## Adding New Content

### Adding New Essays

You can add new essays using the provided script:

```bash
# Run the interactive script
node create-essay.js

# Or provide all arguments at once:
node create-essay.js filename "Essay Title" "tag1,tag2,tag3"
```

The script will:
1. Create a new Markdown file in the `essays/` directory
2. Generate a frontmatter template with title, date, and tags
3. Include placeholder sections for your essay content
4. Output the HTML code you can add to `essays.html` to link to your new essay

Once created, edit the Markdown file to add your essay content. The essay will automatically appear on the website when navigating to `essay-template.html?essay=filename`.

### Adding New Book Notes

You can add new book notes using the provided script:

```bash
# Run the interactive script
node create-book.js

# Or provide all arguments at once:
node create-book.js filename "Book Title" "Author Name" "tag1,tag2,tag3" "Rating"
```

The script will:
1. Create a new Markdown file in the `markdown-books/` directory
2. Generate a frontmatter template with title, author, date, rating, and tags
3. Include placeholder sections for your book notes
4. Output the HTML code you can add to `books.html` to link to your new book

Once created, edit the Markdown file to add your book notes. The book notes will automatically appear on the website when navigating to `book-template.html?book=filename`.

## Social Media Integration

This website includes social media integration in the footer. To customize your social media links:

1. Edit the footer section in the HTML files (such as `index.html`, `about.html`, etc.)
2. Add or modify the social media links using the provided social icon styles
3. Update the URLs to point to your profiles

Example of adding a social media link:

```html
<a href="https://twitter.com/yourusername" class="social-link twitter-link" aria-label="Twitter">
    <svg class="social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    </svg>
</a>
```

Supported social platforms:
- Twitter/X
- LinkedIn
- GitHub
- Instagram
- Facebook
- YouTube
- Medium
- Mastodon

## Local Development

To run the website locally:

1. Clone this repository
2. Open `index.html` in your browser

Or use a local server:

```bash
# Using Python 3
python -m http.server

# Or with Node.js
npx serve
```

## Contact Form Setup

The contact form uses [Formspree](https://formspree.io) for handling form submissions. To make it work:

1. Sign up for a Formspree account
2. Create a new form and replace the placeholder email in the form action URL
3. Confirm your email with Formspree

## Acknowledgments

This website was created with the assistance of [Cursor](https://cursor.sh/), an AI-powered code editor. The use of Cursor greatly enhanced the development process, allowing for more efficient implementation of features and design elements.

## Contact

Email: [raahulsingh002@gmail.com](mailto:raahulsingh002@gmail.com)
GitHub: [Raahul-Singh](https://github.com/Raahul-Singh) 