#!/bin/bash

set -euo pipefail

RED='\033[1;31m'
GREEN='\033[1;32m'
NC='\033[0m' # No Color

die()
{
  echo -e "ERROR: ${RED}${1}${NC}"
  exit
}

CWD="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
TAG="${TAG:-naughty-nice-blockchain}"

if ! command -v docker &> /dev/null
then
  echo "docker must be installed"
fi

echo -e "${GREEN}Building in docker...${NC}"
docker build "$CWD" -t "$TAG" || die "Failed to build docker image"

echo -e "${GREEN}Starting container in docker (with the current folder mounted) - have fun!${NC}"
docker run --rm -v "$CWD":/usr/src/app -ti "$TAG" || die "Failed to execute docker image"
