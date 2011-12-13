//!requires:Logic.Module
//!provides:Logic.Module.Voxels
// 
//!requires:JS.Module

Logic.Module.Voxels = new JS.Module({
	
	setVoxelType: function ( point, type ) {
		
		var chunk = point.clone( ).divideScalar( 10 );
		chunk.y = 0;
		
		this.retrieveChunk( chunk );
		
		if ( this.voxels[ point ] )
		{
		}
		
	},
	
	removeVoxel: function ( point ) {
		
	},
	
	hitVoxel: function ( point, amount )
	{
		if ( amount < 0 )
		{
			this.healVoxel( point, - amount );
			return ;
		}
		
		var voxels = this.voxels;
		
		if ( voxels.hasOwnProperty( point ) )
		{
			var voxel = this.voxels[ point ];
		}
	},
	
	healVoxel: function ( point, amount )
	{
		if ( amount < 0 )
		{
			this.hitVoxel( point, - amount );
			return ;
		}
		
	}
	
});
