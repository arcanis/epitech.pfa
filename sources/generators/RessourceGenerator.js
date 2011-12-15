//!requires:Generator
//!provides:Generator.RessourceGenerator
//
//!requires:JS.Class
//!requires:Generator.Chunk

Generator.RessourceGenerator = new JS.Class({

  initialize: function () {

  },

  makeEmptyChunk: function (x, z) {

    var newChunk = new Generator.Chunk(x, z);
    var i = 0;
    var array = [];
    
    console.log("Generating empty Chunk");
    for (var x = 0; x < 16; x++)
      for (var y = 0; y < 128; y++)
	for (var z = 0; z < 16; z++)
	{
	  if (y < 64) //Water Level
	    array[i++] = 1; //Stone
	  else
	    array[i++] = 0; //Air
	    //console.log("Generating bloc " + i + "/32768");
	}
	
    newChunk.fill(array);
    return (newChunk);
    
  },

  generateChunkRessources: function (x, z) {

    var chunk = this.makeEmptyChunk(x, z);
    console.log("A New Chunk has been created :");
    console.log(chunk.position);
    return (chunk);
    
  }

});
