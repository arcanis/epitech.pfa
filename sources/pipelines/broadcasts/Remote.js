//!requires:Pipeline.Broadcast
//!provides:Pipeline.Broadcast.Remote
//!requires:Pipeline.Broadcast.Base
// 
//!requires:JS.Class

Pipeline.Broadcast.Remote = new JS.Class('Pipeline.Broadcast.Remote', Pipeline.Broadcast.Base, {
	
	initialize : function ( pipeline ) {
		
		this.pipeline = pipeline;
		
	},
	
	send : function ( command, data, callback ) {
		
		this.pipeline.broadcast.send( command, data, callback );
		
	}
	
});
