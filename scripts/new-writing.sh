#!/bin/bash

# Script to create a new writing file

# Set directory
WRITINGS_DIR="content/writings"

# Check if the directory exists, create if not
if [ ! -d "$WRITINGS_DIR" ]; then
  mkdir -p "$WRITINGS_DIR"
  echo "Created $WRITINGS_DIR directory"
fi

# Get writing details
echo "Enter writing details:"
read -p "Title: " title
read -p "Description: " description
read -p "Tags (comma-separated): " tags_input
read -p "Confidence (uncertain/possible/likely/highly likely/certain) [uncertain]: " confidence_input

# Set default for confidence if empty
confidence=${confidence_input:-uncertain}

# Format today's date with time
date=$(date +%Y-%m-%dT%H:%M:%S%z)

# Create filename from title
filename=$(echo "$title" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd '[:alnum:]-')
filepath="$WRITINGS_DIR/$filename.md"

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
status: "finished"
confidence: "$confidence"
released: false
draft: true
---

## Introduction

Introduce the main topic and provide context. Explain why this topic is important or interesting and what readers can expect to learn from this writing.

## Background

Provide relevant background information on the topic. This could include:
- Historical context
- Previous research or discussions
- Key terminology or concepts

## Main Point 1

Present your first main point with supporting evidence and examples.

### Supporting Evidence

Elaborate on the supporting evidence for your first point.

## Main Point 2

Present your second main point with supporting evidence and examples.

### Supporting Evidence

Elaborate on the supporting evidence for your second point.

## Main Point 3

Present your third main point with supporting evidence and examples.

### Supporting Evidence

Elaborate on the supporting evidence for your third point.

## Implications

Discuss the implications of your arguments. This could include:
- Practical applications
- Theoretical significance
- Future directions

## Conclusion

Summarize your main points and restate the significance of the topic. Offer final thoughts or recommendations.

## References

1. First reference
2. Second reference
3. Third reference
EOF

echo "Created new writing file at $filepath"
echo "You can now edit it with your content editor."
echo "Preview it with 'hugo server' and visit http://localhost:1313/writings/" 