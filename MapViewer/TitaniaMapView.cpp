#include		    <sstream>
#include		    <iostream>

#include		    "TitaniaMapView.hh"


TitaniaMapView::TitaniaMapView()
{
}

SDL_Rect		      *TitaniaMapView::getRect(char *buff)
{
  std::string		      query(buff);
  std::string		      buffer;
  std::ostringstream	      os;
  size_t		      offset;
  SDL_Rect		      *rect = new SDL_Rect;

  if ((offset = query.find_first_of(" ")) != query.npos)
  {
    buffer.assign(query, 0, offset);
    query.assign(query, offset + 1, query.size());
    std::istringstream	      is(buffer);
    is >> rect->x;
  }
  if ((offset = query.find_first_of(" ")) != query.npos)
  {
    buffer.assign(query, 0, offset);
    query.assign(query, offset + 1, query.size());
    std::istringstream	      is(buffer);
    is >> rect->y;
  }
  if ((offset = query.find_first_of(" ")) != query.npos)
  {
    buffer.assign(query, 0, offset);
    query.assign(query, offset + 1, query.size());
    std::istringstream	      is(buffer);
    is >> rect->w;
    rect->w -= rect->x;
  }
  if ((offset = query.find_first_of(" ")) == query.npos)
  {
    buffer.assign(query, 0, offset);
    std::istringstream	      is(buffer);
    is >> rect->h;
    rect->h -= rect->y;
  }
  return (rect);
}

void			      TitaniaMapView::init(char *av)
{
  char			      buffer[128];

  this->file_.open(av, std::fstream::in);
  if (this->file_.fail())
  {
    std::cout << "File failed to be opened" << std::endl;
    return ;
  }
  if (this->file_.getline(buffer, 128))
  {
    std::istringstream is(buffer);

    is >> this->xSize_;
  }
  if (this->file_.getline(buffer, 128))
  {
    std::istringstream is(buffer);

    is >> this->ySize_;
  }

  SDL_Init(SDL_INIT_VIDEO);
  this->screen_ = SDL_SetVideoMode(this->xSize_, this->ySize_, 32, SDL_DOUBLEBUF);

  char color = 32;
  while (this->file_.getline(buffer, 128))
  {
    std::cout << buffer << std::endl;
    SDL_Rect   *rect = this->getRect(buffer);
    SDL_Rect   *newRect = new SDL_Rect;

    newRect->x = rect->x;
    newRect->y = rect->y;
    newRect->w = rect->w - 1;
    newRect->h = rect->h - 1;
    std::cout << rect->x << rect->y << rect->w << rect->h << std::endl;
    SDL_FillRect(this->screen_, rect, SDL_MapRGB(this->screen_->format, 0x00, 0x00, 0x00));

    SDL_FillRect(this->screen_, newRect, SDL_MapRGB(this->screen_->format, (color + rect->y) % 255, (color + rect->h) % 255, (color + rect->w) % 255));
  }
}

void			      TitaniaMapView::run()
{

  while (1)
  {
    SDL_Flip(this->screen_);
  }
  SDL_Quit();
}
