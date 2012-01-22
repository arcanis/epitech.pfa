/**
 * @author Florian 'Champii' Greiner
 */

/**
 * @class
 *
 * The CanyonBiome class represent the Canyon Biome modificator<br />
 * It inherits from ABiomeSurface
 *
 * @toc Generator.CanyonBiome
 *
 * @see Generator.ABiome
 * @see Generator.ABiomeSurface
 * @see Generator.LevelGenerator
 *
 */

//!requires:Generator
//!provides:Generator.CanyonBiome
//
//!requires:JS.Class
//!requires:Generator.ABiomeSurface
//!requires:Generator.LevelGenerator

Generator.CanyonBiome = new JS.Class(Generator.ABiomeSurface, {

  initialize: function () {

    this.callSuper();

  },

  /**
   * Apply Biome on chunk
   *
   * @memberof Generator.CanyonBiome#
   *
   * @param {Generator.Chunk} chunk Chunk to modify with the biome
   * @return {Generator.Chunk} Modified chunk
   */
  
  applyBiome: function (chunk) {

    this.callSuper();
//     this.perlin = Generator.LevelGenerator();
    //chunk = this.perlin.generate(chunk);
    return (chunk);

  }

});