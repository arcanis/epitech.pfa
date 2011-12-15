//!requires:Generator
//!provides:Generator.Base
// 
//!requires:JS.Class
//!requires:Generator.RessourceGenerator
//!requires:Generator.BiomesManager

Generator.Base = new JS.Class('Generator.Base', {

  initialize: function () {

    this.ressourceGenerator = new Generator.RessourceGenerator();
    this.biomesManager = new Generator.BiomesManager();

  },
  
  generate: function (x, z) {

    var chunk = this.ressourceGenerator.generateChunkRessources(x, z);
    chunk = this.biomesManager.applyBiomes(chunk);
    
    var chunk2 = this.ressourceGenerator.generateChunkRessources(x + 16, z);
    chunk2 = this.biomesManager.applyBiomes(chunk2);
    
    var chunk3 = this.ressourceGenerator.generateChunkRessources(x + 32, z);
    chunk3 = this.biomesManager.applyBiomes(chunk3);

    var chunk4 = this.ressourceGenerator.generateChunkRessources(x + 48, z);
    chunk4 = this.biomesManager.applyBiomes(chunk4);
    
    var chunk5 = this.ressourceGenerator.generateChunkRessources(x + 64, z);
    chunk5 = this.biomesManager.applyBiomes(chunk5);
    
    var chunk6 = this.ressourceGenerator.generateChunkRessources(x + 80, z);
    chunk6 = this.biomesManager.applyBiomes(chunk6);

    var chunk7 = this.ressourceGenerator.generateChunkRessources(x + 96, z);
    chunk7 = this.biomesManager.applyBiomes(chunk7);

    var chunk8 = this.ressourceGenerator.generateChunkRessources(x + 128, z + 128);
    chunk8 = this.biomesManager.applyBiomes(chunk8);

    var chunk9 = this.ressourceGenerator.generateChunkRessources(x + 256, z + 256);
    chunk9 = this.biomesManager.applyBiomes(chunk9);

    var chunk10 = this.ressourceGenerator.generateChunkRessources(x + 512, z + 512);
    chunk10 = this.biomesManager.applyBiomes(chunk10);
    
    return (chunk);
    
  }
	
});
