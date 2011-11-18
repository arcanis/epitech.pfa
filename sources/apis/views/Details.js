//!requires:View
//!provides:View.Details
//
//!requires:JS.Module
//!requires:quickfix
// 
//!uses:Value3

View.Details = new JS.Class('View.Details', {
	
	initialize: function () {
		
		this.scene = new THREE.Scene();
		
		this.cameras = [];
		
		this.voxels = {};
		
		this.pendingVoxels = {};
		
		this.voxelGeometry = null;
		
		this.voxelEntity = null;
		
	},
	
	refreshVoxelFaces: function (point) {
		
		var that = this;
		
		var voxels = this.voxels;
		
		var copy = new Value3();
		
		var refreshCoordFaces = function (x, y, z) {
			
			copy.set(point.x + x, point.y + y, point.z + z);
			
			if (voxels.hasOwnProperty(copy)) {
				
				voxels[copy].setFaces(that.getVoxelFaces(copy));
				
			}
			
		};
		
		refreshCoordFaces(00, 0, 0);
		
		refreshCoordFaces(+1, 0, 0);
		refreshCoordFaces(-1, 0, 0);
		
		refreshCoordFaces(0, +1, 0);
		refreshCoordFaces(0, -1, 0);
		
		refreshCoordFaces(0, +1, 0);
		refreshCoordFaces(0, -1, 0);
		
	},
	
	getVoxelFaces: function (point) {
		
		var voxels = this.voxels;
		
		var copy = new Value3();
		
		return {
			
			px: !voxels.hasOwnProperty(copy.add(point, { x: +1, y: 0, z: 0 })),
			nx: !voxels.hasOwnProperty(copy.add(point, { x: -1, y: 0, z: 0 })),
			
			py: !voxels.hasOwnProperty(copy.add(point, { x: 0, y: +1, z: 0 })),
			ny: !voxels.hasOwnProperty(copy.add(point, { x: 0, y: -1, z: 0 })),
			
			pz: !voxels.hasOwnProperty(copy.add(point, { x: 0, y: 0, z: +1 })),
			nz: !voxels.hasOwnProperty(copy.add(point, { x: 0, y: 0, z: -1 }))
			
		};
		
	},
	
	finishPendingVoxels: function () {
		
		var voxels = this.voxels;
		
		var pendings = this.pendingVoxels;
		
		this.pendingVoxels = {};
		
		for (var x in pendings) {
			
			if (pendings.hasOwnProperty(x)) {
				
				var voxel = voxels[x];
				
				var pending = pendings[x];
				
				voxel.setFaces(this.getVoxelFaces(pending));
				
				voxel.setPosition(pending);
				
			}
			
		}
		
	},
	
	buildVoxelGeometry: function () {
		
		var voxels = this.voxels;
		
		var geometry = this.voxelGeometry = new THREE.Geometry();
		
		for (var x in voxels) {
			
			if (voxels.hasOwnProperty(x)) {
				
				var voxel = voxels[x];
				
				var mesh = voxel.mesh;
				
				if (mesh) {
					
					THREE.GeometryUtils.merge(geometry, mesh, true);
					
				}
				
			}
			
		}
		
	},
	
	buildVoxelEntity: function () {
		
		this.voxelEntity && this.scene.remove(this.voxelEntity);
		
		this.voxelEntity = new THREE.Mesh(this.voxelGeometry, new THREE.MeshFaceMaterial());
		
		this.scene.add(this.voxelEntity);
		
	}
	
});
