//!provides:Value2

global.Value2 = new JS.Class('Value2', {
	
	extend : {
		
		fromArray : function ( array ) {
			
			return new this( array[ 0 ], array[ 1 ] );
			
		}
		
	},
	
	initialize: function ( x, y ) {
		
		this.x = x || 0;
		this.y = y || 0;
		
	},
	
	clone : function ( ) {
		
		return new (this.klass)(this.x, this.y);
		
	},
	
	copy : function ( v2 ) {
		
		this.x = v2.x;
		this.y = v2.y;
		
		return this;
		
	},
	
	set : function ( x, y, z ) {
		
		this.x = x;
		this.y = y;
		
		return this;
		
	},
	
	setX : function ( x ) {
		
		this.x = x;
		
		return this;
		
	},
	
	setY : function ( y ) {
		
		this.y = y;
		
		return this;
		
	},
	
	add : function ( v2a, v2b ) {
		
		this.x = v2a.x + v2b.x;
		this.y = v2a.y + v2b.y;
		
		return this;
		
	},
	
	substract : function ( v2a, v2b ) {
		
		this.x = v2a.x - v2b.x;
		this.y = v2a.y - v2b.y;
		
		return this;
		
	},
	
	multiply : function ( v2a, v2b ) {
		
		this.x = v2a.x * v2b.x;
		this.y = v2a.y * v2b.y;
		
		return this;
		
	},
	
	divide : function ( v2a, v2b ) {
		
		this.x = v2a.x / v2b.x;
		this.y = v2a.y / v2b.y;
		
		return this;
		
	},
	
	modulo : function ( v2a, v2b ) {
		
		this.x = v2a.x % v2b.x;
		this.y = v2a.y % v2b.y;
		
		return this;
		
	},
	
	addSelf : function ( v2 ) {
		
		this.x += v2.x;
		this.y += v2.y;
		
		return this;
		
	},
	
	substractSelf : function ( v2 ) {
		
		this.x -= v2.x;
		this.y -= v2.y;
		
		return this;
		
	},
	
	multiplySelf : function ( v2 ) {
		
		this.x *= v2.x;
		this.y *= v2.y;
		
		return this;
		
	},
	
	divideSelf : function ( v2 ) {
		
		this.x /= v2.x;
		this.y /= v2.y;
		
		return this;
		
	},
	
	scalarSelf : function ( v2 ) {
		
		this.x %= v2.x;
		this.y %= v2.y;
		
		return this;
		
	},
	
	addScalar : function ( n ) {
		
		this.x += n;
		this.y += n;
		
		return this;
		
	},
	
	substractScalar : function ( n ) {
		
		this.x -= n;
		this.y -= n;
		
		return this;
		
	},
	
	multiplyScalar : function ( n ) {
		
		this.x *= n;
		this.y *= n;
		
		return this;
		
	},
	
	divideScalar : function ( n ) {
		
		this.x /= n;
		this.y /= n;
		
		return this;
		
	},
	
	moduloScalar : function ( n ) {
		
		this.x %= n;
		this.y %= n;
		
		return this;
		
	},
	
	toString : function ( ) {
		
		return [ this.x, this.y ].toString( );
		
	}
	
});
