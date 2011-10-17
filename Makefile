CLIENT_SOURCES = $(shell puddi source titania.client --print | xargs -I X find X -maxdepth 1 -name '*.js')
SERVER_SOURCES = $(shell puddi source titania.server --print | xargs -I X find X -maxdepth 1 -name '*.js')

CLIENT_OBJECTS = $(CLIENT_SOURCES:.js=.jso)
SERVER_OBJECTS = $(SERVER_SOURCES:.js=.jso)

CYAN    = $(shell tput setf 3)
GREEN   = $(shell tput setf 2)
MAGENTA = $(shell tput setf 5)
RESET   = $(shell tput sgr0)

all: client server
	@printf "%sBuilds are up-to-date.%s\n" "${MAGENTA}" "${RESET}"

client: build/client.js

server: build/server.js

build/client.js: $(CLIENT_OBJECTS)
	@printf "%sGenerating final client build ...%s\n" "${CYAN}" "${RESET}"
	@scripts/manifest.sh source $(^) > $(@)
	@scripts/bootstrap.sh >> $(@)

build/server.js: $(SERVER_OBJECTS)
	@printf "%sGenerating final server build...%s\n" "${CYAN}" "${RESET}"
	@scripts/manifest.sh source $(^) > $(@)
	@scripts/bootstrap.sh >> $(@)

%.jso: %.js
	@printf "%sCompiling $(<) ...%s\n" "${GREEN}" "${RESET}"
	@jshint $(<) --reporter scripts/reporter.js
	@uglifyjs -o $(@) $(<)

documentation:
	jsdoc --recurse --destination documentation source

clean:
	@printf "%sRemoving javascript objects files.%s\n" "${MAGENTA}" "${RESET}"
	@rm -f $(CLIENT_OBJECTS)
	@rm -f $(SERVER_OBJECTS)

fclean: clean
	@printf "%sRemoving builds & documentation.%s\n" "${MAGENTA}" "${RESET}"
	@rm -f build/client.js
	@rm -f build/server.js
	@rm -f documentation/*

re: fclean all
