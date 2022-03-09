#!/bin/sh

cd "$(dirname "$0")"

# create node_modules if it does not exists (instead of `npm init`)
if [ ! -d "node_modules" ]; then
	mkdir node_modules
fi

if [ $# -gt 0 ] && [ "$1" = "--install" ]; then
	npm install jsdoc
else
	./node_modules/jsdoc/jsdoc.js -c conf.json tree.mjs
fi
