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
- Status (reading/completed)
- Progress percentage (if reading)
- Confidence level
- Tags (comma-separated)

**Output:**
- Creates a new Markdown file in `content/reading/` with a filename based on the book title
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
- Confidence level
- Status (notes/draft/in progress/finished)

**Output:**
- Creates a new Markdown file in `content/essays/` with a filename based on the essay title
- Includes a structured template with sections for:
  - Introduction
  - Background
  - Main Points (3 sections)
  - Implications
  - Conclusion
  - References

### 3. New Note (`new-note.sh`)

Creates a new note with a predefined template for quick thoughts and ideas.

**Usage:**
```bash
./scripts/new-note.sh
```

**The script will prompt you for:**
- Note title
- Description (appears in listings)
- Tags (comma-separated)
- Confidence level
- Status (notes/draft/in progress/finished)

**Output:**
- Creates a new Markdown file in `content/notes/` with a filename based on the note title
- Includes a structured template with sections for:
  - Core Principles
  - Key Points
  - Practical Applications
  - References
  - Related Notes

## General Notes

- All scripts automatically:
  - Use today's date for the publication date
  - Create URL-friendly filenames from the titles
  - Format tags as proper YAML arrays
  - Include confidence and status metadata
  - Apply a consistent structure to maintain site cohesiveness

- After running any script, you can:
  - Edit the generated file to add your actual content
  - Preview your site using `hugo server`
  - The new content will automatically appear in the appropriate section of your site

## File Locations

- Book reviews are stored in: `content/reading/`
- Essays are stored in: `content/essays/`
- Notes are stored in: `content/notes/` 