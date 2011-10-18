#!/usr/bin/env bash

#jsdoc must be installed from git
if ! hash jsdoc 2>&-; then
	echo JSDoc
	mkdir /usr/src/jsdoc/
	cd /usr/src/jsdoc/
	git init
	git remote add origin git@github.com:micmath/jsdoc
	git pull -u origin master
	chmod 755 /usr/src/jsdoc/jsdoc
	ln -s /usr/src/jsdoc/jsdoc /usr/bin/jsdoc
fi

# We can check some utilities
if ! hash puddi 2>&-; then
	echo Puddi
	npm install -g puddi
	npm install -g optimist yaml
fi

# We can check some utilities
if ! hash jshint 2>&-; then
	echo JSHint
	npm install -g jshint
fi

# We can check some utilities
if ! hash uglifyjs 2>&-; then
	echo UglifyJS
	npm install -g uglify-js
fi

# We can check some utilities
if ! hash jsbuild 2>&-; then
	echo JSClass
	npm install -g jsclass
fi
