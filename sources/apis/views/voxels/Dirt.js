//!requires:View.Voxels
//!provides:View.Voxels.Dirt
//!requires:View.Voxels.Base
// 
//!requires:JS.Class
// 
//!uses:Helpers.generateBlockGeometries

View.Voxels.Dirt = new JS.Class('View.Voxels.Dirt', View.Voxels.Base, {
	
	extend: {
		
		initialize: function ( ) {
			
			if ( this.hasOwnProperty( 'material' ) === false ) {
				
				this.material = new THREE.MeshBasicMaterial( { map: new THREE.ImageUtils.loadTexture( ASSETS_DIR + '/dirt.jpg' ) } );
				
			}
			
			if ( this.hasOwnProperty( 'geometriesPacks' ) === false ) {
				
				var material = this.material;
				
				this.geometriesPacks = Helpers.generateBlockGeometries( [
					
					material, material, material, material, material, material
					
				] );
				
			}
			
		}
		
	},
	
	initialize: function ( ) {
		
		this.callSuper( );
		
	}
	
});
