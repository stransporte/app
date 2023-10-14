#!/bin/bash
. $GITHUB_WORKSPACE/.env

mkdir -p ~/.ssh
echo "creo la carpeta"


cp ./public/id_rsa ~/.ssh/id_rsa
echo "copio la llave"


chmod 600 ~/.ssh/id_rsa
echo "Dio permisos"

ssh-keyscan -t rsa $SSH_URL >>~/.ssh/known_hosts
echo "Termino el scan"

scp -r ./README.md $SSH_USER@$SSH_URL:~/