//!requires:View.Module
//!provides:View.Module.Cameras
// 
//!requires:JS.Module
// 
//!uses:View.Camera

View.Module.Cameras = new JS.Module({
	
	createCamera : function ( cameraType ) {
		
		var camera = new cameraType( );
		
		this.cameras.push( camera.object3D );
		this.scene.add( camera.object3D );
		
		return camera;
		
	},
	
	removeCamera : function ( camera ) {
		
		var object3D = camera.object3D;
		var index = this.cameras.indexOf( object3D );
		
		if ( index !== -1 ) {
			
			this.cameras.slice( index, 1 );
			this.scene.remove( object3D );
			
		}
		
	}
	
});
