#!/bin/bash

# Script to create a new note

# Set directory
NOTES_DIR="content/notes"

# Check if the directory exists, create if not
if [ ! -d "$NOTES_DIR" ]; then
  mkdir -p "$NOTES_DIR"
  echo "Created $NOTES_DIR directory"
fi

# Get note details
echo "Enter note details:"
read -p "Title: " title
read -p "Description: " description
read -p "Tags (comma-separated): " tags_input
read -p "Confidence (uncertain/possible/likely/highly likely/certain): " confidence
read -p "Status (notes/draft/in progress/finished): " status

# Format today's date
date=$(date +%Y-%m-%d)

# Create filename from title
filename=$(echo "$title" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd '[:alnum:]-')
filepath="$NOTES_DIR/$filename.md"

# Format tags as YAML array
IFS=',' read -ra tag_array <<< "$tags_input"
formatted_tags="["
for tag in "${tag_array[@]}"; do
  formatted_tags+="\"$(echo $tag | xargs)\", "
done
# Remove trailing comma and space
formatted_tags=${formatted_tags%, }
formatted_tags+="]"

# Generate markdown file
cat > "$filepath" << EOF
---
title: "$title"
date: $date
description: "$description"
tags: $formatted_tags
confidence: "$confidence"
status: "$status"
---

# $title

Brief introduction to the topic.

## Core Principles

- First principle
- Second principle
- Third principle

## Key Points

Main ideas and concepts worth noting about this topic.

## Practical Applications

How these ideas can be applied in real-world scenarios.

## References

- Reference 1
- Reference 2

## Related Notes

- [Related Note 1](#)
- [Related Note 2](#)
EOF

echo "Created new note at $filepath"
echo "You can now edit it with your content editor."
echo "Preview it with 'hugo server' and visit http://localhost:1313/notes/" 