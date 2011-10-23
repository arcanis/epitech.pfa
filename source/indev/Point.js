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
	},
	
	translate: function (x, y, z) {
		return new JS.Point(this.x + x, this.y + y, this.z + z);
	},
	
	px: function (x) {
		if (x === undefined) x = 1;
		return this.translate(+x, 0, 0);
	},
	
	nx: function (x) {
		if (x === undefined) x = 1;
		return this.translate(-x, 0, 0);
	},
	
	py: function (y) {
		if (y === undefined) y = 1;
		return this.translate(0, +y, 0);
	},
	
	ny: function (y) {
		if (y === undefined) y = 1;
		return this.translate(0, -y, 0);
	},
	
	pz: function (z) {
		if (z === undefined) z = 1;
		return this.translate(0, 0, +z);
	},
	
	nz: function (z) {
		if (z === undefined) z = 1;
		return this.translate(0, 0, -z);
	}
});
