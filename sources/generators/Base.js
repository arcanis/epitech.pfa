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
		

		
		return (chunk);
		
	}
	
});
