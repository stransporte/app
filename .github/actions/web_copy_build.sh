#!/bin/bash
. $GITHUB_WORKSPACE/.env

echo "server:/home/servisofts/README.md"
scp ./README.md "server:/home/servisofts/repo/README.md"
