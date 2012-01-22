/**
 * @author Florian 'Champii' Greiner
 */

/**
 * @class
 *
 * Inherit from ABiome<br />
 * ABiomeSurface is an abstract class that represent a Surface Biome (Lake, Mountain etc)<br />
 * Hold a LevelGenerator, for the biome coherence
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

  /**
   * @name perlin
   * @memberof Generator.ABiomeSurface#
   * @memberof Generator.CanyonBiome#
   * @memberof Generator.DesertBiome#
   * @memberof Generator.LandscapeBiome#
   * @memberof Generator.MountainBiome#
   * @memberof Generator.OceanBiome#
   *
   * @description
   *
   * Hold a LevelGenerator, which represent a Perlin Noise implementation
   *
   * @see Generator.LevelGenerator
   */
  
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
    
  }

});