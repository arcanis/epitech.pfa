//!provides:Value3

global.Value3 = new JS.Class({
	
	initialize: function (x, y, z) {
		
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
		
	},
	
	clone: function () {
		
		return new (this.klass)(this.x, this.y, this.z);
		
	},
	
	copy: function (c3) {
		
		this.x = c3.x;
		this.y = c3.y;
		this.z = c3.z;
		
		return this;
		
	},
	
	set: function (x, y, z) {
		
		this.x = x;
		this.y = y;
		this.z = z;
		
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
	
	setZ: function (z) {
		
		this.z = z;
		
		return this;
		
	},
	
	add: function (c3a, c3b) {
		
		this.x = c3a.x + c3b.x;
		this.y = c3a.y + c3b.y;
		this.z = c3a.z + c3b.z;
		
		return this;
		
	},
	
	substract: function (c3a, c3b) {
		
		this.x = c3a.x - c3b.x;
		this.y = c3a.y - c3b.y;
		this.z = c3a.z - c3b.z;
		
		return this;
		
	},
	
	multiply: function (c3a, c3b) {
		
		this.x = c3a.x * c3b.x;
		this.y = c3a.y * c3b.y;
		this.z = c3a.z * c3b.z;
		
		return this;
		
	},
	
	divide: function (c3a, c3b) {
		
		this.x = c3a.x / c3b.x;
		this.y = c3a.y / c3b.y;
		this.z = c3a.z / c3b.z;
		
		return this;
		
	},
	
	addSelf: function (c3) {
		
		this.x += c3.x;
		this.y += c3.y;
		this.z += c3.z;
		
		return this;
		
	},
	
	substractSelf: function (c3) {
		
		this.x -= c3.x;
		this.y -= c3.y;
		this.z -= c3.z;
		
		return this;
		
	},
	
	multiplySelf: function (c3) {
		
		this.x *= c3.x;
		this.y *= c3.y;
		this.z *= c3.z;
		
		return this;
		
	},
	
	divideSelf: function (c3) {
		
		this.x /= c3.x;
		this.y /= c3.y;
		this.z /= c3.z;
		
		return this;
		
	},
	
	addScalar: function (n) {
		
		this.x += n;
		this.y += n;
		this.z += n;
		
		return this;
		
	},
	
	substractScalar: function (n) {
		
		this.x -= n;
		this.y -= n;
		this.z -= n;
		
		return this;
		
	},
	
	multiplyScalar: function (n) {
		
		this.x *= n;
		this.y *= n;
		this.z *= n;
		
		return this;
		
	},
	
	divideScalar: function (n) {
		
		this.x /= n;
		this.y /= n;
		this.z /= n;
		
		return this;
		
	},
	
	toString: function () {
		
		return [ this.x, this.y, this.z ].toString();
		
	}
	
});
