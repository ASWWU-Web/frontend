#!/bin/bash

# IMPORTANT:
# make sure you understand _exactly_ what these commands are
# doing BEFORE USING or CHANGING this script or build scripts.

# this script is not idempotent, if it fails the first time, do
# not run it again before restoring a backup.

# If this or build scripts have been modified, take a backup and
# deploy manually, before using this script for the first time.

# This script is meant to be called by the `remote_deploy.sh`
# script only.

PROJECT_NAME=$1
SERVER_PAYLOAD_LOCATION=$2

SITE_FILES_PAYLOAD_LOCATION="$SERVER_PAYLOAD_LOCATION/dist-$PROJECT_NAME"
PROJECT_DIRECTORY="/var/www/html/$PROJECT_NAME"
PRODUCTION_DIRECTORY="$PROJECT_DIRECTORY/prod"
PRODUCTION_BACKUP_DIRECTORY="$PRODUCTION_DIRECTORY.bak"

echo "[INFO] remove $PRODUCTION_BACKUP_DIRECTORY" &&
sudo rm -rvf "$PRODUCTION_BACKUP_DIRECTORY" &&

echo "[INFO] move $PRODUCTION_DIRECTORY to $PRODUCTION_BACKUP_DIRECTORY" &&
sudo mv -v "$PRODUCTION_DIRECTORY" "$PRODUCTION_BACKUP_DIRECTORY" &&

echo "[INFO] move $SITE_FILES_PAYLOAD_LOCATION into $PRODUCTION_DIRECTORY" &&
sudo mv -v "$SITE_FILES_PAYLOAD_LOCATION" "$PRODUCTION_DIRECTORY" &&

echo "[INFO] remove $SERVER_PAYLOAD_LOCATION" &&
rm -rv "$SERVER_PAYLOAD_LOCATION"

echo "[INFO] reload nginx" &&
sudo nginx -s reload &&

echo ""
echo "done. Verify that nothing was broken."
