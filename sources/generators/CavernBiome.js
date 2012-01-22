/**
 * @author Florian 'Champii' Greiner
 */

/**
 * @class
 *
 * The CavernBiome class represent the Cavern Biome modificator<br />
 * It inherits from ABiomeUnder
 * 
 *
 * @toc Generator.CavernBiome
 *
 * @see Generator.ABiome
 * @see Generator.ABiomeUnder
 *
 */

//!requires:Generator
//!provides:Generator.CavernBiome
//
//!requires:Generator.ABiomeUnder
//!requires:JS.Class

Generator.CavernBiome = new JS.Class(Generator.ABiomeUnder, {

  initialize: function () {

    this.callSuper();

  },

  /**
   * Apply Biome on chunk
   *
   * @memberof Generator.CavernBiome#
   *
   * @param {Generator.Chunk} chunk Chunk to modify with the biome
   * @return {Generator.Chunk} Modified chunk
   */
  
  applyBiome: function (chunk) {

    this.callSuper();
    return (chunk);

  }

});