#!/bin/bash

set -e


# This script Compiles and Checks eslint for all plugin samples

# Get the path of the directory containing this script.
THIS_SCRIPT_PATH=$(dirname "$(readlink -f "$0")")

# Calculate the absolute path of the project directory.
PROJECT_DIR=$(realpath "$THIS_SCRIPT_PATH/..")

for SAMPLE in samples/*/; do
  if [ -d "$SAMPLE" ]; then
    # Install dependencies if there is no node_modules 
    if [ ! -d "$SAMPLE/node_modules" ]; then
      cd "$SAMPLE"
      npm ci
      cd "$PROJECT_DIR"
    fi
    # Publish current SDK to the Sample 
    ./scripts/publish-to-project-folder.sh "$SAMPLE"
    # Run check validations
    cd $SAMPLE
    npx tsc
    npm run lint
    cd "$PROJECT_DIR"
  fi
done

echo "Samples are valid"

