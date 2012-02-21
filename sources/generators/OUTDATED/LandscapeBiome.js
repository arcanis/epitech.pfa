/**
 * @class
 *
 * The LandscapeBiome class represent the Landscape Biome modificator<br />
 * It inherits from ABiomeSurface
 *
 * @toc Generator.LandscapeBiome
 *
 * @see Generator.ABiome
 * @see Generator.ABiomeSurface
 * @see Generator.LevelGenerator
 *
 */
//!requires:Generator
//!provides:Generator.LandscapeBiome
//
//!requires:Generator.ABiomeSurface
//!requires:JS.Class

Generator.LandscapeBiome = new JS.Class(Generator.ABiomeSurface, {

  initialize: function () {

    this.callSuper();

  },

  /**
   * Apply Biome on chunk
   *
   * @memberof Generator.LandscapeBiome#
   *
   * @param {Generator.Chunk} chunk Chunk to modify with the biome
   * @return {Generator.Chunk} Modified chunk
   */
  
  applyBiome: function (chunk) {

    this.callSuper();
    return (chunk);

  }

});