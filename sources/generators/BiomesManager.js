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

  makeBiomeHash: function (chunkPosition) {

//TODO : VERIFY THE GENERATING DIRECTION (to prevent 1-chunk-sized biome)
    
    var hash = {biomeMin:
			  {x:chunkPosition.x * 16,
			   y:64,
			   z:chunkPosition.z * 16},
		biomeMax:
			  {x:0,
			   y:0,
			   z:0}};
    
    hash.biomeMax.x = chunkPosition.x * 16 + (Math.floor(Math.random() * 10) * 16) + 32;
    hash.biomeMax.y = 128;
    hash.biomeMax.z = chunkPosition.z * 16 + (Math.floor(Math.random() * 10) * 16) + 32;


    //TODO : HUGE PROCESS, NEED OPTIMISATIONS

    var found = true;
    
    var pointIsInBiome = function (point, biome) {

      if (point[0] > biome.biomeMin.x && point[1] > biome.biomeMin.z &&
	  point[0] < biome.biomeMax.x && point[1] < biome.biomeMax.z)
      {
	found = true;
	return (true);
      }
      return (false);
      
    };
    
    var isInBiomeFunc = function (key) {

      if (pointIsInBiome([hash.biomeMin.x, hash.biomeMin.z], key))
	hash.biomeMin.x = key.biomeMax.x;

      if (pointIsInBiome([hash.biomeMin.x, hash.biomeMax.z], key))
	hash.biomeMax.z = key.biomeMin.z;

      if (pointIsInBiome([hash.biomeMax.x, hash.biomeMin.z], key))
	hash.biomeMax.x = key.biomeMin.x;

      if (pointIsInBiome([hash.biomeMax.x, hash.biomeMax.z], key))
	hash.biomeMax.z = key.biomeMin.z;

    };


    while (found)
    {
      found = false;
      this.biomeList.forEachKey(isInBiomeFunc);
    }

    return (hash);
    
  },
  
  makeSurfaceBiome: function (chunkPosition) {

    var hash = this.makeBiomeHash(chunkPosition);
    
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
      if (chunk.position.x * 16 < key.biomeMax.x && chunk.position.x * 16 >= key.biomeMin.x &&
	  chunk.position.z * 16 < key.biomeMax.z && chunk.position.z * 16 >= key.biomeMin.z)
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
    var biome = this.biomeList.get(biomesHash);
    chunk = biome.applyBiome(chunk);
//     console.log("----------------------\n");
    return (chunk);
    
  }

});

