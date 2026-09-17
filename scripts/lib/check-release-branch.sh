#!/bin/bash

# This script refuses to release from the wrong place: the current branch has to track a
# release branch of the main repository, and be in sync with it. Which repository is the
# main one, and which of its branches are releasable, is declared in release-branches.json
# next to this script.
#
# The comparisons are made on the remote side: the remote is identified by the owner/name
# its URL ends in, which matches https, ssh and local paths all the same way, and the
# branch by the name it has on that remote, which is not always the local name. Checking
# the sync reads the remote tip over the network.
#
# Usage: ./scripts/lib/check-release-branch.sh [--dry-run]

set -e

THIS_SCRIPT_PATH=$(dirname "$(readlink -f "$0")")

DRY_RUN_FLAG="$1"

if [ -n "$DRY_RUN_FLAG" ] && [ "$DRY_RUN_FLAG" != "--dry-run" ]; then
    echo "Error: unknown option \"$DRY_RUN_FLAG\"."
    echo "Usage: $0 [--dry-run]"
    exit 1
fi

# A refusal stops a real run; a dry run only reports it, so a dry run can be tried from
# any branch or clone.
refuse() {
    if [ "$DRY_RUN_FLAG" = "--dry-run" ]; then
        echo "[dry-run] $1; a real run would stop here."
        exit 0
    fi

    echo "Error: $1."
    if [ -n "$2" ]; then
        echo "$2"
    fi
    exit 1
}

MAIN_REPOSITORY=$(node -pe "require('$THIS_SCRIPT_PATH/release-branches.json').mainRepository")
RELEASE_BRANCHES=$(node -pe "require('$THIS_SCRIPT_PATH/release-branches.json').releaseBranches.join(', ')")

if ! BRANCH=$(git symbolic-ref --quiet --short HEAD); then
    refuse "HEAD is not on a branch" \
        "Check out a release branch ($RELEASE_BRANCHES) before releasing."
fi

if ! UPSTREAM_REF=$(git rev-parse --abbrev-ref "$BRANCH@{upstream}" 2> /dev/null); then
    refuse "branch $BRANCH does not track a branch on any remote" \
        "Releases leave from a release branch ($RELEASE_BRANCHES) of $MAIN_REPOSITORY."
fi

# The remote name cannot contain a slash, but the branch name can, so only the first
# slash separates the two.
REMOTE="${UPSTREAM_REF%%/*}"
REMOTE_BRANCH="${UPSTREAM_REF#*/}"

if ! REMOTE_URL=$(git remote get-url "$REMOTE" 2> /dev/null); then
    refuse "branch $BRANCH tracks $UPSTREAM_REF, which is not a branch on a remote" \
        "Releases leave from a release branch ($RELEASE_BRANCHES) of $MAIN_REPOSITORY."
fi

REMOTE_REPOSITORY=$(printf '%s' "$REMOTE_URL" | sed 's/\.git$//' | awk -F'[/:]' '{print $(NF-1) "/" $NF}')

if [ "$REMOTE_REPOSITORY" != "$MAIN_REPOSITORY" ]; then
    refuse "branch $BRANCH tracks $UPSTREAM_REF on $REMOTE_URL, which is not the main repository $MAIN_REPOSITORY" \
        "Releases leave from a clone paired with $MAIN_REPOSITORY, so everyone releases the same thing."
fi

if [ "$(node -pe "require('$THIS_SCRIPT_PATH/release-branches.json').releaseBranches.includes('$REMOTE_BRANCH')")" != "true" ]; then
    refuse "branch $BRANCH tracks $REMOTE/$REMOTE_BRANCH, which is not a release branch of $MAIN_REPOSITORY" \
        "The release branches are $RELEASE_BRANCHES; a new release line is added in scripts/lib/release-branches.json."
fi

if ! REMOTE_TIP_LINE=$(git ls-remote "$REMOTE" "refs/heads/$REMOTE_BRANCH" 2> /dev/null); then
    refuse "could not reach remote $REMOTE ($REMOTE_URL)" \
        "Checking that $BRANCH is in sync with $REMOTE/$REMOTE_BRANCH needs the remote to be reachable."
fi

if [ -z "$REMOTE_TIP_LINE" ]; then
    refuse "could not read branch $REMOTE_BRANCH on remote $REMOTE ($REMOTE_URL)" \
        "The branch is gone from the remote; a release branch of $MAIN_REPOSITORY is not expected to disappear."
fi

REMOTE_TIP=$(printf '%s' "$REMOTE_TIP_LINE" | cut -f 1)
LOCAL_HEAD=$(git rev-parse HEAD)

if [ "$REMOTE_TIP" != "$LOCAL_HEAD" ]; then
    refuse "branch $BRANCH is not in sync with $REMOTE/$REMOTE_BRANCH (local HEAD is $LOCAL_HEAD, the remote tip is $REMOTE_TIP)" \
        "Pull or push first, so the release leaves from the commit the main repository has."
fi

echo "Releasing from $BRANCH, in sync with $REMOTE/$REMOTE_BRANCH ($MAIN_REPOSITORY)"
