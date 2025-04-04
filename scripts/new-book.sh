#!/bin/bash

# Script to create a new book review

# Set directory
BOOKS_DIR="content/reading"

# Check if the directory exists, create if not
if [ ! -d "$BOOKS_DIR" ]; then
  mkdir -p "$BOOKS_DIR"
  echo "Created $BOOKS_DIR directory"
fi

# Get book details
echo "Enter book details:"
read -p "Title: " title
read -p "Author: " author
read -p "Description: " description
read -p "Rating (1-5): " rating
read -p "Amazon image URL: " cover_image
read -p "Status (reading/finished): " status
read -p "Progress (0-100) if reading: " progress
read -p "Confidence (uncertain/possible/likely/highly likely/certain): " confidence
read -p "Released (true/false, determines if published to RSS feed): " released
read -p "Tags (comma-separated): " tags_input

# Format today's date
date=$(date +%Y-%m-%d)

# Create filename from title
filename=$(echo "$title" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd '[:alnum:]-')
filepath="$BOOKS_DIR/$filename.md"

# Format tags as YAML array
IFS=',' read -ra tag_array <<< "$tags_input"
formatted_tags="["
for tag in "${tag_array[@]}"; do
  formatted_tags+="\"$(echo $tag | xargs)\", "
done
# Remove trailing comma and space
formatted_tags=${formatted_tags%, }
formatted_tags+="]"

# Generate markdown file with conditional progress field
progress_field=""
if [ "$status" = "reading" ] && [ -n "$progress" ]; then
  progress_field="progress: $progress"
fi

# Generate markdown file
cat > "$filepath" << EOF
---
title: "$title"
author: "$author"
date: $date
description: "$description"
tags: $formatted_tags
rating: $rating
status: "$status"
confidence: "$confidence"
released: $released
$([ -n "$progress_field" ] && echo "$progress_field")
cover_image: "$cover_image"
draft: true
---

## Summary

Add a brief summary of the book here.

## Key Concepts

### Concept 1

Explain the first key concept.

### Concept 2

Explain the second key concept.

### Concept 3

Explain the third key concept.

## Strengths

- First strength
- Second strength
- Third strength

## Weaknesses

- First weakness
- Second weakness
- Third weakness

## Personal Reflections

Add your personal reflections on the book here.

## Favorite Quotes

> "First memorable quote from the book."

> "Second memorable quote from the book."

## Conclusion

Add your concluding thoughts about the book here.

---

*Rating: $rating/5 - Add a one-line summary of your rating.*
EOF

echo "Created new book review at $filepath"
echo "You can now edit it with your content editor."
echo "Preview it with 'hugo server' and visit http://localhost:1313/reading/" 