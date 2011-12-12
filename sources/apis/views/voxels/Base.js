//!requires:View.Voxel
//!provides:View.Voxel.Base
// 
//!requires:JS.Class
// 
//!requires:Value3
// 
//!uses:Helper.getFacesIdentifier

View.Voxel.Base = new JS.Class('View.Voxel.Base', View.Object, {
	
	initialize: function ( ) {
		
		this.object3D = null;
		
		this.klass.initialize( );
		
	},
	
	setFaces: function ( faces ) {
		
		var geometriesPacks = this.klass.geometriesPacks[ Helper.getFacesIdentifier( faces ) ];
		
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
