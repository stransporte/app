#!/bin/bash
. $GITHUB_WORKSPACE/.env

mkdir -p ~/.ssh
cp -r ./.ssh ~/.ssh/id_rsa

chmod 600 ~/.ssh/id_rsa

ssh-keyscan -t rsa "$SSH_SERVER_HOST" >>~/.ssh/known_hosts

echo "Termino el scan"

echo "$SSH_SERVER_HOST:~/"
scp ./README.md "$SSH_SERVER_HOST:~/"
