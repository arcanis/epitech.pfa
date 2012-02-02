/**
 * @class
 *
 * The OceanBiome class represent the Ocean Biome modificator<br />
 * It inherits from ABiomeSurface
 *
 * @toc Generator.OceanBiome
 *
 * @see Generator.ABiome
 * @see Generator.ABiomeSurface
 * @see Generator.LevelGenerator
 *
 */

//!requires:Generator
//!provides:Generator.OceanBiome
//
//!requires:Generator.ABiomeSurface
//!requires:JS.Class

Generator.OceanBiome = new JS.Class(Generator.ABiomeSurface, {

  initialize: function () {

    this.callSuper();

  },

  /**
   * Apply Biome on chunk
   *
   * @memberof Generator.OceanBiome#
   *
   * @param {Generator.Chunk} chunk Chunk to modify with the biome
   * @return {Generator.Chunk} Modified chunk
   */
  
  applyBiome: function (chunk) {

    this.callSuper();
    return (chunk);

  }

});