#!/bin/sh

cd "$(dirname "$0")"

if [ $# -gt 0 ] && [ "$1" = "--install" -o "$1" = "install" ]; then
	if [ ! -d "node_modules" ]; then
		npm init -y
	fi

	npm install mocha chai
else
	npx --no-install mocha -u tdd tests.mjs
fi
