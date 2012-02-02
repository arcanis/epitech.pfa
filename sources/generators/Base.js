/**
 * @author Florian 'Champii' Greiner
 */

/**
 * @class
 *
 * A Base Generator represent the public object for generate a new chunk.<br />
 * You only need to call the 'generate(x, z)' function with the positions of the new desirated chunk.<br /><br />
 *
 * A chunk is going to be generated with full cobblestone below water level ( y <= 64 )<br />
 * and with full air above. ( y > 64 ).<br />
 *
 * Then the RessourceGenerator will put multiples ressources seeds in the cobblestone part.<br /><br />
 * The last part belongs to the BiomeManager.<br />
 * A new biome is created if the new chunk don't fit in any of them.<br />
 * Finaly, the perlin noise relative to the biome is applied on the chunk.<br />
 * For the moment, no specialized biome is implemented. Task in top of the stack !<br />
 *
 * @toc Generator.Base
 *
 * @see Generator.RessourceGenerator
 * @see Generator.BiomesManager
 */

//!requires:Generator
//!provides:Generator.Base
// 
//!requires:JS.Class
//!requires:Generator.RessourceGenerator
//!requires:Generator.BiomesManager

Generator.Base = new JS.Class('Generator.Base', {

	/**
	* @name ressourceGenerator
	* @memberof Generator.Base#
	* @see Generator.RessourceGenerator
	*
	* @description
	*
	* Hold a RessourceGenerator to create and fill new chunk
	*/

	/**
	 * @name biomesManager
	 * @memberof Generator.Base#
	 * @see Generator.BiomesManager
	 *
	 * @description
	 *
	 * Hold a BiomesManager to apply the right perlin noise
	 */
  
	initialize: function () {
		
		this.ressourceGenerator = new Generator.RessourceGenerator();
		this.biomesManager = new Generator.BiomesManager();
		
	},

	/**
	 *
	 * Return a new chunk at the given positions
	 *
	 * @memberof Generator.Base#
	 *
	 * @see Generator.RessourceGenerator.generateChunkRessources()
	 * @see Generator.BiomesManager.applyBiomes()
	 *
	 * @param {Integer} x New chunk X Position
	 * @param {Integer} z New chunk Z Position
	 * @return {Chunk} New Chunk generated
	 */
	
	generate: function (x, z) {
		
		var chunk = this.ressourceGenerator.generateChunkRessources(x, z);
		chunk = this.biomesManager.applyBiomes(chunk);

		return (chunk);
		
	}
	
});
