#!/bin/bash

# This script is used to increment the patch version of a Node.js project,
# reading the dependency name from the project's package.json.

# Change to the directory where the script is located
cd "$(dirname "$0")"

# Move to the main directory of the project
cd ..

# Get the name of the dependency from the project's package.json
DEPENDENCY_NAME=$(node -pe "require('./package.json').name")

# Get the current version from the project's package.json
CURRENT_VERSION=$(node -pe "require('./package.json').version")

# Extract the current patch version
CURRENT_PATCH_VERSION=$(echo "$CURRENT_VERSION" | cut -d. -f3)

# Increment the patch version
NEW_PATCH_VERSION=$((CURRENT_PATCH_VERSION + 1))

# Construct the new version with the updated patch number
NEW_VERSION=$(echo "$CURRENT_VERSION" | sed "s/\.[0-9]\+$/\.$NEW_PATCH_VERSION/")

# Update the main package.json file with the new version
sed -i "s/\"version\": \"$CURRENT_VERSION\"/\"version\": \"$NEW_VERSION\"/" package.json

# Runs npm install so the package-lock gets updated
npm install

# Publishes to npm
npm publish

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

# Add package and package-lock
git add package-lock.json package.json samples/*/package-lock.json samples/*/package.json

git commit -m "Bump version to $NEW_VERSION"
git tag v$NEW_VERSION
git push origin v$NEW_VERSION
git push
