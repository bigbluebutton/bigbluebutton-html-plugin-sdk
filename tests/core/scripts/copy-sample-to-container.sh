#!/bin/bash

# Check if plugin name is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <pluginName> [containerName]"
  exit 1
fi

# Set the "-e" flag to make the script exit immediately if any command fails.
set -e

# Determine the directory of the script
SCRIPT_DIR=$(dirname "$(readlink -f "$0")")

# Load .env file
ENV_FILE="$SCRIPT_DIR/../../../.env"  # Adjusted path to .env
if [ -f "$ENV_FILE" ]; then
  set -o allexport
  source "$ENV_FILE"
  set +o allexport
fi

PLUGIN_NAME=$1
CONTAINER_NAME=${2:-$LOCAL_CONTAINER_NAME}

#  check if container name is provided
if [ -z "$CONTAINER_NAME" ]; then
  echo "Container name is not provided. Exiting."
  exit 1
fi

PLUGINS_FOLDER_CONTAINER_PATH="/var/www/bigbluebutton-default/assets/plugins"
PLUGIN_CONTAINER_PATH="$PLUGINS_FOLDER_CONTAINER_PATH/$PLUGIN_NAME"

# Check if container is running
if ! docker ps -q --filter "name=$CONTAINER_NAME" | grep -q .; then
  echo "Container $CONTAINER_NAME is not running. Exiting."
  exit 1
fi

# Check if the plugins folder exists in the container
if docker exec $CONTAINER_NAME [ -d "$PLUGIN_CONTAINER_PATH" ]; then
  # Remove the existing files in the container path
  docker exec $CONTAINER_NAME rm -rf "$PLUGIN_CONTAINER_PATH"
fi

echo "Creating container path: $PLUGIN_CONTAINER_PATH..."
docker exec $CONTAINER_NAME mkdir -p "$PLUGIN_CONTAINER_PATH"

echo "Copying dist contents to container path: $PLUGIN_CONTAINER_PATH..."
docker cp dist/. $CONTAINER_NAME:$PLUGIN_CONTAINER_PATH/dist

# Check if the copy was successful
if [ $? -ne 0 ]; then
  echo "Failed to copy dist to container."
  exit 1
fi
