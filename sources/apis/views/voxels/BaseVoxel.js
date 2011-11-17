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
		
		var geometriesPacks = this.klass.geometriesPacks[Helpers.getFacesIdentifier(faces)];
		
		var group = new THREE.Object3D();
		
		for (var t = 0, l = geometriesPacks.length; t < l; ++t) {
			
			console.log(geometriesPacks[t]);
			
			group.add(new THREE.Mesh(geometriesPacks[t]));
			
		}
		
		this.mesh = group;
		
	},
	
	setPosition: function (position) {
		
		this.mesh.position.copy(position).multiplyScalar(10).addScalar(5);
		
	}
	
});
