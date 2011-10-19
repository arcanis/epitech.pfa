//!provides:APP.Generator
//!requires:JS.Class
//!requires:APP.Chunk

var path = require('path');

var fs = require('fs');

global.APP.Generator = new JS.Class({

  initialize : function () {
    
  },

  makeChunk : function () {
  var res = '';
  for (var z = 0; z < 16; z++)
    for (var y = 0; y < 16; y++)
      for (var x = 0; x < 16; x++)
	res += '0';
      
  return (res);
  },

  getChunk : function(x, y, z) {
    var filename = "./map/" + x + '.' + y + '.' + z;
    if (path.existsSync(filename))
      console.log("Chunk Exist !");
    else
    {
      console.log("Non existant chunk, create it...");
      fs.writeFileSync(filename, APP.Generator());
    }
    var data = fs.readFileSync(filename);
    return (new APP.Chunk(x, y, z, data));
  }
  
});
