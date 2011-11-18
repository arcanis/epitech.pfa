//!requires:View
//!provides:View.Camera
//!requires:View.Object
// 
//!requires:JS.Class

View.Camera = new JS.Class('View.Camera', View.Object, {
	
	initialize: function ( ) {
		
		this.object3D = new THREE.PerspectiveCamera( 60, 0, .1, 20000 );
		
	}
	
});
