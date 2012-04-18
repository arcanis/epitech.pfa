/**
 * @author Florian 'Champii' Greiner
 */

/**
 * @class
 *
 *
 * @toc Generator.Canyon
 *
 */

//!requires:Generator
//!provides:Generator.Canyon
//
//!requires:JS.Class

Generator.Canyon = new JS.Class('Generator.Canyon', {

  initialize: function () {

  },

  applyRessources: function (y, max) {

    if (y <= max && y > max - 2)
      return (4);
    if (y <= max - 2 && y > max - 5)
      return (3);
    return (1);
  }

});
