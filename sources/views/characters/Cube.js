//!requires:View
//!provides:View.Character.Cube
//!requires:View.Character.Base
// 
//!requires:JS.Class

View.Character.Cube = new JS.Class('View.Character.Cube', View.Character.Base, {
	
	extend: {
		
		initialize: function ( ) {
			
			if ( this.hasOwnProperty( 'geometry' ) === false ) {
				
				this.geometry = new THREE.CubeGeometry( 5, 50, 50 );
				
			}
			
			if ( this.hasOwnProperty( 'material' ) === false ) {
				
				this.material = new THREE.MeshNormalMaterial( );
				
			}
			
		}
		
	},
	
	initialize: function ( ) {
		
		this.callSuper( );
		
		var klass = this.klass;
		
		klass.initialize( );
		
		this.object3D = new THREE.Mesh( klass.geometry, klass.material );
		
	}
	
});
