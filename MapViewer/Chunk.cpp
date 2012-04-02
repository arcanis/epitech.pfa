#include		    <iostream>

#include		    "Chunk.hh"


Chunk::Chunk(Point const *pt)
  : pos_(*pt)
{
}


void			  Chunk::addBlock(Point *pt)
{
//  std::cout << "New Block " << pt.x << " " << pt.y << " " << pt.z  << " " << pt.value << std::endl;

  this->mapPoint_[pt] = pt->value;
}

void			  Chunk::draw(SDL_Surface *screen, int yCur)
{
  std::map<Point *, int>::iterator it = this->mapPoint_.begin();

  for (; it != this->mapPoint_.end(); it++)
  {
//    std::cout << it->first->y << std::endl;
    if (it->first->y == yCur)
    {
//      std::cout << "Draw Block " << it->first->x << " " << it->first->y << " " << it->first->z  << " " << it->first->value << std::endl;

      SDL_Rect *rect = new SDL_Rect;
      rect->x = (this->pos_.x * 16) + it->first->x;
      rect->y = (this->pos_.z * 16) + it->first->z;
      rect->w = 1;
      rect->h = 1;

      if (it->second == 0) // air
	SDL_FillRect(screen, rect, SDL_MapRGB(screen->format, 0, 0, 0));
      if (it->second == 1) // cobble
	SDL_FillRect(screen, rect, SDL_MapRGB(screen->format, 25, 25, 25));
      if (it->second == 2) // stone
	SDL_FillRect(screen, rect, SDL_MapRGB(screen->format, 50, 50, 50));
      if (it->second == 3) // dirt
	SDL_FillRect(screen, rect, SDL_MapRGB(screen->format, 0, 50, 50));
      if (it->second == 4) // grass
	SDL_FillRect(screen, rect, SDL_MapRGB(screen->format, 0, 128, 0));
      if (it->second == 5) // sand
	SDL_FillRect(screen, rect, SDL_MapRGB(screen->format, 128, 128, 0));
      if (it->second == 6) // water
	SDL_FillRect(screen, rect, SDL_MapRGB(screen->format, 0, 0, 255));
     }

  }
}

void			  Chunk::update()
{

}
