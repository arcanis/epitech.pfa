//!requires:Pipeline
//!provides:Pipeline.Base
// 
//!requires:JS.Class

Pipeline.Broadcast = new JS.Class('Pipeline.Broadcast', {
	
	initialize: function ( pipeline ) {
		
		this.pipeline = pipeline;
		
	},
	
	send: function ( command, message ) {
		
		this.pipeline(command, message);
		
	}
	
});
