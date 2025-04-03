# Raahul Singh's Personal Website

This is the source code for my personal website where I share essays and projects. The site is built with plain HTML, CSS, and JavaScript.

## Features

- Responsive design that works on desktop and mobile
- Dark mode toggle with automatic system preference detection
- Clean, content-focused layout
- Markdown-based essay and book notes system with automatic content management
- Automatic generation of content metadata via JSON files
- Tag-based content organization
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
- `essays.json` - Automatically generated metadata for all essays
- `books.json` - Automatically generated metadata for all books
- `css/` - Stylesheets
- `js/` - JavaScript files
- `essays/` - Markdown files for essays
- `books/` - Markdown files for book notes
- `assets/` - Resume and other downloadable files

## Adding New Content

### Adding New Essays

You can add new essays using the provided script:

```bash
# Run the interactive script
node create-essay.js

# Or provide all arguments at once:
node create-essay.js filename "Essay Title" "tag1,tag2,tag3"

# To create an essay without tags, simply press Enter when prompted for tags,
# or use empty quotes in the command line:
node create-essay.js filename "Essay Title" ""
```

The script will:
1. Create a new Markdown file in the `essays/` directory
2. Generate a frontmatter template with title, date, and optional tags
3. Include placeholder sections for your essay content
4. Automatically update `essays.json` with the new essay metadata

Once created, edit the Markdown file to add your essay content. The essay will automatically appear on the website when you reload the pages.

### Adding New Book Notes

You can add new book notes using the provided script:

```bash
# Run the interactive script
node create-book.js

# Or provide all arguments at once:
node create-book.js filename "Book Title" "Author Name" "tag1,tag2,tag3" "Rating"

# To create a book note without tags, simply press Enter when prompted for tags,
# or use empty quotes in the command line:
node create-book.js filename "Book Title" "Author Name" "" "Rating"
```

The script will:
1. Create a new Markdown file in the `books/` directory
2. Generate a frontmatter template with title, author, date, rating, and optional tags
3. Include placeholder sections for your book notes
4. Automatically update `books.json` with the new book metadata

Once created, edit the Markdown file to add your book notes. The book notes will automatically appear on the website when you reload the pages.

> **Note**: Books are displayed in chronological order with the most recent at the top. Tags are shown with each book but are not used for categorization.

### Updating Content Metadata

If you manually edit frontmatter in your Markdown files, you can regenerate the metadata files using:

```bash
# Update essays metadata
node generate-essays-json.js

# Update books metadata
node generate-books-json.js
```

These scripts will scan all Markdown files in their respective directories and generate updated JSON files with metadata.

### Automating JSON Generation

For automatic generation of the JSON files at startup or deployment, you can add these scripts to your build process or setup scripts. For example, if using a CI/CD pipeline, you can add:

```bash
# Generate both JSON files
node generate-essays-json.js && node generate-books-json.js
```

For local development, you might want to run these scripts before starting your server:

```bash
# Example startup script (package.json)
"scripts": {
  "prestart": "node generate-essays-json.js && node generate-books-json.js",
  "start": "npx serve"
}
```

This ensures your content metadata is always up-to-date.

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