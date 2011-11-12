//!provides:VoxelViewApi
// 
//!requires:JS.Module
// 
//!uses:Helpers.Coord3

global.VoxelViewApi = new JS.Module('VoxelViewApi', {
	
	setVoxelType: function (point, type) {
		
		var voxel = new type();
		
		this.voxels[point] = voxel;
		
		this.pendingVoxels[point] = point.clone();
		
		this.voxelGeometry = null;
		
	},
	
	clearVoxel: function (point) {
		
		this.voxels[point] = null;
		
		this.refreshVoxelFaces(point);
		
		this.voxelGeometry = null;
		
	}
	
});
