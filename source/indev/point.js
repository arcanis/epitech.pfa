//!provides:JS.Point
//!requires:JS.Class

global.JS.Point = new JS.Class({
	initialize: function (x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	},
	
	equals: function (other) {
		if (!(other instanceof this.klass))
			return false;
		return this.x === other.x && this.y === other.y && this.z === other.z;
	},
	
	hash: function () {
		return [this.x, this.y, this.z].join(':');
	}
});
