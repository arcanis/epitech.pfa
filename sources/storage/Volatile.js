//!requires:Storage
//!provides:Storage.Volatile
// 
//!requires:JS.Class

Storage.Volatile = new JS.Class( 'Storage.Volatile', {
	
	initialize : function ( ) {
		
		this._internal = Object.create( null );
		
	},
	
	namespace : function ( name ) {
		
		if ( ! ( name in this._internal ) ) {
			
			this._internal[ name ] = Object.create( null );
			
		}
		
		return new Storage.Volatile.Namespace( this._internal[ name ] );
		
	}
	
} );

Storage.Volatile.Namespace = new JS.Class( 'Storage.Volatile.Namespace', {
	
	initialize : function ( internal ) {
		
		this._internal = internal;
		
	},
	
	open : function ( name ) {
		
		return new Storage.Volatile.Item( this._internal, name );
		
	}
	
} );

Storage.Volatile.Item = new JS.Class( 'Storage.Volatile.Item', {
	
	initialize : function ( internal, name ) {
		
		this._internal = internal;
		
		this._name = name;
		
	},
	
	exists : function ( ) {
		
		return this._name in this._internal;
		
	},
	
	name : function ( ) {
		
		return this._name;
		
	},
	
	value : function ( ) {
		
		return this._internal[ this._name ];
		
	},
	
	set : function ( value ) {
		
		this._internal[ this._name ] = value;
		
	},
	
	remove : function ( ) {
		
		delete this._internal[ this._name ];
		
	},
	
	discard : function ( ) {
		
	}
	
} );
