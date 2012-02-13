//!requires:Engine
//!provides:Engine.Camera
// 
//!requires:JS.Class

Engine.Camera = new JS.Class( 'Engine.Camera', {
	
	initialize : function ( ) {
		
		this.threeElement = new THREE.PerspectiveCamera( 60, 1, 0.1, 10000 );
		
	}
	
} );
