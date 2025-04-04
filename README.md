# Raahul Singh's Personal Website

A clean, minimal personal website built with Hugo and the Gwern-inspired theme.

## Features

- **Essays:** Long-form writing on various topics
- **Notes:** Shorter thoughts and ideas
- **Reading List:** Book reviews and reading tracker
- **Dark/Light Mode:** Toggle between dark and light themes
- **Confidence Tags:** Indicate certainty level for content
- **Mobile Responsive:** Works well on all devices

## Local Development

To run the site locally:

```bash
# Install Hugo if you haven't already
# macOS:
brew install hugo

# Start the development server
hugo server --baseURL="http://localhost:1313/"
```

The site will be available at http://localhost:1313/

## Content Creation

The repository includes helper scripts for creating new content:

- `./scripts/new-essay.sh` - Create a new essay
- `./scripts/new-note.sh` - Create a new note
- `./scripts/new-book.sh` - Create a new book review

Each script will prompt for necessary metadata and generate a file with the appropriate template.

## Directory Structure

```
content/             # Site content
├── _index.md        # Homepage content
├── essays/          # Essays section
├── notes/           # Notes section
└── reading/         # Reading list section

static/              # Static assets
├── css/             # CSS files
└── images/          # Image files

themes/              # Hugo themes
└── gwern-inspired/  # Custom Gwern-inspired theme

scripts/             # Helper scripts
└── ...              # Content creation scripts
```

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `master` branch using GitHub Actions.

## License

Content is copyright © Raahul Singh. The theme and code are MIT licensed.

## Acknowledgements

- Based on the aesthetic principles of [gwern.net](https://gwern.net)
- Built with [Hugo](https://gohugo.io/)
- Deployed with [GitHub Pages](https://pages.github.com/) 