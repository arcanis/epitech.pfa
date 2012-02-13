//!requires:Input.Event
//!provides:Input.Event.KeyDown
// 
//!requires:JS.Class

Input.Event.KeyDown = new JS.Class( 'Input.Event.KeyDown', {
	
	initialize : function ( key ) {
		
		this.key = key;
		
	}
	
} );
