//!requires:Output.Event
//!provides:Output.Event.Append
// 
//!requires:JS.Class

Output.Event.Append = new JS.Class( 'Outout.Event.Append', {
	
	initialize : function ( message ) {
		
		this.message = message;
		
	}
	
} );
