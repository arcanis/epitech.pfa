//!requires:View.Voxel
//!provides:View.Voxel.Dirt
//!requires:View.Voxel.Base
// 
//!requires:JS.Class
// 
//!uses:Helper.generateBlockGeometries

View.Voxel.Dirt = new JS.Class('View.Voxel.Dirt', View.Voxel.Base, {
	
	extend: {
		
		initialize: function ( ) {
			
			if ( this.hasOwnProperty( 'material' ) === false ) {
				
				this.material = new THREE.MeshBasicMaterial( { map: new THREE.ImageUtils.loadTexture( ASSETS_DIR + '/dirt.jpg' ) } );
				
			}
			
			if ( this.hasOwnProperty( 'geometriesPacks' ) === false ) {
				
				var material = this.material;
				
				this.geometriesPacks = Helper.generateBlockGeometries( [
					
					material, material, material, material, material, material
					
				] );
				
			}
			
		}
		
	},
	
	initialize: function ( ) {
		
		this.callSuper( );
		
	}
	
});
