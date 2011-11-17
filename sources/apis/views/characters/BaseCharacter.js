//!requires:View
//!provides:View.BaseCharacter
// 
//!requires:JS.Class

View.BaseCharacter = new JS.Class('View.BaseCharacter', {
	
	initialize: function () {
		
		this.mesh = null;
		
	},
	
	setPosition: function (point) {
		
		this.mesh.position.copy(point);
		
	}
	
});
