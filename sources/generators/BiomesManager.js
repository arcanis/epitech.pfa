//!requires:Generator
//!provides:Generator.BiomesManager
//
//!requires:JS.Class
//!requires:JS.Hash
//!requires:Generator.LandscapeBiome
//!requires:Generator.MountainBiome
//!requires:Generator.DesertBiome
//!requires:Generator.OceanBiome
//!requires:Generator.CanyonBiome


Generator.BiomesManager = new JS.Class({

  initialize: function () {

    this.biomeList = new JS.Hash();
    this.biomeNb = 5;
    
  },

  makeSurfaceBiome: function (chunkPosition) {

    var hash = {biomeMin:
			  {x:chunkPosition.x,
			   y:64,
			   z:chunkPosition.z},
		biomeMax:
			  {x:0,
			   y:0,
			   z:0}};

    hash.biomeMax.x = chunkPosition.x + (Math.floor(Math.random() * 10) * 16) + 32;
    hash.biomeMax.y = 128;
    hash.biomeMax.z = chunkPosition.z + (Math.floor(Math.random() * 10) * 16) + 32;
    var biomeType = Math.floor((Math.random() * 100) % this.biomeNb) + 1;
    var biomeInstance;
    if (biomeType == 1)
      biomeInstance = new Generator.LandscapeBiome();
    else if (biomeType == 2)
      biomeInstance = new Generator.MountainBiome();
    else if (biomeType == 3)
      biomeInstance = new Generator.DesertBiome();
    else if (biomeType == 4)
      biomeInstance = new Generator.OceanBiome();
    else if (biomeType == 5)
      biomeInstance = new Generator.CanyonBiome();
    console.log("Created Biome : " + biomeType);
    console.log(hash);
    this.biomeList.put(hash, biomeInstance);
    return (hash);

  },

  getBiome: function (chunk) {

    var chunkBiomeList = 0;
    var found = false;
    
    this.biomeList.forEachKey(function (key) {
      if (chunk.position.x <= key.biomeMax.x && chunk.position.x >= key.biomeMin.x &&
	  chunk.position.z <= key.biomeMax.z && chunk.position.z >= key.biomeMin.z)
      {
	found = true;
	chunkBiomeList = key;
	console.log("Found Biome for chunk");
      }
    });

    if (!found)
      chunkBiomeList = this.makeSurfaceBiome(chunk.position);
    
    return (chunkBiomeList);
  },
  
  applyBiomes: function (chunk) {

    var biomesHash = this.getBiome(chunk);
    console.log("----------------------\n");
    return (chunk);
    
  }

});

