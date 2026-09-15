#!/bin/bash

# This script publishes the package currently in the working tree to npm.
#
# The dist-tag is derived from the version itself: a stable version is published as "latest",
# while a pre-release is published under its own channel ("beta", "rc", ...), so that installing
# the package without asking for a tag keeps returning the stable release.
#
# Usage: ./scripts/publish-to-npm.sh <VERSION> [--dry-run]

# Set the "-e" flag to make the script exit immediately if any command fails.
set -e

# Get the path of the directory containing this script.
THIS_SCRIPT_PATH=$(dirname "$(readlink -f "$0")")

# Calculate the absolute path of the project directory.
PROJECT_DIR=$(realpath "$THIS_SCRIPT_PATH/..")

# The version being published, and the optional dry-run flag.
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

# Resolve the dist-tag. This also rejects a version npm could not publish sanely.
DIST_TAG=$(node scripts/lib/version.js dist-tag "$VERSION")

# Get the name and the version currently declared in the project's package.json.
DEPENDENCY_NAME=$(node -pe "require('./package.json').name")
PACKAGE_VERSION=$(node -pe "require('./package.json').version")

# npm publishes whatever package.json declares, so refuse to run when the two disagree.
if [ "$PACKAGE_VERSION" != "$VERSION" ]; then
    if [ "$DRY_RUN_FLAG" != "--dry-run" ]; then
        echo "Error: package.json declares version $PACKAGE_VERSION, not $VERSION."
        echo "Run ./scripts/publish-version.sh $VERSION to set the version and publish it."
        exit 1
    fi

    echo "[dry-run] package.json declares $PACKAGE_VERSION; a real run would set it to $VERSION first."
    echo "[dry-run] npm publish --tag $DIST_TAG"
    exit 0
fi

# Publish. "prepublishOnly" builds the package, so this is also what proves the tarball assembles.
if [ "$DRY_RUN_FLAG" = "--dry-run" ]; then
    echo "[dry-run] npm publish --tag $DIST_TAG"
    npm publish --dry-run --tag "$DIST_TAG"
    exit 0
fi

npm publish --tag "$DIST_TAG"

# Print a message indicating the successful publication of the package.
echo "Published $DEPENDENCY_NAME@$VERSION to npm under the \"$DIST_TAG\" tag"
