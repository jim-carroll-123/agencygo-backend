#!/bin/bash

# Remove and recreate /app/dist/scraper/temp directory
rm -rf "./src/scraper/temp"
mkdir -p "./src/scraper/temp"

# Remove and recreate /app/dist/scraper/uploads directory
rm -rf "./src/scraper/uploads"
mkdir -p "./src/scraper/uploads"
