#!/bin/bash
. $GITHUB_WORKSPACE/.env

mkdir -p ~/.ssh
cp -r ./.ssh ~/.ssh/

chmod 600 ~/.ssh/id_rsa

ssh-keyscan -t rsa $SSH_SERVER_HOST >> ~/.ssh/known_hosts

