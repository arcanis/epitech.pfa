/**
 * @author Florian 'Champii' Greiner
 */

/**
 * @class
 *
 * ABiome is an abstract class that represent a Biome
 *
 * @toc Generator.ABiome
 *
 */

//!requires:Generator
//!provides:Generator.ABiome
//
//!requires:JS.Class

Generator.ABiome = new JS.Class({

  /**
   * @name blockTypes
   * @memberof Generator.ABiome#
   *
   * @description
   *
   * Array that contain blocks types
   */

  /**
   * @name position
   * @memberof Generator.ABiome#
   *
   * @description
   *
   * Point structure that represent the biome Position
   */
  
  initialize: function () {

    this.blockTypes = [];
    this.position = {x:0, y:0, z:0};
  },

  /**
   * Apply Biome on chunk
   *
   * @memberof Generator.ABiome#
   *
   * @param {Generator.Chunk} chunk Chunk to modify with the biome
   * @return {Generator.Chunk} Modified chunk
   */
  
  applyBiome: function (chunk) {

    throw "Unimplemented method : Generator.ABiome.applyBiome";
    
  }
  
});
