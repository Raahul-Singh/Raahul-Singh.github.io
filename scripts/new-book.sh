#!/bin/bash

# Script to add a new book to the reading list

BOOKS_DIR="content/reading"

if [ ! -d "$BOOKS_DIR" ]; then
  mkdir -p "$BOOKS_DIR"
fi

echo "Enter book details:"
read -p "Title: " title
read -p "Author: " author
read -p "Description: " description
read -p "Book URL (e.g. Goodreads/Amazon): " book_url
read -p "Cover image URL: " cover_image
read -p "Status (reading/finished) [reading]: " status_input
status=${status_input:-reading}
if [ "$status" != "reading" ] && [ "$status" != "finished" ]; then
  status="reading"
fi

read -p "Tags (comma-separated): " tags_input
IFS=',' read -ra tag_array <<< "$tags_input"
formatted_tags="["
for tag in "${tag_array[@]}"; do
  formatted_tags+="\"$(echo $tag | xargs)\", "
done
formatted_tags=${formatted_tags%, }
formatted_tags+="]"

date=$(date +%Y-%m-%dT%H:%M:%S%z)
filename=$(echo "$title" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd '[:alnum:]-')
filepath="$BOOKS_DIR/$filename.md"

cat > "$filepath" << EOF
---
title: "$title"
author: "$author"
date: $date
description: "$description"
tags: $formatted_tags
status: "$status"
cover_image: "$cover_image"
book_url: "$book_url"
draft: false
---
EOF

echo ""
echo "Created $filepath"
