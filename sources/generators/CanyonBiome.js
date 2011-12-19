//!requires:Generator
//!provides:Generator.CanyonBiome
//
//!requires:Generator.ABiomeSurface
//!requires:JS.Class

Generator.CanyonBiome = new JS.Class(Generator.ABiomeSurface, {

  initialize: function () {

    this.callSuper();

  },

  applyBiome: function (chunk) {

    return (chunk);

  }

});