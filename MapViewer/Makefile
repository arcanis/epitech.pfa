NAME			    = TitaniaMapView

SRCS			    = main.cpp		    \
			      TitaniaMapView.cpp    \
			      TitaniaChunkView.cpp  \
			      Chunk.cpp

OBJS			    = $(SRCS:.cpp=.o)

CC			    = g++
RM			    = rm -f
CPPFLAGS		    += -Wall -Wextra  -I./include -g3
LDFLAGS			    += -lSDLmain -lSDL -lSDL_image -lSDL_ttf

all			    : $(NAME)

$(NAME)			    : $(OBJS)
			    $(CC) -o $(NAME)  $(OBJS) $(LDFLAGS)

clean			    :
			    $(RM) $(OBJS)

fclean			    : clean
			    $(RM) $(NAME)

re			    : fclean all
