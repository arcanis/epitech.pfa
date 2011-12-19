//!requires:Generator
//!provides:Generator.ABiomeSurface
//
//!requires:JS.Class
//!requires:Generator.ABiome
//!requires:Generator.LevelGenerator

Generator.ABiomeSurface = new JS.Class(Generator.ABiome, {

  initialize: function () {

    this.callSuper();
    this.perlin = new Generator.LevelGenerator();
    
  },

  applyBiome: function (chunk) {

    throw "Unimplemented method : Generator.ABiomeSurface.applyBiome";
    
  }

});