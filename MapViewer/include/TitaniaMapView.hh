#ifndef			    TITANIAMAPVIEW_HH
# define		    TITANIAMAPVIEW_HH

# include		    <fstream>
# include		    <list>

# include		    <SDL/SDL.h>
# include		    <SDL/SDL_ttf.h>
#include		    <SDL/SDL_image.h>

class			    TitaniaMapView
{
public:
  TitaniaMapView();

public:
  void			    init(char *);
  void			    run();
  SDL_Rect		    *getRect(char *);

private:
  int			    xSize_;
  int			    ySize_;
  std::fstream		    file_;
  SDL_Surface		    *screen_;
  std::list<SDL_Surface *>  biomes_;
};

#endif			    // TITANIAMAPVIEW_HH
