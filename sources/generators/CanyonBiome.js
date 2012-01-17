//!requires:Generator
//!provides:Generator.CanyonBiome
//
//!requires:JS.Class
//!requires:Generator.ABiomeSurface
//!requires:Generator.LevelGenerator

Generator.CanyonBiome = new JS.Class(Generator.ABiomeSurface, {

  initialize: function () {

    this.callSuper();

  },

  applyBiome: function (chunk) {

    this.callSuper();
//     this.perlin = Generator.LevelGenerator();
    //chunk = this.perlin.generate(chunk);
    return (chunk);

  }

});