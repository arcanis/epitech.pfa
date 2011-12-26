//!requires:Pipeline.Multiplexer
//!provides:Pipeline.Multiplexer.Remote
//!requires:Pipeline.Multiplexer.Base
//
//!requires:JS.Class
// 
//!uses:Pipeline.Remote
//!uses:Pipeline.Broadcast.Remote

Pipeline.Multiplexer.Remote = new JS.Class('Pipeline.Multiplexer.Remote', Pipeline.Multiplexer.Base, {
	
	initialize : function ( port ) {
		
		this.server = require( 'socket.io' ).listen( port );
		
		this.server.sockets.on('connection', function ( socket ) {
			
			var pipeline = new Pipeline.Remote( socket );
			
			pipeline.multiplexer = this;
			pipeline.broadcast = new Pipeline.Broadcast.Remote( pipeline );
			
			pipeline.addObserver(function ( event ) {
				
				this.notifyObservers( event );
				
			}.bind( this ));
			
			socket.on('disconnect', function ( ) {
				
				pipeline.close( true );
				
			});
			
		}.bind( this ));
		
	}
	
});
