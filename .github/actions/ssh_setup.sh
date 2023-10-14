#!/bin/bash
. $GITHUB_WORKSPACE/.env

mkdir -p ~/.ssh
cp ./public/id_rsa ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
ssh-keyscan -t rsa SSH_URL >>~/.ssh/known_hosts

scp -r ./README.md $SSH_USER@$SSH_URL:~/