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
