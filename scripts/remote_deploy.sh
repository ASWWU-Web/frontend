#!/bin/bash

# IMPORTANT:
# make sure you understand _exactly_ what these commands are
# doing BEFORE USING or CHANGING this script or build scripts.

# this script is not idempotent, if it fails the first time, do
# not run it again before restoring a backup.

# If this or build scripts have been modified, take a backup and
# deploy manually, before using this script for the first time.

# This script is meant to be run from a developers computer
# after downloading the build artifact zip file containing
# the site to be deployed.

SERVER_USER_HOST=$1  # e.g. <username>@<server_ip>
DEPLOYMENT_PAYLOAD=$2  # e.g. ./<project_name>-payload/

PROJECT_NAME="frontend"

SERVER_PAYLOAD_LOCATION="/tmp/$PROJECT_NAME-payload"
SITE_FILES_PAYLOAD_LOCATION="$SERVER_PAYLOAD_LOCATION/dist-$PROJECT_NAME"
SERVER_DEPLOY_SCRIPT="server_deploy.sh"
SERVER_DEPLOY_SCRIPT_LOCATION="$SERVER_PAYLOAD_LOCATION/$SERVER_DEPLOY_SCRIPT"

echo ""
echo "Have you read and followed the warnings and instructions associated with this script since its last modification?"
select yn in "Yes" "No"; do
    case $yn in
        Yes ) echo "Ok. Deploying $PROJECT_NAME as $SERVER_USER_HOST."; break;;
        No ) echo "Canceling deployment."; exit 1;;
    esac
done
echo ""

echo "[INFO] copy $DEPLOYMENT_PAYLOAD to server" &&
scp -r "$DEPLOYMENT_PAYLOAD" "$SERVER_USER_HOST:$SERVER_PAYLOAD_LOCATION" &&

ssh -t "$SERVER_USER_HOST" "
  bash $SERVER_DEPLOY_SCRIPT_LOCATION \"$PROJECT_NAME\" \"$SITE_FILES_PAYLOAD_LOCATION\"" &&

echo ""
echo "done. Verify that nothing was broken."
