#!/bin/bash
. $GITHUB_WORKSPACE/.env

scp -r $GITHUB_WORKSPACE/README.md "$SSH_SERVER_HOST":~/
# scp -r $GITHUB_WORKSPACE/build "$SSH_SERVER_HOST":/home/servisofts/servicios/stransporte/entornos/stransporte/
