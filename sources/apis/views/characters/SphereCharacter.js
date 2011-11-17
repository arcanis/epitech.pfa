//!requires:View
//!requires:View.BaseCharacter
//!provides:View.SphereCharacter
// 
//!requires:JS.Class

View.SphereCharacter = new JS.Class('View.SphereCharacter', View.BaseCharacter, {
	
	extend: {
		
		initialize: function () {
			
			if (this.hasOwnProperty('geometry') === false) {
				
				this.geometry = new THREE.CubeGeometry(5, 50, 50);
				
			}
			
			if (this.hasOwnProperty('material') === false) {
				
				this.material = new THREE.MeshNormalMaterial();
				
			}
			
		}
		
	},
	
	initialize: function () {
		
		this.callSuper();
		
		var klass = this.klass;
		
		klass.initialize();
		
		this.mesh = new THREE.Mesh(klass.geometry, klass.material);
		
	}
	
});
