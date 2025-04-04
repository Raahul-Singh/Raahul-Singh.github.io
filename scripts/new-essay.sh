#!/bin/bash

# Script to create a new essay

# Set directory
ESSAYS_DIR="content/essays"

# Check if the directory exists, create if not
if [ ! -d "$ESSAYS_DIR" ]; then
  mkdir -p "$ESSAYS_DIR"
  echo "Created $ESSAYS_DIR directory"
fi

# Get essay details
echo "Enter essay details:"
read -p "Title: " title
read -p "Description: " description
read -p "Tags (comma-separated): " tags_input
read -p "Featured image URL (optional, press Enter to skip): " featured_image

# Format today's date
date=$(date +%Y-%m-%d)

# Create filename from title
filename=$(echo "$title" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd '[:alnum:]-')
filepath="$ESSAYS_DIR/$filename.md"

# Format tags as YAML array
IFS=',' read -ra tag_array <<< "$tags_input"
formatted_tags="["
for tag in "${tag_array[@]}"; do
  formatted_tags+="\"$(echo $tag | xargs)\", "
done
# Remove trailing comma and space
formatted_tags=${formatted_tags%, }
formatted_tags+="]"

# Generate featured image line if provided
featured_image_line=""
if [ ! -z "$featured_image" ]; then
  featured_image_line="featured_image: \"$featured_image\""
fi

# Generate markdown file
cat > "$filepath" << EOF
---
title: "$title"
date: $date
description: "$description"
tags: $formatted_tags
${featured_image_line}
---

## Introduction

Begin your essay with an engaging introduction that sets the context and presents your main argument or thesis.

## Background

Provide any necessary background information or context that the reader needs to understand your topic.

## Main Point 1

Develop your first main point or argument. Use evidence, examples, and logical reasoning to support your claims.

## Main Point 2

Develop your second main point or argument. Consider addressing counterarguments or alternative perspectives.

## Main Point 3

Develop your third main point or argument. Continue building a compelling case for your thesis.

## Implications

Discuss the broader implications of your argument. Why does this matter? What can we learn from it?

## Conclusion

Summarize your key points and restate your thesis in a new light. Consider ending with a thought-provoking question or call to action.

## References

- Reference 1
- Reference 2
- Reference 3
EOF

echo "Created new essay at $filepath"
echo "You can now edit it with your content editor."
echo "Preview it with 'hugo server -D' and visit http://localhost:1313/essays/" 