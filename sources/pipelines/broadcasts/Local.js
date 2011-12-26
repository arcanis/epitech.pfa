//!requires:Pipeline.Broadcast
//!provides:Pipeline.Broadcast.Local
//!requires:Pipeline.Broadcast.Base
// 
//!requires:JS.Class

Pipeline.Broadcast.Local = new JS.Class('Pipeline.Broadcast.Local', Pipeline.Broadcast.Base, {
	
	initialize : function ( pipeline ) {
		
		this.pipeline = pipeline;
		
	},
	
	send : function ( command, data, callback ) {
		
		var multiplexer = this.pipeline.multiplexer;
		var pipelines = multiplexer.pipelines;
		
		for ( var k = 0, l = pipelines.length; k < l; ++ k ) {
			
			if ( pipelines[ k ] != this.pipeline ) {
				pipelines[ k ].send( command, data, callback );
			}
			
		}
		
	}
	
});
