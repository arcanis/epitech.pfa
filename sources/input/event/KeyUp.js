//!requires:Input.Event
//!provides:Input.Event.KeyUp
// 
//!requires:JS.Class

Input.Event.KeyUp = new JS.Class( 'Input.Event.KeyUp', {
	
	initialize : function ( key ) {
		
		this.key = key;
		
	}
	
} );
