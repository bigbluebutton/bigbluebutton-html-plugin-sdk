#!/bin/bash

# This script records a released version in git: it commits the files that carry the version
# number, tags that commit as v<VERSION>, and pushes both the tag and the current branch.
#
# Usage: ./scripts/publish-git-tag.sh <VERSION> [--dry-run]

# Set the "-e" flag to make the script exit immediately if any command fails.
set -e

# Get the path of the directory containing this script.
THIS_SCRIPT_PATH=$(dirname "$(readlink -f "$0")")

# Calculate the absolute path of the project directory.
PROJECT_DIR=$(realpath "$THIS_SCRIPT_PATH/..")

# The version being recorded, and the optional dry-run flag.
VERSION="$1"
DRY_RUN_FLAG="$2"

# Check if the required command line argument is missing.
if [ -z "$VERSION" ]; then
    echo "Usage: $0 <VERSION> [--dry-run]"
    exit 1
fi

# Check that the second argument, when given, is the flag this script knows.
if [ -n "$DRY_RUN_FLAG" ] && [ "$DRY_RUN_FLAG" != "--dry-run" ]; then
    echo "Error: unknown option \"$DRY_RUN_FLAG\"."
    echo "Usage: $0 <VERSION> [--dry-run]"
    exit 1
fi

# Change the working directory to the project directory.
cd "$PROJECT_DIR"

# Reject a version that is not a version, before touching git at all.
node scripts/lib/version.js next "$VERSION" > /dev/null

# Check that the tag is still free, so a re-run does not fail halfway through.
if git rev-parse -q --verify "refs/tags/v$VERSION" > /dev/null; then
    echo "Error: tag v$VERSION already exists."
    exit 1
fi

# Collect the files that carry the version number and are actually present.
FILES_TO_COMMIT=(package.json package-lock.json)

for sample in samples/*/; do
    for version_file in package.json package-lock.json; do
        if [ -f "$sample$version_file" ]; then
            FILES_TO_COMMIT+=("$sample$version_file")
        fi
    done
done

if [ "$DRY_RUN_FLAG" = "--dry-run" ]; then
    echo "[dry-run] git add ${#FILES_TO_COMMIT[@]} version files (package.json/package-lock.json of the project and of the samples)"
    echo "[dry-run] git commit -m \"Bump version to $VERSION\""
    echo "[dry-run] git tag v$VERSION"
    echo "[dry-run] git push origin v$VERSION"
    echo "[dry-run] git push"
    exit 0
fi

git add "${FILES_TO_COMMIT[@]}"

git commit -m "Bump version to $VERSION"

git tag "v$VERSION"

git push origin "v$VERSION"

git push

# Print a message indicating the version was recorded.
echo "Committed, tagged and pushed v$VERSION"
