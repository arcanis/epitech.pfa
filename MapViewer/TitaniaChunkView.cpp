#include		    <sstream>
#include		    <iostream>

#include		    "TitaniaChunkView.hh"


TitaniaChunkView::TitaniaChunkView()
{
  this->yCur_ = 127;
}

Point			      *TitaniaChunkView::getChunk(char *buff)
{
  std::string		      query(buff);
  std::string		      buffer;
  std::ostringstream	      os;
  size_t		      offset;
  Point			      *pt = new Point();

  if ((offset = query.find_first_of(" ")) != query.npos)
  {
    buffer.assign(query, 0, offset);
    query.assign(query, offset + 1, query.size());
    std::istringstream	      is(buffer);
    is >> pt->x;
  }
  if ((offset = query.find_first_of(" ")) == query.npos)
  {
    buffer.assign(query, 0, offset);
//    query.assign(query, offset + 1, query.size());
    std::istringstream	      is(buffer);
    is >> pt->z;
  }
  pt->y = 0;
  pt->value = 0;
  return (pt);
}

Point			      *TitaniaChunkView::getBlock(char *buff)
{
  std::string		      query(buff);
  std::string		      buffer;
  std::ostringstream	      os;
  size_t		      offset;
  Point			      *pt = new Point();
  int			      value;

  if ((offset = query.find_first_of(" ")) != query.npos)
  {
    buffer.assign(query, 0, offset);
    query.assign(query, offset + 1, query.size());
    std::istringstream	      is(buffer);
    is >> pt->x;
  }
  if ((offset = query.find_first_of(" ")) != query.npos)
  {
    buffer.assign(query, 0, offset);
    query.assign(query, offset + 1, query.size());
    std::istringstream	      is(buffer);
    is >> pt->y;
  }
  if ((offset = query.find_first_of(" ")) != query.npos)
  {
    buffer.assign(query, 0, offset);
    query.assign(query, offset + 1, query.size());
    std::istringstream	      is(buffer);
    is >> pt->z;
  }
  if ((offset = query.find_first_of(" ")) == query.npos)
  {
    buffer.assign(query, 0, offset);
    std::istringstream	      is(buffer);
    is >> pt->value;
  }
  return (pt);
}

void			      TitaniaChunkView::init(char *av)
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
    this->xSize_ *= 16;
  }
  if (this->file_.getline(buffer, 128))
  {
    std::istringstream is(buffer);

    is >> this->ySize_;
    this->ySize_ *= 16;

  }

  SDL_Init(SDL_INIT_VIDEO);
  this->screen_ = SDL_SetVideoMode(this->xSize_, this->ySize_, 32, SDL_DOUBLEBUF);

  while (this->file_.getline(buffer, 128))
  {
    Point *toNew;
    if (buffer[0] == 'c')
    {
      toNew = this->getChunk(buffer + 2);
      if (toNew->x > 16)
	return ;
      this->mapChunk_[toNew] = new Chunk(toNew);
      this->current_ = this->mapChunk_[toNew];
      std::cout << "New chunk "  << toNew->x << " " << toNew->z << " " << this->mapChunk_[toNew] << std::endl;
    }
    else
    {
      toNew = this->getBlock(buffer);
      this->current_->addBlock(toNew);
 //     std::cout << "New Block " << toNew.x << " " << toNew.y << " " << toNew.z  << " " << toNew.value << std::endl;
    }
  }
}

void			      TitaniaChunkView::run()
{

  while (1)
  {
    SDL_Event event;

    SDL_WaitEvent(&event);
    if (event.type == SDL_QUIT || event.key.keysym.sym == SDLK_ESCAPE)
      exit (0);
    else if (event.key.keysym.sym == SDLK_PLUS)
    {
      this->yCur_++;
      std::cout << this->yCur_ << std::endl;
    }
    else if (event.key.keysym.sym == SDLK_MINUS)
    {
      this->yCur_--;
      std::cout << this->yCur_ << std::endl;
    }

    this->draw();
    SDL_Flip(this->screen_);
  }
  SDL_Quit();
}

void			      TitaniaChunkView::draw()
{
  std::map<Point *, Chunk *>::iterator it = this->mapChunk_.begin();

  for (; it != this->mapChunk_.end(); it++)
  {
      it->second->draw(this->screen_, this->yCur_);
  }

}

void			      TitaniaChunkView::update()
{

}
