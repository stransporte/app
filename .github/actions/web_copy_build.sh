#!/bin/bash
. $GITHUB_WORKSPACE/.env

rsync --progress -r build $SSH_HOST:/home/servisofts/servicios/stransporte/entornos/stransporte/
