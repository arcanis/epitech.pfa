//!requires:Helpers
//!provides:Helpers.Coord2
// 
//!requires:JS.Class

Helpers.Coord2 = new JS.Class({
	
	initialize: function (x, y) {
		
		this.x = x || 0;
		this.y = y || 0;
		
	},
	
	clone: function () {
		
		return new (this.klass)(this.x, this.y);
		
	},
	
	copy: function (c2) {
		
		this.x = c2.x;
		this.y = c2.y;
		
		return this;
		
	},
	
	set: function (x, y, z) {
		
		this.x = x;
		this.y = y;
		
		return this;
		
	},
	
	setX: function (x) {
		
		this.x = x;
		
		return this;
		
	},
	
	setY: function (y) {
		
		this.y = y;
		
		return this;
		
	},
	
	add: function (c2a, c2b) {
		
		this.x = c2a.x + c2b.x;
		this.y = c2a.y + c2b.y;
		
		return this;
		
	},
	
	substract: function (c2a, c2b) {
		
		this.x = c2a.x - c2b.x;
		this.y = c2a.y - c2b.y;
		
		return this;
		
	},
	
	multiply: function (c2a, c2b) {
		
		this.x = c2a.x * c2b.x;
		this.y = c2a.y * c2b.y;
		
		return this;
		
	},
	
	divide: function (c2a, c2b) {
		
		this.x = c2a.x / c2b.x;
		this.y = c2a.y / c2b.y;
		this.z = c2a.z / c2b.z;
		
		return this;
		
	},
	
	addSelf: function (c2) {
		
		this.x += c2.x;
		this.y += c2.y;
		
		return this;
		
	},
	
	substractSelf: function (c2) {
		
		this.x -= c2.x;
		this.y -= c2.y;
		
		return this;
		
	},
	
	multiplySelf: function (c2) {
		
		this.x *= c2.x;
		this.y *= c2.y;
		
		return this;
		
	},
	
	divideSelf: function (c2) {
		
		this.x /= c2.x;
		this.y /= c2.y;
		
		return this;
		
	},
	
	addScalar: function (n) {
		
		this.x += n;
		this.y += n;
		
		return this;
		
	},
	
	substractScalar: function (n) {
		
		this.x -= n;
		this.y -= n;
		
		return this;
		
	},
	
	multiplyScalar: function (n) {
		
		this.x *= n;
		this.y *= n;
		
		return this;
		
	},
	
	divideScalar: function (n) {
		
		this.x /= n;
		this.y /= n;
		
		return this;
		
	},
	
	toString: function () {
		
		return [ this.x, this.y ].toString();
		
	}
	
});
