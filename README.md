# Raahul Singh's Personal Website

A clean, minimalist website for publishing essays and book reviews, inspired by gwern.net.

## Structure

The repository is organized into two main folders:

1. `scripts/` - Contains all scripts for generating and maintaining content
2. `website/` - Contains the actual website content

### Scripts

- `scripts/create-content.js` - Main entry point for creating new content
- `scripts/compile.js` - Compiles JSON files from markdown content
- `scripts/compile-static.js` - Compiles static HTML from JSON data
- `scripts/deploy.js` - Handles GitHub Pages deployment preparation
- `scripts/helpers/` - Helper scripts:
  - `create-book.js` - Creates a new book review markdown file
  - `create-essay.js` - Creates a new essay markdown file
  - `generate-books-json.js` - Generates the books.json file from markdown files
  - `generate-essays-json.js` - Generates the essays.json file from markdown files
  - `markdown-parser.js` - Parses markdown to HTML

### Website

- `website/books/` - Book review markdown files
- `website/essays/` - Essay markdown files
- `website/css/` - Stylesheets
- `website/js/` - JavaScript files
- `website/assets/` - Images and other assets

## Getting Started

### Prerequisites

- Node.js (v14 or higher)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Commands

- `npm start` - Compile the static website and start a local server
- `npm run create` - Launch the content creation menu
- `npm run create-book` - Create a new book review
- `npm run create-essay` - Create a new essay
- `npm run compile` - Generate JSON files from markdown
- `npm run compile-static` - Generate static HTML pages
- `npm run deploy` - Prepare the website for GitHub Pages deployment

## Creating Content

### Creating a Book Review

1. Run `npm run create-book`
2. Enter the requested information:
   - Filename (will be used in the URL)
   - Book title
   - Author
   - Tags (comma-separated)
   - Rating (0-5, can use decimals like 4.5)

### Creating an Essay

1. Run `npm run create-essay`
2. Enter the requested information:
   - Filename (will be used in the URL)
   - Essay title
   - Tags (comma-separated)

## Compilation Process

When you run `npm run compile-static`, the following happens:

1. The system scans all book and essay markdown files
2. It extracts metadata from frontmatter and generates JSON files
3. It generates static HTML for all pages with content from the JSON files
4. All pages are ready to be served without any client-side content loading

## Deployment to GitHub Pages

This website is designed to be easily deployed to GitHub Pages.

### GitHub Pages Setup

1. Run `npm run compile-static` to build the static site
2. Run `npm run deploy` to prepare for GitHub Pages deployment
3. Go to your GitHub repository settings → Pages
4. Select the branch where you want to deploy (e.g., gh-pages)
5. Select the folder as `/` (root) or `/docs` depending on your setup
6. Click Save

### Manual Deployment

To manually deploy to GitHub Pages:

1. Run `npm run compile-static` to build the static site
2. Use one of these methods:
   - Create a new branch for deployment: `git checkout -b gh-pages`
   - Use git subtree: `git subtree push --prefix website origin gh-pages`
   - Or copy the website folder contents to your gh-pages branch

### Using a Custom Domain

If you have a custom domain:

1. Create a file named `CNAME` in the website directory
2. Add your domain name to this file (e.g., `yourdomain.com`)
3. Configure your DNS provider as specified in GitHub Pages documentation
4. In your GitHub repository settings → Pages, add your custom domain

## License

MIT

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