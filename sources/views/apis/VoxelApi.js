//!provides:VoxelApi
// 
//!requires:JS.Module

global.VoxelApi = new JS.Module({
	
	setVoxelBlock: function (point, type) {
		
		var token = [ point.x, point.y, point.z ].join(' ');
		
		this.voxelEngineList[token] = new type(point);
		
		this.voxelEngineIncoming.push(token);
		
	},
	
	removeVoxel: function (point) {
		
		var token = [ point.x, point.y, point.z ].join(' ');
		
		this.voxelEngineList[token] = null;
		
		this.voxelEngineGeometry = null;
		
	}
	
});
