#!/bin/bash

# This script records a released version in git: it commits the files that carry the version
# number, tags that commit as v<VERSION>, and pushes both the tag and the current branch.
#
# Usage: ./scripts/publish-git-tag.sh <VERSION> [--dry-run]

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

# This script also runs on its own, so it rejects a version that is not a version before
# touching git at all, and checks that the tag is still free.
node scripts/lib/version.js validate "$VERSION" > /dev/null

if git rev-parse -q --verify "refs/tags/v$VERSION" > /dev/null; then
    echo "Error: tag v$VERSION already exists."
    exit 1
fi

# The samples do not all carry both files, so only the ones present are committed.
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

# --- commit, tag and push to github ---
git add "${FILES_TO_COMMIT[@]}"

git commit -m "Bump version to $VERSION"

git tag "v$VERSION"

git push origin "v$VERSION"

git push

echo "Committed, tagged and pushed v$VERSION"
# --- end commit, tag and push to github ---
