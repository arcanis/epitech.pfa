#include		    <iostream>

#include		    "TitaniaMapView.hh"
#include		    "TitaniaChunkView.hh"

int			    main(int ac, char **av)
{
  TitaniaChunkView	    tmv;

  if (ac != 2)
  {
    std::cout << "Usage : " << av[0] << " file" << std::endl;
    return (-1);
  }
  tmv.init(av[1]);
  tmv.run();
  return (0);
}
