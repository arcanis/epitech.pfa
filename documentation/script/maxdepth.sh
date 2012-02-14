#!/bin/bash

MAXDEPTH=2

function hasMaxDepth
{
    if [ "$(grep "   :maxdepth: $MAXDEPTH" $1)" = "" ]
    then
	false
    else
	true
    fi
}

function addMaxDepth
{
    sed -e "s/.. toctree::/.. toctree::\n   :maxdepth: $MAXDEPTH/g" -i "$1"
}

function main
{
    for file in $(find ./ -name '*.rst')
    do
	hasMaxDepth $file
	if [ "$?" = "1" ]
	then
	    echo "Add to $file"
	    addMaxDepth "$file"
	fi
    done
}

main
