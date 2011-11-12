//!requires:View
//!requires:View.BaseVoxel
//!provides:View.GrassVoxel
// 
//!requires:JS.Class
// 
//!uses:Helpers.generateBlockGeometries

// todo : multi-materials

View.GrassVoxel = new JS.Class('View.GrassVoxel', View.BaseVoxel, {
	
	extend: {
		
		initialize: function () {
			
			if (this.hasOwnProperty('materials') === false) {
				
				var dirt = new THREE.MeshBasicMaterial({ map: new THREE.ImageUtils.loadTexture(ASSETS_DIR + '/dirt.jpg') });
				
				this.materials = {
					top: new THREE.MeshBasicMaterial({ map: new THREE.ImageUtils.loadTexture(ASSETS_DIR + '/grass-top.jpg'), color: 0x69a93f, blending: THREE.SubstractiveBlending }),
					sides: dirt, //new THREE.MeshBasicMaterial({ map: new THREE.ImageUtils.loadTexture(ASSETS_DIR + '/grass-sides.png'), color: 0x69a93f }),
					bottom: dirt
				};
				
			}
			
			if (this.hasOwnProperty('geometries') === false) {
				
				var materials = this.materials;
				
				this.geometries = Helpers.generateBlockGeometries([
					materials.sides,
					materials.sides,
					materials.top,
					materials.bottom,
					materials.sides,
					materials.sides
				]);
				
			}
			
		}
		
	},
	
	initialize: function () {
		
		this.callSuper();
		
	}
	
});
