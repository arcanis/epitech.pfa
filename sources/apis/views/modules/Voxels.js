//!requires:View.Modules
//!provides:View.Modules.Voxels
// 
//!requires:JS.Module

View.Modules.Voxels = new JS.Module({
	
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
