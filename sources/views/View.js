//!requires:ViewDetail
//!provides:View
// 
//!requires:JS.Class
//!requires:DebugViewApi
//!requires:CameraViewApi
//!requires:CharacterViewApi
//!requires:VoxelViewApi

global.View = new JS.Class('View', ViewDetail, {
	
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
