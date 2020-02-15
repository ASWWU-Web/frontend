#!/bin/bash

# IMPORTANT:
# make sure you understand _exactly_ what these command are
# doing BEFORE USING or CHANGING this script or build scripts.

# this script is not idempotent, if it fails the first time, do
# not run it again before restoring a backup.

# If this or build scripts have been modified, take a backup and
# deploy manually, before using this script for the first time.

# This script is meant to be run from a developers computer
# after downloading the build artifact zip file containing
# the site to be deployed.

SERVER_USER_HOST=$1  # e.g. <username>@<server_ip>
LOCAL_ZIP_FILE=$2  # e.g. ./dist-<project_name>.zip

PROJECT_NAME="frontend"
PROJECT_DIR="/var/www/html/$PROJECT_NAME"
SERVER_ZIP_FILE_NAME="dist-$PROJECT_NAME.zip"
PROD_DIR="$PROJECT_DIR/prod"
PROD_BAK_DIR="$PROD_DIR.bak"

echo ""
echo "Have you read and followed the warnings and instructions associated with this script since its last modification?"
select yn in "Yes" "No"; do
    case $yn in
        Yes ) echo "Ok. Deploying $LOCAL_ZIP_FILE as $SERVER_USER_HOST."; break;;
        No ) echo "Canceling deployment."; exit 1;;
    esac
done
echo ""

echo "[INFO] (1) copy $LOCAL_ZIP_FILE to server" &&
scp "$LOCAL_ZIP_FILE" "$SERVER_USER_HOST:$SERVER_ZIP_FILE_NAME" &&

ssh -t "$SERVER_USER_HOST" "
  echo \"[INFO] (2) remove $PROD_BAK_DIR\" &&
  sudo rm -rvf $PROD_BAK_DIR &&
  echo \"[INFO] (3) move $PROD_DIR to $PROD_BAK_DIR\" &&
  sudo mv -v $PROD_DIR $PROD_BAK_DIR &&
  echo \"[INFO] (4) create directory $PROD_DIR\" &&
  sudo mkdir -v $PROD_DIR &&
  echo \"[INFO] (5) unzip \$HOME/$SERVER_ZIP_FILE_NAME into $PROD_DIR\" &&
  sudo unzip -d $PROD_DIR \$HOME/$SERVER_ZIP_FILE_NAME &&
  echo \"[INFO] (6) reload nginx\" &&
  sudo nginx -s reload &&
  echo \"[INFO] (7) remove \$HOME/$SERVER_ZIP_FILE_NAME\" &&
  sudo rm -rv \$HOME/$SERVER_ZIP_FILE_NAME
" &&
echo ""
echo "done. Verify that nothing was broken."
