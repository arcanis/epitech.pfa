var Chunk = require('./Chunk.js');
var path = require('path');

var fs = require('fs');

exports.Generator = function(){
  var res = '';
  for (var z = 0; z < 16; z++)
    for (var y = 0; y < 16; y++)
      for (var x = 0; x < 16; x++)
	res += '0';

  return (res);
}

exports.getChunk = function(x, y, z) {
  var filename = "./map/" + x + '.' + y + '.' + z;
  if (path.existsSync(filename))
    console.log("Exist !");
  else
  {
    console.log("Non existant chunk, create it...");
    fs.writeFileSync(filename, exports.Generator());
  }

  var data = fs.readFileSync(filename);
  return (new Chunk.Chunks(x, y, z, data));
};
