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
  
  makeLevelAt: function (point, value, applyFunc) {

    for (var y = 127; y >= 0; y--)
    {
      var type = 0;
      if (applyFunc)
	type = applyFunc(y, value - 1);

      this.blocks.put('' + point[0] + ';' + y + ';' + point[1], type);
//      console.log(point[0] + " " + y + " " + point[1], type);
    }
  },

  /**
   * Erase all blocks betwin y1 and y2
   *
   * @memberof Generator.Chunk#
   * 
   * @param {Integer} x x value to be erased
   * @param {Integer} z z value to be erased
   * @param {Integer} y1 y min value to be erased
   * @param {Integer} y2 y max value to be erased
   * 
   */
  
  eraseBlocksBetwin: function (x, z, y1, y2) {

   // console.log(x + " " + z + " " + y1 + " " + y2);
    for (var i = y1; i <= y2; i++)
    {
      this.blocks.put('' + x + ';' + i + ';' + z, 0);      
    }

  },

  dumpBlocksBetwin: function (y1, y2) {

    for (var x = 0; x < 16; x++)
      for (var y = y1; y < y2; y++)
	for (var z = 0; z < 16; z++)
	  //console.log(this.blocks.get('' + x + ';' + y + ';' + z));
	
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
      
  },

  dumpAllBlocks: function () {

    for (var x = 0; x < 16; x++)
      for (var y = 0; y < 128; y++)
	for (var z = 0; z < 16; z++)
	  console.log(x + " " + y + " " + z + " " + this.blocks.get('' + x + ';' + y + ';' + z));
	
  }
  
});
