/**
 * @author Florian 'Champii' Greiner
 */

/**
 * @class
 *
 *
 * @toc Generator.Landscape
 *
 */

//!requires:Generator
//!provides:Generator.Landscape
//
//!requires:JS.Class

Generator.Landscape = new JS.Class('Generator.Landscape', {

  initialize: function () {

  },

  applyRessources: function (y, max) {

    if (y > max && y <= 127)
      return (0);
    
    if (y <= max && y > max - 2)
      return (4);
    
    if (y <= max - 2 && y > max - 5)
      return (3);
    return (1);
  }

});
