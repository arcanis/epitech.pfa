//!requires:View
//!requires:View.BaseVoxel
//!provides:View.DirtVoxel
// 
//!requires:JS.Class
// 
//!uses:Helpers.generateBlockGeometries

View.DirtVoxel = new JS.Class('View.DirtVoxel', View.BaseVoxel, {
	
	extend: {
		
		initialize: function () {
			
			if (this.hasOwnProperty('material') === false) {
				
				this.material = new THREE.MeshBasicMaterial({ map: new THREE.ImageUtils.loadTexture(ASSETS_DIR + '/dirt.jpg') });
				
			}
			
			if (this.hasOwnProperty('geometriesPacks') === false) {
				
				var material = this.material;
				
				this.geometriesPacks = Helpers.generateBlockGeometries([
					material, material, material, material, material, material
				]);
				
			}
			
		}
		
	},
	
	initialize: function () {
		
		this.callSuper();
		
	}
	
});
