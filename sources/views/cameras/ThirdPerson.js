//!requires:View.Camera
//!provides:View.Camera.ThirdPerson
//!requires:View.Camera.Base

View.Camera.ThirdPerson = new JS.Class('View.Camera.ThirdPerson', View.Camera.Base, {
	
	initialize: function ( ) {
		
		this.object3D = new THREE.PerspectiveCamera( 60, 0, 0.1, 20000 );
		
	}
	
});
