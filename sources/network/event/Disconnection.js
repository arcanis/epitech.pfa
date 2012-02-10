//!requires:Network.Event
//!provides:Network.Event.Disconnection
// 
//!requires:JS.Class

Network.Event.Disconnection = new JS.Class( 'Network.Event.Disconnection', {
	
	initialize : function ( pipeline ) {
		
		this.pipeline = pipeline;
		
	}
	
} );
