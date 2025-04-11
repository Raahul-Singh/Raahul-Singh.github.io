#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "Building website..."

# First compile the resume
echo "Compiling resume..."
./static/resume/compile.sh
if [ $? -ne 0 ]; then
    echo -e "${RED}Resume compilation failed. Aborting build.${NC}"
    exit 1
fi

# Then build the Hugo site
echo "Building Hugo site..."
hugo
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Website built successfully!${NC}"
else
    echo -e "${RED}Hugo build failed${NC}"
    exit 1
fi 