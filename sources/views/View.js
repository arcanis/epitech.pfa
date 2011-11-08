//!provides:View
// 
//!requires:JS.Class
//!requires:DebugApi
//!requires:CameraApi
//!requires:CharacterApi
// 
//!uses:Helpers.mergeObjects

global.View = new JS.Class({
	
	include: [ DebugApi, CameraApi, CharacterApi ],
	
	initialize: function () {
		
		this.scene = new THREE.Scene();
		
	},
	
	renderOn: function (renderer, width, height) {
		
		if (this.hasOwnProperty('cameras')) {
			
			var cameras = this.cameras;
			
			if (cameras.length > 0) {
				
				var camera = cameras[0];
				camera.aspect = width / height;
				camera.updateProjectionMatrix();
				
				renderer.render(this.scene, camera);
				
			}
			
		}
		
	}
	
});
