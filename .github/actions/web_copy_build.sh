#!/bin/bash
. $GITHUB_WORKSPACE/.env

echo "$SSH_SERVER_HOST:/home/servisofts/README.md"
cat $HOME/.ssh/config
scp ./README.md $SSH_SERVER_HOST:/home/servisofts/repo/README.md
