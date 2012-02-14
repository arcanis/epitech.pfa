/**
 * @author Florian 'Champii' Greiner
 */

/**
 * @class
 *
 * The BiomesManager2 class manage all the biome creation process, and the application of them on the new chunk.
 *
 * @toc Generator.BiomesManager2
 *
 */

//!requires:Generator
//!provides:Generator.BiomesManager2
//
//!requires:JS.Class
//!requires:Generator.LandscapeBiome
//!requires:Generator.MountainBiome
//!requires:Generator.DesertBiome
//!requires:Generator.OceanBiome
//!requires:Generator.CanyonBiome
//!requires:Generator.LevelGenerator


Generator.BiomesManager2 = new JS.Class({

  initialize: function () {

    this.level = new Generator.LevelGenerator();

  },

  applyBiomes: function (chunk) {

    this.level.generate([chunk.position.x * 16, chunk.position.z * 16], [16, 16], function (point, value) {
      var blockPos = [point[0] - chunk.position.x * 16, point[1] - chunk.position.z * 16];
      chunk.makeLevelAt(blockPos, Math.floor(value * 64) + 64);
      console.log(blockPos[0], Math.floor(value * 64) + 64, blockPos[1], 1);
    });
    
    return (chunk);

  }

});

