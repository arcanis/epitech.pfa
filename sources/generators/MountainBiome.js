//!requires:Generator
//!provides:Generator.MountainBiome
//
//!requires:Generator.ABiomeSurface
//!requires:JS.Class

Generator.MountainBiome = new JS.Class(Generator.ABiomeSurface, {

  initialize: function () {

    this.callSuper();

  },

  applyBiome: function (chunk) {

    return (chunk);
    
  }

});