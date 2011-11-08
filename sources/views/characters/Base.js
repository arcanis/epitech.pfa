//!provides:BaseCharacter
// 
//!requires:JS.Class

global.BaseCharacter = new JS.Class({
	
	initialize: function () {
		
		this.position = {
			x: 0,
			y: 0,
			z: 0
		};
		
		this.orientation = 0;
		
	},
	
	setPosition: function (x, y, z) {
		
		this.position.x = x;
		this.position.y = y;
		this.position.z = z;
		
	},
	
	getPosition: function () {
		
		return {
			x: this.position.x,
			y: this.position.y,
			z: this.position.z
		};
		
	},
	
	setOrientation: function (orientation) {
		
		this.orientation = orientation;
		
	},
	
	getOrientation: function () {
		
		return this.orientation;
		
	}
	
});
