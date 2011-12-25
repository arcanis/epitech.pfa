//!provides:Value3

global.Value3 = new JS.Class('Value3', {
	
	extend : {
		
		fromArray : function ( array ) {
			
			return this( array[ 0 ], array[ 1 ], array[ 2 ] );
			
		}
		
	},
	
	initialize : function ( x, y, z ) {
		
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
		
	},
	
	clone : function ( ) {
		
		return new ( this.klass )( this.x, this.y, this.z );
		
	},
	
	copy : function ( v3 ) {
		
		this.x = v3.x;
		this.y = v3.y;
		this.z = v3.z;
		
		return this;
		
	},
	
	set : function ( x, y, z ) {
		
		this.x = x;
		this.y = y;
		this.z = z;
		
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
	
	setZ : function ( z ) {
		
		this.z = z;
		
		return this;
		
	},
	
	add : function ( v3a, v3b ) {
		
		this.x = v3a.x + v3b.x;
		this.y = v3a.y + v3b.y;
		this.z = v3a.z + v3b.z;
		
		return this;
		
	},
	
	substract : function ( v3a, v3b ) {
		
		this.x = v3a.x - v3b.x;
		this.y = v3a.y - v3b.y;
		this.z = v3a.z - v3b.z;
		
		return this;
		
	},
	
	multiply : function ( v3a, v3b ) {
		
		this.x = v3a.x * v3b.x;
		this.y = v3a.y * v3b.y;
		this.z = v3a.z * v3b.z;
		
		return this;
		
	},
	
	divide : function ( v3a, v3b ) {
		
		this.x = v3a.x / v3b.x;
		this.y = v3a.y / v3b.y;
		this.z = v3a.z / v3b.z;
		
		return this;
		
	},
	
	modulo : function ( v3a, v3b ) {
		
		this.x = v3a.x % v3b.x;
		this.x = v3a.y % v3b.y;
		this.x = v3a.z % v3b.z;
		
		return this;
		
	},
	
	addSelf : function ( v3 ) {
		
		this.x += v3.x;
		this.y += v3.y;
		this.z += v3.z;
		
		return this;
		
	},
	
	substractSelf : function ( v3 ) {
		
		this.x -= v3.x;
		this.y -= v3.y;
		this.z -= v3.z;
		
		return this;
		
	},
	
	multiplySelf : function ( v3 ) {
		
		this.x *= v3.x;
		this.y *= v3.y;
		this.z *= v3.z;
		
		return this;
		
	},
	
	divideSelf : function ( v3 ) {
		
		this.x /= v3.x;
		this.y /= v3.y;
		this.z /= v3.z;
		
		return this;
		
	},
	
	moduloSelf : function ( v3 ) {
		
		this.x %= v3.x;
		this.y %= v3.y;
		this.z %= v3.z;
		
		return this;
		
	},
	
	addScalar : function ( n ) {
		
		this.x += n;
		this.y += n;
		this.z += n;
		
		return this;
		
	},
	
	substractScalar : function ( n ) {
		
		this.x -= n;
		this.y -= n;
		this.z -= n;
		
		return this;
		
	},
	
	multiplyScalar : function ( n ) {
		
		this.x *= n;
		this.y *= n;
		this.z *= n;
		
		return this;
		
	},
	
	divideScalar : function ( n ) {
		
		this.x /= n;
		this.y /= n;
		this.z /= n;
		
		return this;
		
	},
	
	moduloScalar : function ( n ) {
		
		this.x %= n;
		this.y %= n;
		this.z %= n;
		
		return this;
		
	},
	
	toString : function ( ) {
		
		return [ this.x, this.y, this.z ].toString( );
		
	}
	
});
