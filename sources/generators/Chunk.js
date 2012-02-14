/**
 * @class
 *
 * The Chunk class represent a chunk object. It contains blocks with a integer value that represent a block type
 *
 * @toc Generator.Chunk
 * 
 */

//!requires:Generator
//!provides:Generator.Chunk
//
//!requires:JS.Class
//!requires:JS.Hash

Generator.Chunk = new JS.Class ({

  /**
   * @name position
   * @memberof Generator.Chunk
   *
   * Hold a x|z structure that represent the origins positions of the chunk
   *
   */

  /**
   * @name blocks
   * @memberof Generator.Chunk
   *
   * A JS.Hash object that contains the blocks list
   *
   * @see JS.Hash
   *
   */
  
  initialize: function (x, z) {

    this.position = {x:x, z:z};
    this.blocks = new JS.Hash();

  },

  /**
   * Fill the entire Chunk with a block array given
   *
   * @memberof Generator.Chunk#
   *
   * @param {Array} array Integer array that contains all the blocks values
   */
  
  fill: function (array) {

    var i = 0;
    for (var x = 0; x < 16; x++)
      for (var y = 0; y < 128; y++)
	for (var z = 0; z < 16; z++)
	  this.blocks.put('' + x + ';' + y + ';' + z, array[i++]);
  },

  /**
   * Make a relief on a Y chunk position
   *
   * @memberof Generator.Chunk#
   *
   * @param {Array} point Integer array (size = 2) that contains block position
   * @param {Integer} value New block value
   */
  
  makeLevelAt: function (point, value) {

    for (var y = 0; y < value; y++)
    {
      this.blocks.put('' + point[0] + ';' + y + ';' + point[1], 1);
      //console.log(point[0] + " " + y + " " + point[1], 1);
    }
  },

  /**
   * Get an array of all blocks
   *
   * @memberof Generator.Chunk#
   *
   * @return {Array} Array with all blocks value inside
   */
  
  getArray: function () {

    return (this.blocks.values());
      
  }
  
});
