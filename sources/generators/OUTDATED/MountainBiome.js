/**
 * @class
 *
 * The MountainBiome class represent the Mountain Biome modificator<br />
 * It inherits from ABiomeSurface
 *
 * @toc Generator.MountainBiome
 *
 * @see Generator.ABiome
 * @see Generator.ABiomeSurface
 * @see Generator.LevelGenerator
 *
 */

//!requires:Generator
//!provides:Generator.MountainBiome
//
//!requires:Generator.ABiomeSurface
//!requires:JS.Class

Generator.MountainBiome = new JS.Class(Generator.ABiomeSurface, {

  initialize: function () {

    this.callSuper();

  },

  /**
   * Apply Biome on chunk
   *
   * @memberof Generator.MountainBiome#
   *
   * @param {Generator.Chunk} chunk Chunk to modify with the biome
   * @return {Generator.Chunk} Modified chunk
   */
  
  applyBiome: function (chunk) {

    this.callSuper();
    return (chunk);
    
  }

});