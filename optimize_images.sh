#!/bin/bash

# Install imagemin-cli if not already installed
if ! command -v imagemin &> /dev/null; then
    npm install -g imagemin-cli imagemin-pngquant imagemin-mozjpeg
fi

# Create optimized directory if it doesn't exist
mkdir -p mainimg/optimized

# Optimize PNG files
for file in mainimg/*.png; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        echo "Optimizing $filename..."
        imagemin "$file" --plugin=pngquant > "mainimg/optimized/$filename"
    fi
done

# Optimize JPG files
for file in mainimg/*.jpg; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        echo "Optimizing $filename..."
        imagemin "$file" --plugin=mozjpeg > "mainimg/optimized/$filename"
    fi
done

echo "Optimization complete! Optimized images are in mainimg/optimized/"
