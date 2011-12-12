//!requires:View
//!provides:View.Voxel.Grass
//!requires:View.Voxel.Base
// 
//!requires:JS.Class
// 
//!uses:Helper.generateBlockGeometries

View.Voxel.Grass = new JS.Class('View.Voxel.Grass', View.Voxel.Base, {
	
	extend: {
		
		initialize: function ( ) {
			
			if ( this.hasOwnProperty( 'materials' ) === false ) {
				
				var dirt = new THREE.MeshBasicMaterial( { map: new THREE.ImageUtils.loadTexture( ASSETS_DIR + '/dirt.jpg' ) } );
				
				this.materials = {
					top: new THREE.MeshBasicMaterial( { map: new THREE.ImageUtils.loadTexture( ASSETS_DIR + '/grass-top.jpg' ), color: 0x69a93f, blending: THREE.SubstractiveBlending } ),
					sides: [ dirt, new THREE.MeshBasicMaterial( { map: new THREE.ImageUtils.loadTexture( ASSETS_DIR + '/grass-sides.png' ), color: 0x69a93f } ) ],
					bottom: dirt
				};
				
			}
			
			if ( this.hasOwnProperty( 'geometriesPacks' ) === false ) {
				
				var materials = this.materials;
				
				this.geometriesPacks = Helper.generateBlockGeometries( [
					materials.sides,
					materials.sides,
					materials.top,
					materials.bottom,
					materials.sides,
					materials.sides
				] );
				
			}
			
		}
		
	},
	
	initialize: function ( ) {
		
		this.callSuper( );
		
	}
	
});
