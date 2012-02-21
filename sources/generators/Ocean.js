/**
 * @author Florian 'Champii' Greiner
 */

/**
 * @class
 *
 *
 * @toc Generator.Ocean
 *
 */

//!requires:Generator
//!provides:Generator.Ocean
//
//!requires:JS.Class

Generator.Ocean = new JS.Class('Generator.Ocean', {

  initialize: function () {

  },

  applyRessources: function (y, max) {

    if (y > 64 && y <= 127)
      return (0);
    
    if (y <= 64 && y > max)
      return (6);
    
    return (1);
    
  }

});
