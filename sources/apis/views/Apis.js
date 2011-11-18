//!requires:View
//!provides:View.Apis
//!requires:View.Details
// 
//!requires:JS.Class
// 
//!requires:View.Modules.Cameras
//!requires:View.Modules.Characters
//!requires:View.Modules.Debug
//!requires:View.Modules.Voxels

View.Apis = new JS.Class('View.Apis', View.Details, {
	
	include: [
		
		View.Modules.Cameras,
		
		View.Modules.Characters,
		
		View.Modules.Debug,
		
		View.Modules.Voxels
		
	],
	
	renderOn: function ( renderer, width, height ) {
		
		if ( this.hasOwnProperty( 'cameras' ) ) {
			
			var cameras = this.cameras;
			
			if ( cameras.length > 0 ) {
				
				if ( this.voxelGeometry === null ) {
					
					this.finishPendingVoxels( );
					
					this.buildVoxelGeometry( );
					
					this.buildVoxelEntity( );
					
				}
				
				var camera = cameras[ 0 ];
				camera.aspect = width / height;
				camera.updateProjectionMatrix( );
				
				renderer.render( this.scene, camera );
				
			}
			
		}
		
	}
	
});
