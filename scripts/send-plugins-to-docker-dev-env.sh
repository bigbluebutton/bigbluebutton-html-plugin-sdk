#!/bin/bash

# Change to the directory where the script is located
cd "$(dirname "$0")"
cd ..

OPT_STRING=":pi"
RUN_PUBLISH_TO_PROJECT_FOLDER=false
FORCE_RUN_NPM_CI=false

while getopts ${OPT_STRING} opt; do
  case ${opt} in
    i)
      # This will force every plugin to run npm ci
      echo Force every plugin to run npm ci
      FORCE_RUN_NPM_CI=true
      ;;
    p)
      # This flag will run the script to publish current
      # working version of SDK to samples
      echo Publish current SDK to samples for test
      RUN_PUBLISH_TO_PROJECT_FOLDER=true
      ;;
    ?)
      echo "Invalid option: -${OPTARG}."
      exit 1
      ;;
  esac
done

if [ "$RUN_PUBLISH_TO_PROJECT_FOLDER" = true ] ; then
  npm ci
  npm run build
fi
echo Start processing samples
for dir in samples/*
do
  if [ -d "$dir/tests" ]; then
    echo Identified test cases in $dir
    echo Installing dependencies in $dir
    cd $dir
    if [ "$FORCE_RUN_NPM_CI" = true ] ; then
      rm -rf node_modules
      npm ci
    fi
    if [ "$RUN_PUBLISH_TO_PROJECT_FOLDER" = true ] ; then
      ./../../scripts/publish-to-project-folder.sh .
    fi
    npm run build-bundle
    echo Sending $dir to container
    npm run copy-sample-to-container
    cd -
  fi
done
