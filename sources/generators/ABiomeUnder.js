/**
 * @author Florian 'Champii' Greiner
 */

/**
 * @class
 *
 * Inherit from ABiome<br />
 * ABiomeUnder is an abstract class that represent an Underground Biome (cavern, lava lake etc)
 *
 * @toc Generator.ABiomeUnder
 *
 * @see Generator.ABiome
 *
 */

//!requires:Generator
//!provides:Generator.ABiomeUnder
//
//!requires:Generator.ABiome
//!requires:JS.Class

Generator.ABiomeUnder = new JS.Class(Generator.ABiome, {

  initialize: function () {

    this.callSuper();

  },

  /**
   * Apply Biome on chunk
   *
   * @memberof Generator.ABiomeUnder#
   *
   * @param {Generator.Chunk} chunk Chunk to modify with the biome
   * @return {Generator.Chunk} Modified chunk
   */
  
  applyBiome: function (chunk) {

    throw "Unimplemented method : Generator.ABiomeUnder.applyBiome";

  }

});
