//!requires:Network.Event
//!provides:Network.Event.Message
// 
//!requires:JS.Class

Network.Event.Message = new JS.Class( 'Network.Event.Message', {
	
	initialize : function ( pipeline, command, data ) {
		
		this.pipeline = pipeline;
		
		this.command = command;
		
		this.data = data;
		
	}
	
} );
