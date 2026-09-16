#!/bin/bash

# This script releases a version of the SDK: it sets the version, publishes it to npm, points
# the sample projects at it, and records the release in git.
#
# Called without an argument it releases the version that follows the current one: a stable
# version moves to the next patch (0.1.26 -> 0.1.27), a pre-release moves its own counter and
# stays on its channel (1.0.0-beta.1 -> 1.0.0-beta.2). Called with a version it releases exactly
# that version, which is how a new pre-release channel is opened.
#
# The npm dist-tag follows from the version: stable goes to "latest", a pre-release goes to its
# own channel ("beta", "rc", ...).
#
# Usage: ./scripts/publish-version.sh [VERSION] [--dry-run]
#
#   ./scripts/publish-version.sh                      # 0.1.26  -> 0.1.27, tagged "latest"
#   ./scripts/publish-version.sh 1.0.0-beta.1         # opens the beta channel, tagged "beta"
#   ./scripts/publish-version.sh 1.0.0 --dry-run      # shows what a 1.0.0 release would do

set -e

THIS_SCRIPT_PATH=$(dirname "$(readlink -f "$0")")
PROJECT_DIR=$(realpath "$THIS_SCRIPT_PATH/..")

# An optional version, an optional --dry-run flag, in either order.
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

cd "$PROJECT_DIR"

DEPENDENCY_NAME=$(node -pe "require('./package.json').name")
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

# Checked here too, so the release does not fail after the package is already on npm.
if git rev-parse -q --verify "refs/tags/v$NEW_VERSION" > /dev/null; then
    echo "Error: tag v$NEW_VERSION already exists."
    exit 1
fi

# This script commits the version files, so unrelated changes to them would be swept into the
# release commit.
if [ -n "$(git status --porcelain)" ]; then
    echo "Error: the working tree has uncommitted changes."
    echo "Commit or stash them before releasing, so the release commit carries only the version bump."
    exit 1
fi

echo "Releasing $DEPENDENCY_NAME $CURRENT_VERSION -> $NEW_VERSION (npm dist-tag: $DIST_TAG)"

if [ "$DRY_RUN_FLAG" = "--dry-run" ]; then
    # --- publish to npm ---
    echo "[dry-run] npm version $NEW_VERSION --no-git-tag-version"
    echo "[dry-run] npm install"
    "$THIS_SCRIPT_PATH/publish-to-npm.sh" "$NEW_VERSION" --dry-run
    echo "[dry-run] sleep 120 to allow npm to replicate internally"
    # --- end publish to npm ---

    # --- point the samples at the new version ---
    echo "[dry-run] point the samples at $NEW_VERSION and run npm install in each of them"
    # --- end point the samples at the new version ---

    # --- commit, tag and push to github ---
    "$THIS_SCRIPT_PATH/publish-git-tag.sh" "$NEW_VERSION" --dry-run
    # --- end commit, tag and push to github ---

    echo "[dry-run] nothing was published, committed or pushed"
    exit 0
fi

# --- publish to npm ---
npm version "$NEW_VERSION" --no-git-tag-version

# The dependencies have to be in place for the build that publishing triggers.
npm install

"$THIS_SCRIPT_PATH/publish-to-npm.sh" "$NEW_VERSION"

# The samples install the version that was just published, so give npm time to replicate it.
echo "Sleeping 120 seconds to allow npm replicate internally"
sleep 120
# --- end publish to npm ---

# --- point the samples at the new version ---
for sample in samples/*/; do
  if [ -f "$sample/package.json" ]; then
    sed -i "s/\"$DEPENDENCY_NAME\": \".*\",/\"$DEPENDENCY_NAME\": \"$NEW_VERSION\",/" "$sample/package.json"
    cd $sample
    # Updates the package-lock as well, which is what the release commit carries.
    npm install
    cd -
  fi
done

echo "Bumped version of $DEPENDENCY_NAME to $NEW_VERSION"
# --- end point the samples at the new version ---

# --- commit, tag and push to github ---
"$THIS_SCRIPT_PATH/publish-git-tag.sh" "$NEW_VERSION"
# --- end commit, tag and push to github ---
