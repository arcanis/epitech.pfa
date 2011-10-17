#!/usr/bin/env bash

# http://tinyurl.com/346tdfh
# both $1 and $2 are absolute paths
# returns $2 relative to $1
function relatify() {
	local source="${1}"
	local target="${2}"
	local common_part="${source}"
	local back=
	while [ "${target#$common_part}" = "${target}" ]; do
		common_part=$(dirname $common_part)
		back="../${back}"
	done
	echo ${back}${target#$common_part/}
}

# http://tinyurl.com/429vw2v
# returns $1 as string-escaped
function stringify() {
	printf "\"%b\"" "${1}"
}

# $1 is the absolute path of source directory, and $2 is the absolute path of manifested file.
# returns the manifest of the file
function manifest() {
	local rule
	local rules=$(grep -P '^//!' "${2}" | sed 's/^\/\/!//g')
	if [ -n "${rules}" ]; then
		printf "  this.file(SOURCE_PATH + $(stringify "$(relatify "${1}" "${2}")"))"
		while read rule; do
			local directive=$(printf "%s" "${rule}" | cut -d : -f 1)
			local parameter=$(printf "%s" "${rule}" | cut -d : -f 2)
			printf ".${directive}($(stringify "${parameter}"))"
		done <<< "${rules}"
		printf ";\n"
	fi
}

sourcepath=$(readlink -f "${1}")
shift 1

echo "JS.Packages(function () {"
for filepath; do
	realpath=$(readlink -f "${filepath}")
	manifest ${sourcepath} ${realpath}
done
echo "});"

exit

while read fullpath; do
	relativepath=$(relatify "${SOURCE_DIR}" "${fullpath}")
	manifest "${fullpath}" "${relativepath}"
done <<< "${SOURCES_FILES}"
