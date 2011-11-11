//!provides:ViewDetail
//
//!requires:JS.Module

global.ViewDetail = new JS.Class({
	
	initialize: function () {
		
		this.scene = new THREE.Scene();
		
		this.cameras = [];
		
		this.voxelGeometry = null;
		
		this.voxelEntity = null;
		
		this.pendingVoxels = [];
		
	},
	
	regenerateEntity: function () {
		
		this.voxelEntity && this.scene.remove(this.voxelEntity);
		
		this.voxelEntity = new THREE.Mesh(this.geometry, new THREE.MeshFaceMaterial());
		
		this.scene.add(this.voxelEntity);
		
	},
	
	buildVoxelGeometry: function () {
		
		var voxels = this.voxels;
		
		var geometry = this.geometry = new THREE.Geometry();
		
		for (var x in voxels) {
			
			if (voxels.hasOwnProperty(x)) {
				
				var voxel = voxels[x];
				
				THREE.GeometryUtils.merge(geometry, voxel.mesh);
				
			}
			
		}
		
		this.pendingVoxels.length = 0;
		
		this.regenerateEntity();
		
	},
	
	mergePendingVoxels: function () {
		
		var pendingVoxels = this.pendingVoxels;
		
		var voxels = this.voxels;
		
		var geometry = this.geometry;
		
		for (var x = 0, l = pendingVoxels.length; x < l; ++x) {
			
			var voxel = voxels[pendingVoxels[x]];
			
			THREE.GeometryUtils.merge(geometry, voxel.mesh);
			
		}
		
		this.pendingVoxels.length = 0;
		
		this.regenerateEntity();
		
	}
	
});
