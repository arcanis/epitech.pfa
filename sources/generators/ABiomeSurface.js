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

    console.log("Apply Perlin in :" + chunk.position.x + " / " + chunk.position.z);
    this.perlin.generate([chunk.position.x, chunk.position.z], [16, 16], function (point, value) {
      chunk.makeLevelAt(point, value * 10);
    });
    
//     throw "Unimplemented method : Generator.ABiomeSurface.applyBiome()";
    
  }

});