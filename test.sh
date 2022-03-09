#!/bin/sh

cd "$(dirname "$0")"

# create node_modules if it does not exists (instead of `npm init`)
if [ ! -d "node_modules" ]; then
	mkdir node_modules
fi

if [ $# -gt 0 ] && [ "$1" = "--install" ]; then
	npm install mocha chai
else
	./node_modules/mocha/bin/mocha -u tdd tests.mjs
fi
