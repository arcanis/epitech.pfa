//!provides:Generator
//
//!requires:JS.Class

global.Generator = new JS.Class({
  initialize : function (seed) {
    throw new Error("Generator Error : Must be overloaded");
  },

  generateChunk : function (position) {
    throw new Error("Generator Error : Must be overloaded");
  }
});