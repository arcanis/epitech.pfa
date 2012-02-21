/**
 * @author Florian 'Champii' Greiner
 */

/**
 * @class
 *
 * @toc Generator.Base
 *
 */

//!requires:Generator
//!provides:Generator.Base
// 
//!requires:JS.Class
//!requires:Generator.BiomeGeneratorBase
//!requires:Generator.BiomeGeneratorAdvanced
//!requires:Generator.Chunk

Generator.Base = new JS.Class('Generator.Base', {

  
	initialize: function () {

	  this.BiomeBase = new Generator.BiomeGeneratorBase();
	  this.BiomeAdvanced = new Generator.BiomeGeneratorAdvanced();
	  
	},

	/**
	 *
	 * Return a new chunk at the given positions
	 *
	 * @memberof Generator.Base#
	 *
	 *
	 * @param {Integer} x New chunk X Position
	 * @param {Integer} z New chunk Z Position
	 * @return {Chunk} New Chunk generated
	 */
	
	generate: function (x, z) {
		
		var chunk = new Generator.Chunk(x, z);
		chunk = this.BiomeBase.generate(chunk);
		chunk = this.BiomeAdvanced.generate(chunk);

		return (chunk);
		
	}
	
});
