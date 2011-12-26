//!requires:Generator
//!provides:Generator.LandscapeBiome
//
//!requires:Generator.ABiomeSurface
//!requires:JS.Class

Generator.LandscapeBiome = new JS.Class(Generator.ABiomeSurface, {

  initialize: function () {

    this.callSuper();

  },

  applyBiome: function (chunk) {

    return (chunk);

  }

});