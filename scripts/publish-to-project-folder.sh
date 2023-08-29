#!/bin/bash

# This script publishes the SDK to a specified folder.
# It's intended for use when trying out a new version of the SDK
# before it's published on npm.

# Set the "-e" flag to make the script exit immediately if any command fails.
set -e

# Get the path of the directory containing this script.
THIS_SCRIPT_PATH=$(dirname "$(readlink -f "$0")")

# Calculate the absolute path of the project directory.
PROJECT_DIR=$(realpath "$THIS_SCRIPT_PATH/..")

# Get the relative path of the target folder from the command line argument.
TARGET_FOLDER_RELATIVE_PATH="$1"

# Resolve the absolute path of the target folder using realpath.
TARGET_FOLDER_RESOLVED_PATH=$(realpath "$TARGET_FOLDER_RELATIVE_PATH")

# Set the target path where the SDK files will be copied to.
RSYNC_TARGET="$TARGET_FOLDER_RESOLVED_PATH/node_modules/bigbluebutton-html-plugin-sdk/dist/"

# Check if the required command line argument is missing.
if [ -z "$TARGET_FOLDER_RELATIVE_PATH" ]; then
    echo "Usage: $0 <TARGET_FOLDER_RELATIVE_PATH>"
    exit 1
fi

# Check if the specified target directory exists.
if [ ! -d "$TARGET_FOLDER_RESOLVED_PATH" ]; then
    echo "Error: Target directory $TARGET_FOLDER_RESOLVED_PATH does not exist."
    exit 1
fi

# Check if the SDK's target directory for rsync exists.
if [ ! -d "$RSYNC_TARGET" ]; then
    echo "Error: Target directory $RSYNC_TARGET does not exist."
    exit 1
fi

# Change the working directory to the project directory.
cd "$PROJECT_DIR"

# Run the npm build script to build the SDK.
if [ \! -d dist/ ]; then
    echo "dist folder not found, building"
    npm install
    npm run build
fi;

# Copy the built SDK files to the specified target directory using rsync.
echo "Publishing SDK to $RSYNC_TARGET"
rsync -a "$PROJECT_DIR/dist/" "$RSYNC_TARGET/" --delete

# Print a message indicating the successful publication of the SDK.
echo "SDK published to $RSYNC_TARGET"

# Change back to the original directory (the directory the script was run from).
cd -

