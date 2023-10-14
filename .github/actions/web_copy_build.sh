#!/bin/bash
. $GITHUB_WORKSPACE/.env

echo "$SSH_SERVER_HOST:/home/servisofts/README.md"
cat $HOME/.ssh/config
scp -r ./build $SSH_SERVER_HOST:$SERVER_BUILD_PATH
