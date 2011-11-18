//!requires:View.Voxels
//!provides:View.Voxels.Base
// 
//!requires:JS.Class
// 
//!uses:Helpers.getFacesIdentifier

View.Voxels.Base = new JS.Class('View.Voxels.Base', View.Object, {
	
	initialize: function ( ) {
		
		this.mesh = null;
		
		this.klass.initialize( );
		
	},
	
	setFaces: function ( faces ) {
		
		var geometriesPacks = this.klass.geometriesPacks[ Helpers.getFacesIdentifier( faces ) ];
		
		var group = this.object3D = new THREE.Object3D( );
		
		for ( var t = 0, l = geometriesPacks.length; t < l; ++t ) {
			
			group.add( new THREE.Mesh( geometriesPacks[ t ] ) );
			
		}
		
	},
	
	setVoxelPosition: function ( position ) {
		
		var size = 10;
		
		this.setPosition( new Value3( ).copy( position ).multiplyScalar( size ).addScalar( size / 2 ) );
		
	}
	
});
