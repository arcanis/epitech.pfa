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

    //NEED TO GET THE CHUNK(and blocks) POSITION RELATIVE TO THE BIOME ORIGINE
    console.log("Apply Perlin in :" + chunk.position.x + " / " + chunk.position.z);
    this.perlin.generate([chunk.position.x, chunk.position.z], [chunk.position.x + 16, chunk.position.z + 16], function (point, value) {
      console.log(point, value);
    });
    
//     throw "Unimplemented method : Generator.ABiomeSurface.applyBiome()";
    
  }

});