#ifndef			  CHUNK_HH
# define		  CHUNK_HH

# include		    <SDL/SDL.h>
# include		    <SDL/SDL_ttf.h>
# include		    <SDL/SDL_image.h>
# include		  <map>

class			  Point
{
public:
  int			  x;
  int			  y;
  int			  z;
  int			  value;

public:
  Point			  &operator=(Point const &pt)
  {
    this->x = pt.x;
    this->y = pt.y;
    this->z = pt.z;
    this->value = pt.value;
    return *this;
  }

  Point()
  {

  }

  Point(Point const &pt)
  {
    this->x = pt.x;
    this->y = pt.y;
    this->z = pt.z;
    this->value = pt.value;
  }

  bool			  operator==(Point const &pt) const
  {
    if (this->x == pt.x && this->y == pt.y && this->z == pt.z)
      return (true);
    return (false);
  }

  bool			  operator<(Point const &pt) const
  {
    if (this->x < pt.x && this->y < pt.y && this->z < pt.z)
      return (true);
    return (false);
  }
};

class			  Chunk
{
public:
  Chunk(Point const *);

public:
  void			  addBlock(Point *);
  void			  draw(SDL_Surface *, int);
  void			  update();

private:
  std::map<Point *, int>  mapPoint_;
  Point			  pos_;
};

#endif // CHUNK_HH
