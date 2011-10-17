CLIENT_SOURCES = $(shell puddi source titania.client --print | xargs -I X find X -maxdepth 1 -name '*.js')
SERVER_SOURCES = $(shell puddi source titania.server --print | xargs -I X find X -maxdepth 1 -name '*.js')

CLIENT_OBJECTS = $(CLIENT_SOURCES:.js=.jso)
SERVER_OBJECTS = $(SERVER_SOURCES:.js=.jso)

all: client server

client: build/client.js

server: build/server.js

build/client.js: $(CLIENT_OBJECTS)
	@printf "Generating final client archive.\n"
	@:|cat $(^) > $(@)

build/server.js: $(SERVER_OBJECTS)
	@printf "Generating final server archive.\n"
	@:|cat $(^) > $(@)

%.jso: %.js
	@printf "Compiling $(<) ...\n"
	@(echo "$(<)" | grep .dirty/ |:) || (jshint $(<))
	@uglifyjs -o $(@) $(<)

documentation:
	jsdoc --recurse --destination documentation source

clean:
	@printf "Removing javascript objects files.\n"
	@rm -f $(CLIENT_OBJECTS)
	@rm -f $(SERVER_OBJECTS)

fclean: clean
	@printf "Removing builds & documentation.\n"
	@rm -f build/client.js
	@rm -f build/server.js
	@rm -f documentation/*

re: fclean all
