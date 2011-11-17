//!provides:FlatGenerator
//
//!requires:JS.Class
//!requires:Generator
//!requires:Helpers
//

global.FlatGenerator = new JS.Class(Generator, {
  initialize : function (seed) {
    this.seed = seed;
    this.blockType = 1;
  },

  generateChunk : function (position) {
    var res = [];
    var count = 0;
    for (var z = position.z; z < position.z + 16; z++)
      for (var y = position.y; y < position.y + 16; y++)
	for (var x = position.x; x < position.x + 16; x++)
	{
	  if (y == 0)
	    res[count] = this.blockType;
	  else
	    res[count] = 0;
	  count++;
	}
    return (res);
  },

  setBlockType : function (blockType) {
    this.blockType = blockType;
  }
});