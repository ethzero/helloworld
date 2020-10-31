#!/bin/bash

# Download the repo w/source
REPO_TARGET=~/git/ethzero/helloworld
mkdir -p $REPO_TARGET 2>/dev/null
git clone https://github.com/ethzero/helloworld.git $REPO_TARGET 2>/dev/null
chmod 755 $0

# Take down the stake, update it, bring back up
cd $REPO_TARGET
git pull
docker-compose down
docker-compose pull
docker-compose up --detach

# Clean up
docker image prune -f
docker volume prune -f
