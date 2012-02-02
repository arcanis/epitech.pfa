/**
 * @class
 *
 * The DesertBiome class represent the Desert Biome modificator<br />
 * It inherits from ABiomeSurface
 *
 * @toc Generator.DesertBiome
 *
 * @see Generator.ABiome
 * @see Generator.ABiomeSurface
 * @see Generator.LevelGenerator
 *
 */

//!requires:Generator
//!provides:Generator.DesertBiome
//
//!requires:Generator.ABiomeSurface
//!requires:JS.Class

Generator.DesertBiome = new JS.Class(Generator.ABiomeSurface, {

  initialize: function () {

    this.callSuper();

  },

  /**
   * Apply Biome on chunk
   *
   * @memberof Generator.DesertBiome#
   *
   * @param {Generator.Chunk} chunk Chunk to modify with the biome
   * @return {Generator.Chunk} Modified chunk
   */
  
  applyBiome: function (chunk) {

    this.callSuper();
    return (chunk);

  }

});