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
# The two stages of the release can be toggled off independently:
#
#   PUBLISH_TO_NPMJS=false   finishes a release whose npm publish already succeeded: it accepts
#                            the version package.json already holds and the uncommitted version
#                            files the earlier run left, and only points the samples at the
#                            published version and commits, tags and pushes.
#   PUBLISH_TO_GITHUB=false  publishes to npm without recording the release in git.
#
# Usage: ./scripts/publish-version.sh [VERSION] [--dry-run]
#
#   ./scripts/publish-version.sh                            # 0.1.26  -> 0.1.27, tagged "latest"
#   ./scripts/publish-version.sh 1.0.0-beta.1               # opens the beta channel, tagged "beta"
#   ./scripts/publish-version.sh 1.0.0 --dry-run            # shows what a 1.0.0 release would do
#   PUBLISH_TO_NPMJS=false ./scripts/publish-version.sh     # finishes an interrupted release

set -e

THIS_SCRIPT_PATH=$(dirname "$(readlink -f "$0")")
PROJECT_DIR=$(realpath "$THIS_SCRIPT_PATH/..")

# Sourced for the remote-URL helpers; executed further down as the branch check.
# shellcheck source=lib/check-git-preconditions.sh
. "$THIS_SCRIPT_PATH/lib/check-git-preconditions.sh"

# The toggles are environment overrides, not in-file switches: flipping a stage must not require
# editing the file, because an edited script dirties the tree and the clean-tree check below
# would refuse the release.
PUBLISH_TO_NPMJS="${PUBLISH_TO_NPMJS:-true}"
PUBLISH_TO_GITHUB="${PUBLISH_TO_GITHUB:-true}"

for toggle in "$PUBLISH_TO_NPMJS" "$PUBLISH_TO_GITHUB"; do
    if [ "$toggle" != "true" ] && [ "$toggle" != "false" ]; then
        echo "Error: PUBLISH_TO_NPMJS and PUBLISH_TO_GITHUB only take \"true\" or \"false\", got \"$toggle\"."
        exit 1
    fi
done

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

# Refusal of the remote resolution: a real run stops with an error before anything is
# published; a dry run only reports it and ends the way every dry run does.
release_remote_refusal() {
    if [ "$DRY_RUN_FLAG" = "--dry-run" ]; then
        echo "[dry-run] $1; a real run would stop here."
        echo "$2"
        echo "$3"
        echo "[dry-run] nothing was published, committed or pushed"
        exit 0
    fi

    echo "Error: $1."
    echo "$2"
    echo "$3"
    exit 1
}

# Picks the push target: the first remote that is the main repository over ssh, in git
# remote order. Sets RELEASE_REMOTE and RELEASE_BRANCH, which the push site reads.
resolve_release_remote() {
    # Cleared first, so values inherited from the environment cannot pose as a resolution.
    RELEASE_REMOTE=""
    RELEASE_BRANCH=""

    local main_repository upstream_ref main_remotes remote first_main_remote first_main_url

    main_repository=$(node -pe "require('$THIS_SCRIPT_PATH/lib/release-branches.json').mainRepository")

    # A missing upstream refuses on a real run; a dry run goes on and still resolves the
    # remote, leaving the branch empty for the push line to show as a placeholder.
    if upstream_ref=$(git rev-parse --abbrev-ref "@{upstream}" 2> /dev/null); then
        RELEASE_BRANCH="${upstream_ref#*/}"
    elif [ "$DRY_RUN_FLAG" != "--dry-run" ]; then
        echo "Error: could not resolve the branch this release is pushed to."
        exit 1
    fi

    main_remotes=$(main_repository_remotes "$main_repository")
    first_main_remote=""

    for remote in $main_remotes; do
        [ -n "$first_main_remote" ] || first_main_remote="$remote"
        if is_ssh_remote_url "$(git remote get-url "$remote" 2> /dev/null)"; then
            RELEASE_REMOTE="$remote"
            break
        fi
    done

    if [ -n "$RELEASE_REMOTE" ]; then
        echo "Releasing to remote $RELEASE_REMOTE ($main_repository)"
        return 0
    fi

    if [ -n "$first_main_remote" ]; then
        first_main_url=$(git remote get-url "$first_main_remote" 2> /dev/null || true)
        release_remote_refusal \
            "remote $first_main_remote is the main repository $main_repository, but its URL is not an ssh URL ($first_main_url)" \
            "Releases are pushed over ssh, so point that remote at the ssh URL:" \
            "    git remote set-url $first_main_remote git@github.com:$main_repository.git"
    else
        release_remote_refusal \
            "no remote is the main repository $main_repository" \
            "Add it as a remote over ssh:" \
            "    git remote add upstream git@github.com:$main_repository.git"
    fi
}

# The branch is checked before anything else, so a release from the wrong branch or
# clone stops while nothing has been changed yet.
"$THIS_SCRIPT_PATH/lib/check-git-preconditions.sh" $DRY_RUN_FLAG

# Resolved by name, so a fork checked out as origin never receives the release. The npm-only
# stage does not push and stays usable from an https clone.
if [ "$PUBLISH_TO_GITHUB" = "true" ]; then
    resolve_release_remote
fi

DEPENDENCY_NAME=$(node -pe "require('./package.json').name")
CURRENT_VERSION=$(node -pe "require('./package.json').version")

# Decide which version is being released.
if [ "$PUBLISH_TO_NPMJS" = "true" ]; then
    if [ -z "$REQUESTED_VERSION" ]; then
        NEW_VERSION=$(node "$THIS_SCRIPT_PATH/lib/version.js" next "$CURRENT_VERSION")
    else
        NEW_VERSION="$REQUESTED_VERSION"
    fi
else
    # Without the npm stage this run finishes an earlier release, so the version is the one
    # that release already wrote into package.json.
    NEW_VERSION="$CURRENT_VERSION"

    if [ -n "$REQUESTED_VERSION" ] && [ "$REQUESTED_VERSION" != "$CURRENT_VERSION" ]; then
        echo "Error: $REQUESTED_VERSION was requested, but package.json holds $CURRENT_VERSION."
        echo "A run without the npm stage can only record the version that was already published."
        exit 1
    fi
fi

# Resolving the dist-tag also rejects a version this repository cannot publish, which is why
# it comes before the comparison below, and runs whether or not the npm stage does.
DIST_TAG=$(node "$THIS_SCRIPT_PATH/lib/version.js" dist-tag "$NEW_VERSION")

# Refuse a release that would not move the package forward. npm rejects a republished
# version anyway, but it does so only after the build, and after the version was written.
if [ "$PUBLISH_TO_NPMJS" = "true" ] \
    && [ "$(node "$THIS_SCRIPT_PATH/lib/version.js" compare "$NEW_VERSION" "$CURRENT_VERSION")" != "1" ]; then
    echo "Error: $NEW_VERSION is not higher than the current version $CURRENT_VERSION."
    exit 1
fi

# Checked here too, so the release does not fail after the package is already on npm.
if git rev-parse -q --verify "refs/tags/v$NEW_VERSION" > /dev/null; then
    echo "Error: tag v$NEW_VERSION already exists."
    exit 1
fi

# This script commits the version files, so unrelated changes to them would be swept into the
# release commit. Without the npm stage the check is skipped: the uncommitted version files
# are exactly what the git stage commits, since that mode exists to finish a release whose
# publish already happened.
if [ "$PUBLISH_TO_NPMJS" = "true" ] && [ -n "$(git status --porcelain)" ]; then
    echo "Error: the working tree has uncommitted changes."
    echo "Commit or stash them before releasing, so the release commit carries only the version bump."
    exit 1
fi

echo "Releasing $DEPENDENCY_NAME $CURRENT_VERSION -> $NEW_VERSION (npm dist-tag: $DIST_TAG)"

# The samples do not all carry both files, so only the ones present are committed.
collect_files_to_commit() {
    FILES_TO_COMMIT=(package.json package-lock.json)

    for sample in samples/*/; do
        for version_file in package.json package-lock.json; do
            if [ -f "$sample$version_file" ]; then
                FILES_TO_COMMIT+=("$sample$version_file")
            fi
        done
    done
}

if [ "$DRY_RUN_FLAG" = "--dry-run" ]; then
    if [ "$PUBLISH_TO_NPMJS" = "true" ]; then
        # --- publish to npm ---
        echo "[dry-run] npm version $NEW_VERSION --no-git-tag-version"
        echo "[dry-run] npm ci"
        echo "[dry-run] rm -rf dist"
        echo "[dry-run] npm publish --tag $DIST_TAG"
        echo "[dry-run] sleep 120 to allow npm to replicate internally"
        # --- end publish to npm ---
    fi

    if [ "$PUBLISH_TO_GITHUB" = "true" ]; then
        # --- point the samples at the new version, commit, tag and push to github ---
        echo "[dry-run] point the samples at $NEW_VERSION and run npm install in each of them"
        collect_files_to_commit
        echo "[dry-run] git add ${#FILES_TO_COMMIT[@]} version files (package.json/package-lock.json of the project and of the samples)"
        echo "[dry-run] git commit -m \"Bump version to $NEW_VERSION\""
        echo "[dry-run] git tag v$NEW_VERSION"
        echo "[dry-run] git push --atomic $RELEASE_REMOTE HEAD:refs/heads/${RELEASE_BRANCH:-<release-branch>} refs/tags/v$NEW_VERSION"
        # --- end point the samples at the new version, commit, tag and push to github ---
    fi

    echo "[dry-run] nothing was published, committed or pushed"
    exit 0
fi

if [ "$PUBLISH_TO_NPMJS" = "true" ]; then
    # --- publish to npm ---
    npm version "$NEW_VERSION" --no-git-tag-version

    # npm version wrote the lockfile, so it is in sync, and ci installs exactly the pinned
    # tree: the tarball builds from the dependencies that were reviewed.
    npm ci

    # npm publishes whatever package.json declares, so refuse to run when the two disagree.
    PACKAGE_VERSION=$(node -pe "require('./package.json').version")

    if [ "$PACKAGE_VERSION" != "$NEW_VERSION" ]; then
        echo "Error: package.json declares version $PACKAGE_VERSION, not $NEW_VERSION."
        exit 1
    fi

    # dist/ is not under version control, so stray output of an old build would ship silently.
    rm -rf dist

    # "prepublishOnly" builds the package, so this is also what proves the tarball assembles.
    npm publish --tag "$DIST_TAG"

    echo "Published $DEPENDENCY_NAME@$NEW_VERSION to npm under the \"$DIST_TAG\" tag"

    # The samples install the version that was just published, so give npm time to replicate it.
    echo "Sleeping 120 seconds to allow npm replicate internally"
    sleep 120
    # --- end publish to npm ---
fi

if [ "$PUBLISH_TO_GITHUB" = "true" ]; then
    # --- point the samples at the new version, commit, tag and push to github ---
    for sample in samples/*/; do
        if [ -f "$sample/package.json" ]; then
            sed -i "s/\"$DEPENDENCY_NAME\": \".*\",/\"$DEPENDENCY_NAME\": \"$NEW_VERSION\",/" "$sample/package.json"
            cd "$sample"
            # Updates the package-lock as well, which is what the release commit carries.
            # This stays npm install: the sed above desyncs each sample's lockfile on
            # purpose, and npm ci refuses an out-of-sync lockfile.
            npm install
            cd - > /dev/null
        fi
    done

    echo "Bumped version of $DEPENDENCY_NAME to $NEW_VERSION"

    collect_files_to_commit

    git add "${FILES_TO_COMMIT[@]}"

    git commit -m "Bump version to $NEW_VERSION"

    git tag "v$NEW_VERSION"

    # One atomic push: the branch commit and the tag land together, or neither does.
    git push --atomic "$RELEASE_REMOTE" "HEAD:refs/heads/$RELEASE_BRANCH" "refs/tags/v$NEW_VERSION"

    echo "Committed, tagged and pushed v$NEW_VERSION to $RELEASE_REMOTE"
    # --- end point the samples at the new version, commit, tag and push to github ---
fi
