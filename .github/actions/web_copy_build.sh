#!/bin/bash
. $GITHUB_WORKSPACE/.env

scp $GITHUB_WORKSPACE/README.md $SSH_SERVER_HOST:/home/servisofts/README.md
# scp -r $GITHUB_WORKSPACE/build "$SSH_SERVER_HOST":/home/servisofts/servicios/stransporte/entornos/stransporte/
