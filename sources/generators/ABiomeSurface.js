/**
 * @author Florian 'Champii' Greiner
 */

/**
 * @class
 *
 * Inherit from ABiome
 * ABiomeSurface is an abstract class that represent a Surface Biome (Lake, Mountain etc)
 *
 * @toc Generator.ABiomeSurface
 *
 * @see Generator.ABiome
 *
 */

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

  /**
   * Apply Biome on chunk
   *
   * @memberof Generator.ABiomeSurface#
   *
   * @param {Generator.Chunk} chunk Chunk to modify with the biome
   * @return {Generator.Chunk} Modified chunk
   */
  
  applyBiome: function (chunk) {

    console.log("Apply Perlin in :" + chunk.position.x + " / " + chunk.position.z);
    this.perlin.generate([chunk.position.x, chunk.position.z], [16, 16], function (point, value) {
      var blockPos = [point[0] - chunk.position.x, point[1] - chunk.position.z];
      chunk.makeLevelAt(blockPos, value * 10);
    });

    return (chunk);
//     throw "Unimplemented method : Generator.ABiomeSurface.applyBiome()";
    
  }

});