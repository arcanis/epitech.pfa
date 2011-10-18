CLIENT_SOURCES = $(shell puddi source titania.client --print | xargs -I X find X -maxdepth 1 -name '*.js')
SERVER_SOURCES = $(shell puddi source titania.server --print | xargs -I X find X -maxdepth 1 -name '*.js')

CLIENT_OBJECTS = $(CLIENT_SOURCES:.js=.jso)
SERVER_OBJECTS = $(SERVER_SOURCES:.js=.jso)

CYAN    = $(shell tput setf 3)
GREEN   = $(shell tput setf 2)
MAGENTA = $(shell tput setf 5)
RESET   = $(shell tput sgr0)

all: client server
	@:

client: build/client/application.js

server: build/server/application.js

documentation:
	@printf "%sGenerating documentation ...%s\n" "${CYAN}" "${RESET}"
	@jsdoc --recurse --destination documentation source

build/client/application.js: $(CLIENT_OBJECTS)
	@printf "%sGenerating final client build ...%s\n" "${CYAN}" "${RESET}"
	@scripts/manifest.sh source $(^) > build/client/manifest.js
	@jsbuild --manifest build/client/manifest.js --root source Main > $(@)	

build/server/application.js: $(SERVER_OBJECTS)
	@printf "%sGenerating final server build...%s\n" "${CYAN}" "${RESET}"
	@scripts/manifest.sh source $(^) > build/server/manifest.js
	@jsbuild --manifest build/server/manifest.js --root source Main > $(@)

%.jso: %.js
	@printf "%sCompiling $(<) ...%s\n" "${GREEN}" "${RESET}"
	@jshint $(<) --reporter scripts/reporter.js
	@uglifyjs -o $(@) $(<)

clean:
	@printf "%sRemoving javascript objects files.%s\n" "${MAGENTA}" "${RESET}"
	@rm -f $(CLIENT_OBJECTS)
	@rm -f $(SERVER_OBJECTS)

fclean: clean
	@printf "%sRemoving builds & documentation.%s\n" "${MAGENTA}" "${RESET}"
	@rm -f build/client.js
	@rm -f build/server.js
	@rm -fr documentation/*

re: fclean all

.PHONY: all documentation client server clean fclean re
