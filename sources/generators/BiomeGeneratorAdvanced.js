/**
 * @author Florian 'Champii' Greiner
 */

/**
 * @class
 *
 *
 * @toc Generator.BiomeGeneratorAdvanced
 *
 */

//!requires:Generator
//!provides:Generator.BiomeGeneratorAdvanced
//
//!requires:JS.Class
//!requires:Generator.Chunk
//!requires:Generator.Caverne

Generator.BiomeGeneratorAdvanced = new JS.Class('Generator.BiomeGeneratorAdvanced', {

  initialize: function () {
    
    this.caverne = new Generator.Caverne();
  },

  generate: function (chunk) {

    chunk = this.caverne.generate(chunk);
    return (chunk);
  }

});
