#!/bin/bash
. $GITHUB_WORKSPACE/.env

scp -r $GITHUB_WORKSPACE/build $SSH_HOST:/home/servisofts/servicios/stransporte/entornos/stransporte/
