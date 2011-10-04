
exports.ABlock = Class.create({

  initialize : function (x, y, z, type) {
    this.type = type;
    this.pos = { x : x, y : y, z : z };
  },

  taMere : function () {
    console.log("Tartiflette !");
  }
  
});

exports.Air = Class.create(exports.ABlock, {
  
  initialize : function ($super, x, y, z, type) {
    $super(x, y, z, type);
  }
  
});

exports.Dirt = Class.create(exports.ABlock, {
  
  initialize : function ($super, x, y, z, type) {
    $super(x, y, z, type);
  }
  
});

exports.ABlock.makeBlock = function (x, y, z, value) {
  if (value == 0)
    return (new exports.Air(x, y, z, value));
  if (value == 1)
    return (new exports.Dirt(x, y, z, value));
}
