CLIENT_SOURCES = $(shell puddi source titania.client --print | xargs -I X find X -maxdepth 1 -name '*.js')
SERVER_SOURCES = $(shell puddi source titania.server --print | xargs -I X find X -maxdepth 1 -name '*.js')

CLIENT_OBJECTS = $(CLIENT_SOURCES:.js=.jso)
SERVER_OBJECTS = $(SERVER_SOURCES:.js=.jso)

all: client server

client: build/client.js

server: build/server.js

build/client.js: $(CLIENT_OBJECTS)
	:|cat $(^) > $(@)

build/server.js: $(SERVER_OBJECTS)
	:|cat $(^) > $(@)

%.jso: %.js
	jshint ${<}
	uglifyjs -o $(@) $(<)

clean:
	$(RM) $(CLIENT_OBJECTS)
	$(RM) $(SERVER_OBJECTS)

fclean: clean
	$(RM) build/client.js
	$(RM) build/server.js

documentation:
	jsdoc --recurse --destination documentation source

re: fclean all
