#!/bin/bash
. $GITHUB_WORKSPACE/.env

mkdir -p ~/.ssh
cp -r ./.ssh ~/.ssh/id_rsa

chmod 600 ~/.ssh/id_rsa

ssh-keyscan -t rsa server >> ~/.ssh/known_hosts

