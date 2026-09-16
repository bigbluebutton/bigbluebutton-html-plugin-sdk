#!/bin/bash

# This script releases a version of the SDK: it sets the version, publishes it to npm, points
# the sample projects at it, and records the release in git.
#
# Called without an argument it releases the version that follows the current one. A stable
# version moves to the next patch (0.1.26 -> 0.1.27); a pre-release moves its own counter and
# stays on its channel (1.0.0-beta.1 -> 1.0.0-beta.2).
#
# Called with a version it releases exactly that version, which is how you open a new
# pre-release channel or move from a pre-release to the release it precedes.
#
# The npm dist-tag follows from the version: stable goes to "latest", a pre-release goes to its
# own channel ("beta", "rc", ...).
#
# Usage: ./scripts/publish-version.sh [VERSION] [--dry-run]
#
#   ./scripts/publish-version.sh                      # 0.1.26  -> 0.1.27, tagged "latest"
#   ./scripts/publish-version.sh 1.0.0-beta.1         # opens the beta channel, tagged "beta"
#   ./scripts/publish-version.sh 1.0.0 --dry-run      # shows what a 1.0.0 release would do

# Set the "-e" flag to make the script exit immediately if any command fails.
set -e

# Get the path of the directory containing this script.
THIS_SCRIPT_PATH=$(dirname "$(readlink -f "$0")")

# Calculate the absolute path of the project directory.
PROJECT_DIR=$(realpath "$THIS_SCRIPT_PATH/..")

# Read the command line arguments: an optional version, an optional --dry-run flag.
REQUESTED_VERSION=""
DRY_RUN_FLAG=""

for argument in "$@"; do
    if [ "$argument" = "--dry-run" ]; then
        DRY_RUN_FLAG="--dry-run"
    elif [ -z "$REQUESTED_VERSION" ]; then
        REQUESTED_VERSION="$argument"
    else
        echo "Error: unexpected argument \"$argument\"."
        echo "Usage: $0 [VERSION] [--dry-run]"
        exit 1
    fi
done

# Change the working directory to the project directory.
cd "$PROJECT_DIR"

# Get the name of the dependency from the project's package.json
DEPENDENCY_NAME=$(node -pe "require('./package.json').name")

# Get the current version from the project's package.json
CURRENT_VERSION=$(node -pe "require('./package.json').version")

# Decide which version is being released.
if [ -z "$REQUESTED_VERSION" ]; then
    NEW_VERSION=$(node "$THIS_SCRIPT_PATH/lib/version.js" next "$CURRENT_VERSION")
else
    NEW_VERSION="$REQUESTED_VERSION"
fi

# Resolving the dist-tag also rejects a version this repository cannot publish, which is why
# it comes before the comparison below.
DIST_TAG=$(node "$THIS_SCRIPT_PATH/lib/version.js" dist-tag "$NEW_VERSION")

# Refuse a release that would not move the package forward. npm rejects a republished
# version anyway, but it does so only after the build, and after the version was written.
if [ "$(node "$THIS_SCRIPT_PATH/lib/version.js" compare "$NEW_VERSION" "$CURRENT_VERSION")" != "1" ]; then
    echo "Error: $NEW_VERSION is not higher than the current version $CURRENT_VERSION."
    exit 1
fi

# Check that the tag is still free, so the release does not fail after publishing to npm.
if git rev-parse -q --verify "refs/tags/v$NEW_VERSION" > /dev/null; then
    echo "Error: tag v$NEW_VERSION already exists."
    exit 1
fi

# Check that the working tree is clean: this script commits the version files, and unrelated
# changes to them would be swept into the release commit.
if [ -n "$(git status --porcelain)" ]; then
    echo "Error: the working tree has uncommitted changes."
    echo "Commit or stash them before releasing, so the release commit carries only the version bump."
    exit 1
fi

echo "Releasing $DEPENDENCY_NAME $CURRENT_VERSION -> $NEW_VERSION (npm dist-tag: $DIST_TAG)"

if [ "$DRY_RUN_FLAG" = "--dry-run" ]; then
    echo "[dry-run] npm version $NEW_VERSION --no-git-tag-version"
    echo "[dry-run] npm install"
    "$THIS_SCRIPT_PATH/publish-to-npm.sh" "$NEW_VERSION" --dry-run
    echo "[dry-run] sleep 120 to allow npm to replicate internally"
    echo "[dry-run] point the samples at $NEW_VERSION and run npm install in each of them"
    "$THIS_SCRIPT_PATH/publish-git-tag.sh" "$NEW_VERSION" --dry-run
    echo "[dry-run] nothing was published, committed or pushed"
    exit 0
fi

# Write the new version to package.json and to package-lock.json.
npm version "$NEW_VERSION" --no-git-tag-version

# Runs npm install so the dependencies are in place for the build that publishing triggers
npm install

# Publishes to npm, under the dist-tag this version implies
"$THIS_SCRIPT_PATH/publish-to-npm.sh" "$NEW_VERSION"

echo "Sleeping 120 seconds to allow npm replicate internally"
sleep 120

# Update the package.json files of sample projects
for sample in samples/*/; do
  if [ -f "$sample/package.json" ]; then
    sed -i "s/\"$DEPENDENCY_NAME\": \".*\",/\"$DEPENDENCY_NAME\": \"$NEW_VERSION\",/" "$sample/package.json"
    cd $sample
    # Runs npm install so the package-lock gets updated
    npm install
    cd -
  fi
done

# Display a message indicating the successful version update
echo "Bumped version of $DEPENDENCY_NAME to $NEW_VERSION"

# Commits the version files, tags the commit and pushes it
"$THIS_SCRIPT_PATH/publish-git-tag.sh" "$NEW_VERSION"
