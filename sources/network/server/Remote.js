//!requires:Network.Server
//!provides:Network.Server.Remote
// 
//!requires:JS.Class
// 
//!uses:Network.Pipeline.Remote
// 
//!uses:Network.Event.Connection
//!uses:Network.Event.Disconnection

Network.Server.Remote = new JS.Class( 'Network.Server.Remote', Network.Server, {
	
	initialize : function ( port ) {
		
		this.socketio = require( 'socket.io' ).listen( port );
		
		this.pipelines = [ ];
		
		this.socketio.sockets.on( 'connection', function ( siostream ) {
			
			var pipeline = new Network.Pipeline.Remote( siostream );
			this.pipelines.push( pipeline );
			
			var connectionEvent = new Network.Event.Connection( this, pipeline );
			this.notifyObservers( connectionEvent );
			
			pipeline.addObserver( function ( event ) {
				
				this.notifyObservers( event );
				
				if ( event instanceof Network.Event.Disconnection ) {
					
					this.pipelines = this.pipelines.filter( function ( o ) { return o == pipeline; } );
					
				}
				
			}.bind( this ) );
			
		}.bind( this ) );
		
	}
	
} );
