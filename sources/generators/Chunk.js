//!requires:Generator
//!provides:Generator.Chunk
//
//!requires:JS.Class
//!requires:JS.Hash

Generator.Chunk = new JS.Class ({

  initialize: function (x, z) {

    this.position = {x:x, z:z};
    this.blocks = new JS.Hash();

  },

  fill: function (array) {

    var i = 0;
    for (var x = 0; x < 16; x++)
      for (var y = 0; y < 128; y++)
	for (var z = 0; z < 16; z++)
	  this.blocks.put('' + x + ';' + y + ';' + z, array[i++]);
  },

  makeLevelAt: function (point, value) {

    for (var y = 64; y < value + 64; y++)
      this.blocks.put('' + point[0] + ';' + y + ';' + point[1], 1);
  },
  
  getArray: function () {

    return (this.blocks.values());
      
  }
  
});
