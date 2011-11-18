//!requires:View
//!provides:View.Voxels.Grass
//!requires:View.Voxels.Base
// 
//!requires:JS.Class
// 
//!uses:Helpers.generateBlockGeometries

View.Voxels.Grass = new JS.Class('View.Voxels.Grass', View.Voxels.Base, {
	
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
				
				this.geometriesPacks = Helpers.generateBlockGeometries( [
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
