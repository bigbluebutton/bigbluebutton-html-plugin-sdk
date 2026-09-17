#!/bin/bash

# This script publishes the package currently in the working tree to npm.
#
# The dist-tag is derived from the version itself: a stable version is published as "latest",
# while a pre-release is published under its own channel ("beta", "rc", ...), so that installing
# the package without asking for a tag keeps returning the stable release.
#
# Usage: ./scripts/publish-to-npm.sh <VERSION> [--dry-run]

set -e

THIS_SCRIPT_PATH=$(dirname "$(readlink -f "$0")")
PROJECT_DIR=$(realpath "$THIS_SCRIPT_PATH/..")

VERSION="$1"
DRY_RUN_FLAG="$2"

if [ -z "$VERSION" ]; then
    echo "Usage: $0 <VERSION> [--dry-run]"
    exit 1
fi

if [ -n "$DRY_RUN_FLAG" ] && [ "$DRY_RUN_FLAG" != "--dry-run" ]; then
    echo "Error: unknown option \"$DRY_RUN_FLAG\"."
    echo "Usage: $0 <VERSION> [--dry-run]"
    exit 1
fi

cd "$PROJECT_DIR"

# The branch is checked here too, so this script cannot publish from the wrong branch
# or clone when it runs on its own.
"$THIS_SCRIPT_PATH/lib/check-release-branch.sh" $DRY_RUN_FLAG

# Resolving the dist-tag also rejects a version npm could not publish sanely.
DIST_TAG=$(node scripts/lib/version.js dist-tag "$VERSION")

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

# --- publish to npm ---
# "prepublishOnly" builds the package, so this is also what proves the tarball assembles.
if [ "$DRY_RUN_FLAG" = "--dry-run" ]; then
    echo "[dry-run] npm publish --tag $DIST_TAG"
    npm publish --dry-run --tag "$DIST_TAG"
    exit 0
fi

npm publish --tag "$DIST_TAG"

echo "Published $DEPENDENCY_NAME@$VERSION to npm under the \"$DIST_TAG\" tag"
# --- end publish to npm ---
