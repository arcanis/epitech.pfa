//!provides:View.BaseVoxel
// 
//!requires:JS.Class
// 
//!uses:Helpers.getFacesIdentifier

View.BaseVoxel = new JS.Class('View.BaseVoxel', {
	
	initialize: function () {
		
		this.mesh = null;
		
		this.klass.initialize();
		
	},
	
	setFaces: function (faces) {
		
		var geometry = this.klass.geometries[Helpers.getFacesIdentifier(faces)];
		
		this.mesh = new THREE.Mesh(geometry);
		
	},
	
	setPosition: function (position) {
		
		this.mesh.position.copy(position).multiplyScalar(10).addScalar(5);
		
	}
	
});
