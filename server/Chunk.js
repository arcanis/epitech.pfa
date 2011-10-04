var Blocks = require('./ABlock.js');

Array.create3DArray = function(d1, d2, d3) {
  
  var x = new Array(d1);
  
  for (var i=0; i < d1; i++) {
    x[i] = new Array(d2);
  }
  
  for (var i=0; i < d1; i++) {
    for (var j=0; j < d2; j++) {
      x[i][j] = new Array(d3);
    }
  }
  return (x);
}

exports.Chunks = Class.create({

  initialize : function(x, y, z, arr) {
    this.pos = { x: x, y: y, z : z };
    this.blocks = Array.create3DArray(16, 16, 16);
    var i = 0;
    for (var z = 0; z < 16; z++)
      for (var y = 0; y < 16; y++)
	for (var x = 0; x < 16; x++)
	  this.blocks[z][y][x] = Blocks.ABlock.makeBlock(x, y, z, arr[i++] - 48);
  }
});
