#!/bin/bash
. $GITHUB_WORKSPACE/.env

mkdir -p ~/.ssh

chmod 600 ~/.ssh/id_rsa

ssh-keyscan -t rsa $SSH_HOST >>~/.ssh/known_hosts

echo "Termino el scan"

# scp ./README.md 2.2:~/
