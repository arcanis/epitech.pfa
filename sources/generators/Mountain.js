/**
 * @author Florian 'Champii' Greiner
 */

/**
 * @class
 *
 *
 * @toc Generator.Mountain
 *
 */

//!requires:Generator
//!provides:Generator.Mountain
//
//!requires:JS.Class

Generator.Mountain = new JS.Class('Generator.Mountain', {

  initialize: function () {

  },

  applyRessources: function (y, max) {

    if (y > max && y <= 127)
      return (0);
    
    if (y <= max && y > max - 5)
      return (2);
    
    return (1);
  }

});
