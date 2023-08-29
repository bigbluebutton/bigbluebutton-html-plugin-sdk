#!/bin/bash

# This script updates the SDK in sample folders within the "samples/" directory
# with a new version. It's intended for use when trying out a new version of the SDK
# before it's published on npm.

# Change to the directory where the script is located
cd "$(dirname "$0")"
cd ..

# Find and update SDK in each sample folder
for SAMPLE in samples/*/; do
    if [ -d "$SAMPLE" ]; then
        ./scripts/publish-to-project-folder.sh "$SAMPLE"
    fi
done

echo "SDK update process completed for all sample folders."

