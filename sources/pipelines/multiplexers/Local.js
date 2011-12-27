//!requires:Pipeline.Multiplexer
//!provides:Pipeline.Multiplexer.Local
//!requires:Pipeline.Multiplexer.Base
//
//!requires:JS.Class
// 
//!uses:Pipeline.Local
//!uses:Pipeline.Broadcast.Local

Pipeline.Multiplexer.Local = new JS.Class('Pipeline.Multiplexer.Local', Pipeline.Multiplexer.Base, {
	
	initialize : function ( ) {
		
		this.pipelines = [ ];
		
	},
	
	connect : function ( ) {
		
		var my = new Pipeline.Local( );
		var your = new Pipeline.Local( );
		
		my.other = your;
		your.other = my;
		
		my.multiplexer = this;
		my.broadcast = new Pipeline.Broadcast.Local( my );
		
		my.addObserver(function ( event ) {
			
			this.notifyObservers( event );
			
		}.bind( this ));
		
		this.pipelines.push( my );
		
		return your;
		
	},
	
	send : function ( command, data, callback ) {
		
		var pipelines = this.pipelines;
		
		for ( var x = 0, l = pipelines.length; x < l; ++ x ) {
			
			pipelines[ x ].send( command, data, callback );
			
		}
		
	}
	
});
