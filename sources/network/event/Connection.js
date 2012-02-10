//!requires:Network.Event
//!provides:Network.Event.Connection
// 
//!requires:JS.Class

Network.Event.Connection = new JS.Class( 'Network.Event.Connection', {
	
	initialize : function ( pipeline ) {
		
		this.pipeline = pipeline;
		
	}
	
} );
