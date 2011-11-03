//!provides:Helpers.Point
// 
//!requires:JS.Class
//!requires:Helpers

global.Helpers.Point = new JS.Class({
	initialize: function (x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	},
	
	toString: function () {
		return [parseInt(this.x, 10), parseInt(this.y, 10), parseInt(this.z, 10)].join(':');
	}
});
