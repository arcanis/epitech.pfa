//!requires:Generator
//!provides:Generator.CavernBiome
//
//!requires:Generator.ABiomeUnder
//!requires:JS.Class

Generator.CavernBiome = new JS.Class(Generator.ABiomeUnder, {

  initialize: function () {

    this.callSuper();

  },

  applyBiome: function (chunk) {

    this.callSuper();
    return (chunk);

  }

});