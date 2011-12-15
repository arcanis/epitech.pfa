//!requires:Generator
//!provides:Generator.DesertBiome
//
//!requires:Generator.ABiomeSurface
//!requires:JS.Class

Generator.DesertBiome = new JS.Class(Generator.ABiomeSurface, {

  initialize: function () {

    this.callSuper();

  },

  applyBiome: function (chunk) {

    return (chunk);

  }

});