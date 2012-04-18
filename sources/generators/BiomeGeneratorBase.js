/**
 * @author Florian 'Champii' Greiner
 */

/**
 * @class
 *
 *
 * @toc Generator.BiomeGeneratorBase
 *
 */

//!requires:Generator
//!provides:Generator.BiomeGeneratorBase
//
//!requires:JS.Class
//!requires:Generator.Chunk
//!requires:Generator.LevelGenerator
//!requires:Generator.Landscape
//!requires:Generator.Mountain
//!requires:Generator.Ocean


Generator.BiomeGeneratorBase = new JS.Class('Generator.BiomeGeneratorBase', {

  initialize: function () {

    this.level = new Generator.LevelGenerator();
    this.landscape = new Generator.Landscape();
    this.ocean = new Generator.Ocean();
    this.mountain = new Generator.Mountain();

  },


  applyBiome: function (chunk, blockPos, value) {


    var func;
    if (/*value > 50 && */value <= 64)
      func = this.ocean.applyRessources;
    else if (value > 64 && value <= 80)
      func = this.landscape.applyRessources;
    else if (value > 80 && value <= 127)
      func = this.mountain.applyRessources;
    chunk.makeLevelAt(blockPos, value, func);
    
    
  },
  
  generate: function (chunk) {


    var that = this;
    var funct = function (point, value) {
      var blockPos = [point[0] - chunk.position.x * 16, point[1] - chunk.position.z * 16];

      that.applyBiome(chunk, blockPos, Math.floor(value * 64) + 50);
      //       console.log(blockPos[0], Math.floor(value * 64) + 64, blockPos[1], 1);
    };
    
    this.level.generate([chunk.position.x * 16, chunk.position.z * 16], [16, 16], funct);
    
    return (chunk);
  }
  
});
