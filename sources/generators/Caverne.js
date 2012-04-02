/**
 * @author Florian 'Champii' Greiner
 */

/**
 * @class
 *
 *
 * @toc Generator.Caverne
 *
 */

//!requires:Generator
//!provides:Generator.Caverne
//
//!requires:JS.Class
//!requires:Generator.Chunk
//!requires:Generator.LevelGenerator

Generator.Caverne = new JS.Class('Generator.Caverne', {

  initialize: function () {
    this.level1 = new Generator.LevelGenerator();
    this.level2 = new Generator.LevelGenerator();
    this.high = new Generator.LevelGenerator();    
  },

  generate: function (chunk) {

    this.value = 0;
    this.value2 = 0;
    this.value3 = 0;
    this.chunk = chunk;
    that = this;

    var functHigh = function (point3, value3) {
      that.value3 = value3 * 32;
      
      var blockPos = [point3[0] - that.chunk.position.x * 16, point3[1] - that.chunk.position.z * 16];

      that.chunk.eraseBlocksBetwin(blockPos[0], blockPos[1], Math.floor(that.value + that.value3), Math.floor(that.value2 + that.value3));
    };
    
    var funct2 = function (point2, value2) {
      that.value2 = value2 * 100;
      
      if (that.value < that.value2)
      {
	that.high.generate([point2[0], point2[1]], [1, 1], functHigh);
      }
      
    };
    
    var funct1 = function (point, value) {
      that.value = value * 100;
      that.level2.generate([point[0], point[1]], [1, 1], funct2);
    };

   this.level1.generate([that.chunk.position.x * 16, that.chunk.position.z * 16], [16, 16], funct1);
//   that.chunk.dumpBlocksBetwin(0, 40);
   return (that.chunk);
  }
  
});
