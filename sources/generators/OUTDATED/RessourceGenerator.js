/**
 * @author Florian 'Champii' Greiner
 */

/**
 * @class
 *
 * The RessourceGenerator is used to create new flat chunk, and to fill ressources in it.
 *
 * @toc Generator.RessourceGenerator
 */

//!requires:Generator
//!provides:Generator.RessourceGenerator
//
//!requires:JS.Class
//!requires:Generator.Chunk

Generator.RessourceGenerator = new JS.Class({

  initialize: function () {

  },

  /**
   * Make an empty chunk, with cobblestone at y <= 64 and air at y > 64
   *
   * @memberof Generator.RessourceGenerator#
   *
   * @see Generator.Chunk
   *
   * @param {Integer} x New chunk X Position
   * @param {Integer} z New chunk Z Position
   * @return {Generator.Chunk} Factory chunk
   * 
   */
  
  makeEmptyChunk: function (x, z) {

    var newChunk = new Generator.Chunk(x, z);
    var i = 0;
    var array = [];
    
//     console.log("Generating empty Chunk");
    for (var X = 0; X < 16; X++)
      for (var Y = 0; Y < 128; Y++)
	for (var Z = 0; Z < 16; Z++)
	{
	  if (Y < 64) //Water Level
	    array[i++] = 1; //Stone
	  else
	    array[i++] = 0; //Air
	    //console.log("Generating bloc " + i + "/32768");
	}
	
//    newChunk.fill(array);
    return (newChunk);
    
  },

  /**
   * Entry point of the RessourceGenerator. Going to fill ressources in chunk (not yet)
   *
   * @memberof Generator.RessourceGenerator#
   *
   * @see Generator.Chunk
   *
   * @param {Integer} x New chunk X Position
   * @param {Integer} x New chunk Z Position
   * @return {Generator.Chunk} Return filled chunk
   *
   */
  
  generateChunkRessources: function (x, z) {

    var chunk = this.makeEmptyChunk(x, z);
//     console.log("A New Chunk has been created :");
//     console.log(chunk.position);
    return (chunk);
    
  }

});
