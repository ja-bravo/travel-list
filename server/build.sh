#!/bin/bash
set -e 


if  grep -q "force:" "server/models/database.ts"; then
echo "Don't upload it with force true"
exit 1;
fi

echo "Starting build.sh"
rm -rf ./dist
yarn build
cd server
mkdir ../dist/server/migrations
cp -af migrations/. ../dist/server/migrations/
mkdir ../dist/server/templates
cp -af templates/. ../dist/server/templates
echo "End of build.sh"