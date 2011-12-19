//!requires:Generator
//!provides:Generator.ABiome
//
//!requires:JS.Class

Generator.ABiome = new JS.Class({

  initialize: function () {

    this.blockTypes = [];
    this.position = {x:0, y:0, z:0};
    this.size = 0;
  },

  applyBiome: function (chunk) {

    throw "Unimplemented method : Generator.ABiome.applyBiome";
    
  }
  
});
