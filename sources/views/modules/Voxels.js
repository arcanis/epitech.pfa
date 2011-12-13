//!requires:View.Module
//!provides:View.Module.Voxels
// 
//!requires:JS.Module

View.Module.Voxels = new JS.Module({
	
	createVoxel : function ( point, voxelType ) {
		
		var voxel = new voxelType( );
		
		this.voxels[ point ] = voxel;
		
		this.pendingVoxels[ point ] = point.clone( );
		
		this.voxelGeometry = null;
		
		return voxel;
		
	},
	
	clearVoxel : function ( point ) {
		
		this.voxels[ point ] = null;
		
		this.refreshVoxelFaces( point );
		
		this.voxelGeometry = null;
		
	},
	
	voxelAt : function ( point ) {
		
		return this.voxels[ point ];
		
	}
	
});
