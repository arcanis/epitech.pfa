//!provides:SphereCharacter
// 
//!requires:JS.Class
//!requires:BaseCharacter

global.SphereCharacter = new JS.Class(BaseCharacter, {
	
	extend: {
		
		initialize: function () {
			
			if (this.hasOwnProperty('geometry') === false) {
				
				this.geometry = new THREE.SphereGeometry(5, 50, 50);
				
			}
			
			if (this.hasOwnProperty('material') === false) {
				
				this.material = new THREE.MeshNormalMaterial({ color: 0xff00ff });
				
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
