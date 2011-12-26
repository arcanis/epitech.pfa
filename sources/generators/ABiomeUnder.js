//!requires:Generator
//!provides:Generator.ABiomeUnder
//
//!requires:Generator.ABiome
//!requires:JS.Class

Generator.ABiomeUnder = new JS.Class(Generator.ABiome, {

  initialize: function () {

    this.callSuper();

  },

  applyBiome: function (chunk) {

    throw "Unimplemented method : Generator.ABiomeUnder.applyBiome";

  }

});
