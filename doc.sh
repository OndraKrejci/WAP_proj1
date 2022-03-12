#!/bin/sh

cd "$(dirname "$0")"


if [ $# -gt 0 ] && [ "$1" = "--install" -o "$1" = "install" ]; then
	if [ ! -d "node_modules" ]; then
		npm init -y
	fi

	npm install jsdoc
else
	npx --no-install jsdoc -c conf.json tree.mjs
fi
