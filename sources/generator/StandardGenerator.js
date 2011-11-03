//!provides:StandardGenerator
//
//!requires:JS.Class
//!requires:Generator
//!requires:Helpers


global.StandardGenerator = new JS.Class(Generator, {
  initialize : function (seed) {
    this.seed = seed;
    this.blockType = 1;
  },

  generateChunk : function (position) {
    
  }
});