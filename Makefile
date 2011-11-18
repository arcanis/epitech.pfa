SOURCES = $(shell find ./sources -name '*.js' -print)

MANIFESTS = $(SOURCES:.js=.jsm)

COMPRESSED = $(SOURCES:.js=.jsc)

CYAN    = $(shell tput setf 3)
GREEN   = $(shell tput setf 2)
MAGENTA = $(shell tput setf 5)
RESET   = $(shell tput sgr0)

all: build/titania.js
	@printf "%sBuilds are up-to-date.%s\n" "${MAGENTA}" "${RESET}"

server: build/titania.js

build/titania.js: $(MANIFESTS) $(COMPRESSED)
	@printf "%sGenerate final build ...%s\n" "${CYAN}" "${RESET}"
	@cat $(MANIFESTS) > build/manifest.js
	@jsbuild --manifest build/manifest.js --root sources Main > $(@)
	@uglifyjs --no-copyright --overwrite $(@)

%.jsm: %.js
	@printf "%sCreate manifest for %s ...%s\n" "$(GREEN)" "$(<)" "$(RESET)"
	@scripts/manifest.sh sources $(<) > $(@)

%.jsc: %.js
	@printf "%sCreate compressed version of %s ...%s\n" "$(GREEN)" "$(<)" "$(RESET)"
	@uglifyjs --no-copyright -o $(@) $(<)

documentation:
	jsdoc --recurse --destination documentation sources

clean:
	@printf "%sRemove manifests and compressed files.%s\n" "${MAGENTA}" "${RESET}"
	@rm -f $(MANIFESTS)
	@rm -f $(COMPRESSED)
	@rm -f $(MANIFESTS)
	@rm -f $(COMPRESSED)

fclean: clean
	@printf "%sRemove build and documentation.%s\n" "${MAGENTA}" "${RESET}"
	@rm -f build/titania.js
	@rm -rf documentation/*

re: fclean all

.PHONY: documentation clean fclean re all
