# Content Helper Scripts

This directory contains helper scripts to streamline the creation of new content for your Hugo-based website.

## Available Scripts

### 1. New Book Review (`new-book.sh`)

Creates a new book review with a predefined template for consistent formatting.

**Usage:**
```bash
./scripts/new-book.sh
```

**The script will prompt you for:**
- Book title
- Author name
- Description (appears in listings)
- Rating (1-5)
- Amazon image URL for the book cover
- Tags (comma-separated)

**Output:**
- Creates a new Markdown file in `content/books/` with a filename based on the book title
- Includes a structured template with sections for:
  - Summary
  - Key Concepts
  - Strengths
  - Weaknesses
  - Personal Reflections
  - Favorite Quotes
  - Conclusion

### 2. New Essay (`new-essay.sh`)

Creates a new essay with a predefined template for consistent formatting.

**Usage:**
```bash
./scripts/new-essay.sh
```

**The script will prompt you for:**
- Essay title
- Description (appears in listings)
- Tags (comma-separated)
- Featured image URL (optional)

**Output:**
- Creates a new Markdown file in `content/essays/` with a filename based on the essay title
- Includes a structured template with sections for:
  - Introduction
  - Background
  - Main Points (3 sections)
  - Implications
  - Conclusion
  - References

## General Notes

- Both scripts automatically:
  - Use today's date for the publication date
  - Create URL-friendly filenames from the titles
  - Format tags as proper YAML arrays
  - Apply a consistent structure to maintain site cohesiveness

- After running either script, you can:
  - Edit the generated file to add your actual content
  - Preview your site using `hugo server -D`
  - The new content will automatically appear in the appropriate section of your site

## File Locations

- Book reviews are stored in: `content/books/`
- Essays are stored in: `content/essays/` 