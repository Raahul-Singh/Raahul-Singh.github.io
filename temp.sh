#!/bin/bash

# Check if the correct number of arguments are passed
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <source_file> <destination_directory>"
    exit 1
fi

# Assign command line arguments to variables
source_file=$1
destination_dir=$2

# Check if source file exists
if [ ! -f "$source_file" ]; then
    echo "Source file does not exist."
    exit 1
fi

# Check if destination directory exists, if not create it
if [ ! -d "$destination_dir" ]; then
    echo "Destination directory does not exist. Creating it now."
    mkdir -p "$destination_dir"
fi

# Read the filenames from the destination directory
# If you want to limit the file types, adjust the ls command accordingly
for filename in $(ls $destination_dir); do
    # Use the filename (without extension) to create new file names
    base_name=$(basename -- "$filename")
    name="${base_name%.*}"

    # Copy the source file to the new filename in the destination directory
    cp "$source_file" "${destination_dir}/${name}.png"
    echo "Copied $source_file to ${destination_dir}/${name}.png"
done

echo "All files copied successfully."
# ./copy_with_names.sh src/img/themelange.png src/img/icons
