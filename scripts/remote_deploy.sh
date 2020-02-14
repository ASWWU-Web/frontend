#!/bin/bash

# This script is meant to be run from a developers computer
# after downloading the build artifact zip file containing
# the site to be deployed.

SERVER_USER_HOST=$1  # e.g. <username>@<server_ip>
LOCAL_ZIP_FILE="$2"  # e.g. ./dist-<project_name>.zip

PROJECT_NAME="frontend"
PROJECT_DIR="/var/www/html/$PROJECT_NAME"
SERVER_ZIP_FILE="$PROJECT_DIR/dist-$PROJECT_NAME.zip"
PROD_DIR="$PROJECT_DIR/prod"
PROD_BAK_DIR="$PROD_DIR.bak"


scp "$LOCAL_ZIP_FILE" "$SERVER_USER_HOST:$SERVER_ZIP_FILE"
ssh "$SERVER_USER_HOST" "
  echo \"[INFO] remove $PROD_BAK_DIR\" &&
  sudo rm -rf $PROD_BAK_DIR &&

  echo \"[INFO] move $PROD_DIR to $PROD_BAK_DIR\" &&
  sudo mv $PROD_DIR $PROD_BAK_DIR &&

  echo \"[INFO] create directory $PROD_DIR\" &&
  sudo mkdir $PROD_DIR &&

  echo \"[INFO] unzip $SERVER_ZIP_FILE into $PROD_DIR\" &&
  sudo unzip -d $PROD_DIR $SERVER_ZIP_FILE &&

  echo \"[INFO] reload nginx\" &&
  sudo nginx -s reload

  echo \"[INFO] remove $SERVER_ZIP_FILE\"
  sudo rm $SERVER_ZIP_FILE &&
"
echo ""
echo "done."
