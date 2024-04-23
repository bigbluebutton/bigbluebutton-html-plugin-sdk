#!/bin/bash
# Change to the directory where the script is located
cd "$(dirname "$0")"

# Move to the main directory of the project
cd ..

# Navigate to the samples directory
cd samples

# Loop through each subdirectory
for dir in */ ; do
    echo "Processing $dir..."
    cd "$dir"

    # Run the build command
    npm run-script build-bundle

    # Copy the .js file from the dist directory to ~/all-plugins/
    cp dist/*.js ~/all-plugins/

    # Go back to the samples directory
    cd ..
done

echo "All plugins processed."

