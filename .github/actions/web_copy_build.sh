#!/bin/bash
. $GITHUB_WORKSPACE/.env

echo "$SSH_SERVER_HOST:/home/servisofts/README.md"
scp ./README.md "$SSH_SERVER_HOST:/home/servisofts/repo/README.md"
