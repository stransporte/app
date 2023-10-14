#!/bin/bash
. $GITHUB_WORKSPACE/.env

mkdir -p ~/.ssh
cp -r $GITHUB_WORKSPACE/.ssh/* ~/.ssh
chmod 600 ~/.ssh/id_rsa

ssh_config_file=".ssh/config"
host_name="$SSH_SERVER_HOST"
hostname=$(grep -A2 "Host $host_name" $ssh_config_file | awk '/HostName/{print $2}')
myport=$(grep -A2 "Host $host_name" $ssh_config_file | awk '/Port/{print $2}')
echo "Host $hostname"
echo "Port $myport"

ssh-keyscan -t rsa -p $myport $hostname >>~/.ssh/known_hosts
