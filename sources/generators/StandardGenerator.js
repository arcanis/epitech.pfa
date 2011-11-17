//!provides:StandardGenerator
//
//!requires:JS.Class
//!requires:Generator
//!requires:Helpers
//!requires:HardDrivePersistor
//
//!uses:JS.Hash

global.StandardGenerator = new JS.Class(Generator, {
  initialize : function (seed) {
    this.seed = seed;
    this.blockType = 1;
    this.persistor = new HardDrivePersistor();
  },

  makeChunkEmpty : function () {
    var res = [];
    for (var z = 0; z < 16 * 16 * 16; z++)
      res[z] = 0;
    return (this.fillChunkIn3dArray(res));
  },

  fillChunkIn3dArray : function (chunk) {
    var array = new JS.Hash();
    var count = 0;
    for (var z = 0; z < 16; z++)
      for (var y = 0; y < 16; y++)
	for (var x = 0; x < 16; x++)
	{
	  array.put('' + x + y + z, chunk[count]);
	  count++;
	}
    return (array);
  },

  getChunkArrayByte : function (chunk) {
    var res = [];
    var count = 0;
    for (var z = 0; z < 16; z++)
      for (var y = 0; y < 16; y++)
	for (var x = 0; x < 16; x++)
	{
	  res[count] = chunk.get('' + x + y + z);
	  count++;
	}
	return (res);
  },
  
  getNearChunk : function (position) {
    this.persistor.load('' + (position.x - 1) + position.y + position.z);
  },

  getNearChunkDirection : function (oldChunk) {
    return ("none");
  },
  
  makeBlockType : function (position, z) {
    var oldChunk = this.getNearChunk(position);
    var direction = this.getNearChunkDirection(oldChunk);
  },
  
  generateChunk : function (position) {
    var newChunk = this.makeChunkEmpty();
    for (var z = 0; z < 16; z++)
      for (var y = 0; y < 16; y++)
	for (var x = 0; x < 16; x++)
	  newChunk[z] = this.makeBlockType(position, z);
    return (this.getChunkArrayByte(newChunk));
  }
});