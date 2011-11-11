//!provides:View
//!requires:ViewDetail
// 
//!requires:JS.Class
// 
//!requires:DebugApi
//!requires:CameraApi
//!requires:CharacterApi
//!requires:VoxelApi

global.View = new JS.Class(ViewDetail, {
	
	include: [ DebugApi, CameraApi, CharacterApi, VoxelApi ],
	
	renderOn: function (renderer, width, height) {
		
		if (this.hasOwnProperty('cameras')) {
			
			var cameras = this.cameras;
			
			if (cameras.length > 0) {
				
				if (this.voxelGeometry === null) {
					
					this.buildVoxelGeometry();
					
				} else if (this.pendingVoxels.length) {
					
					this.mergePendingVoxels();
					
				}
				
				var camera = cameras[0];
				camera.aspect = width / height;
				camera.updateProjectionMatrix();
				
				renderer.render(this.scene, camera);
				
			}
			
		}
		
	}
	
});
