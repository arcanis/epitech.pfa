CLIENT_SOURCES = $(shell find ./source -path ./source/server -prune -o -name '*.js' -print)
SERVER_SOURCES = $(shell find ./source -path ./source/client -prune -o -name '*.js' -print)

CLIENT_MANIFESTS  = $(CLIENT_SOURCES:.js=.jsm)
CLIENT_COMPRESSED = $(CLIENT_SOURCES:.js=.jsc)

SERVER_MANIFESTS  = $(SERVER_SOURCES:.js=.jsm)
SERVER_COMPRESSED = $(SERVER_SOURCES:.js=.jsc)

CYAN    = $(shell tput setf 3)
GREEN   = $(shell tput setf 2)
MAGENTA = $(shell tput setf 5)
RESET   = $(shell tput sgr0)

all: client server
	@printf "%sBuilds are up-to-date.%s\n" "${MAGENTA}" "${RESET}"

client: build/client/application.js

server: build/server/application.js

build/client/application.js: $(CLIENT_MANIFESTS) $(CLIENT_COMPRESSED)
	@printf "%sGenerating final client build ...%s\n" "${CYAN}" "${RESET}"
	@cat $(CLIENT_MANIFESTS) > build/client/manifest.js
	@jsbuild --manifest build/client/manifest.js --root source Main > $(@)
	@uglifyjs --no-copyright --overwrite $(@)

build/server/application.js: $(SERVER_MANIFESTS) $(SERVER_COMPRESSED)
	@printf "%sGenerating final server build ...%s\n" "${CYAN}" "${RESET}"
	@cat $(SERVER_MANIFESTS) > build/server/manifest.js
	@jsbuild --manifest build/server/manifest.js --root source Main > $(@)
	@uglifyjs --no-copyright --overwrite $(@)

%.jsm: %.js
	@printf "%sCreating manifest for %s ...%s\n" "$(GREEN)" "$(<)" "$(RESET)"
	@scripts/manifest.sh source $(<) > $(@)

%.jsc: %.js
	@printf "%sCreating compressed version of %s ...%s\n" "$(GREEN)" "$(<)" "$(RESET)"
	@uglifyjs --no-copyright $(<) > $(@)

documentation:
	jsdoc --recurse --destination documentation source

clean:
	@printf "%sRemoving manifests & compressed files.%s\n" "${MAGENTA}" "${RESET}"
	@rm -f $(CLIENT_MANIFESTS)
	@rm -f $(CLIENT_COMPRESSED)
	@rm -f $(SERVER_MANIFESTS)
	@rm -f $(SERVER_COMPRESSED)

fclean: clean
	@printf "%sRemoving builds & documentation.%s\n" "${MAGENTA}" "${RESET}"
	@rm -f build/client/application.js
	@rm -f build/server/application.js
	@rm -rf documentation/*

re: fclean all

.PHONY: documentation clean fclean re all client server
