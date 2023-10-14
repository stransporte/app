#!/bin/bash
. $GITHUB_WORKSPACE/.env

scp ./README.md "$SSH_SERVER_HOST:/home/servisofts/README.md"
