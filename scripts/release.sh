#!/bin/bash

NAME=$1
VERSION=$2

echo "#### building release ${NAME}-${VERSION}"

echo "     ==> Preparing"
rm -rf ./dist ./build
mkdir -p ./dist ./build
cp -r ./source/config ./dist/config
cp -r ./source/templates ./dist/config
pandoc LICENSE -t plain -s -o ./dist/LICENSE.txt
pandoc README.md -t plain -s -o ./dist/README.txt
pandoc CHANGELOG.md -t plain -s -o ./dist/CHANGELOG.txt

echo "     ==> Building"
./node_modules/.bin/tsc --project ./tsconfig.json
./node_modules/.bin/pkg --silent --targets node12-win-x64 build/main.js --output dist/${NAME}_v${VERSION}_win_x64.exe
zip -rvj dist/${NAME}_v${VERSION}_win_x64.zip ./dist/LICENSE.txt
zip -rvj dist/${NAME}_v${VERSION}_win_x64.zip ./dist/CHANGELOG.txt
zip -rvj dist/${NAME}_v${VERSION}_win_x64.zip ./dist/README.txt
zip -rvj dist/${NAME}_v${VERSION}_win_x64.zip ./dist/${NAME}_v${VERSION}_win_x64.exe

echo "     ==> Cleaning"
rm -rf ./dist/config
find ./dist -type f | grep -v zip | xargs -i rm {}