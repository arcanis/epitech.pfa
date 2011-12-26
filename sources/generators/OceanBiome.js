//!requires:Generator
//!provides:Generator.OceanBiome
//
//!requires:Generator.ABiomeSurface
//!requires:JS.Class

Generator.OceanBiome = new JS.Class(Generator.ABiomeSurface, {

  initialize: function () {

    this.callSuper();

  },

  applyBiome: function (chunk) {

    return (chunk);

  }

});