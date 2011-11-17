//!requires:View
//!provides:View.Apis
//!requires:View.Details
// 
//!requires:JS.Class
// 
//!requires:DebugViewApi
//!requires:CameraViewApi
//!requires:CharacterViewApi
//!requires:VoxelViewApi

View.Apis = new JS.Class('View.Apis', View.Details, {
	
	include: [ DebugViewApi, CameraViewApi, CharacterViewApi, VoxelViewApi ],
	
	renderOn: function (renderer, width, height) {
		
		if (this.hasOwnProperty('cameras')) {
			
			var cameras = this.cameras;
			
			if (cameras.length > 0) {
				
				if (this.voxelGeometry === null) {
					
					this.finishPendingVoxels();
					
					this.buildVoxelGeometry();
					
					this.buildVoxelEntity();
					
				}
				
				var camera = cameras[0];
				camera.aspect = width / height;
				camera.updateProjectionMatrix();
				
				renderer.render(this.scene, camera);
				
			}
			
		}
		
	}
	
});
