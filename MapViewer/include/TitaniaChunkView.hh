#ifndef			    TITANIAChunkView_HH
# define		    TITANIAChunkView_HH

# include		    <fstream>
# include		    <list>
# include		    <map>

# include		    <SDL/SDL.h>
# include		    <SDL/SDL_ttf.h>
# include		    <SDL/SDL_image.h>
# include		    "Chunk.hh"

class			    TitaniaChunkView
{
public:
  TitaniaChunkView();

public:
  void			    init(char *);
  void			    run();
  void			    draw();
  void			    update();
  Point			    *getChunk(char *);
  Point			    *getBlock(char *);

private:
  Chunk			    *current_;
  int			    yCur_;
  int			    xSize_;
  int			    ySize_;
  int			    value_;
  std::fstream		    file_;
  SDL_Surface		    *screen_;
  std::list<SDL_Surface *>  biomes_;
  std::map<Point *, Chunk *>  mapChunk_;
};

#endif			    // TITANIAChunkView_HH
