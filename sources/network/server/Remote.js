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
		
		this._socketio = require( 'socket.io' ).listen( port );
		
		this._socketio.sockets.on( 'connection', function ( siostream ) {
			
			var pipeline = new Network.Pipeline.Remote( siostream );
			
			var connectionEvent = new Network.Event.Connection( this, pipeline );
			this.notifyObservers( connectionEvent );
			
			pipeline.addObserver( function ( event ) {
				
				this.notifyObservers( event );
				
			}.bind( this ) );
			
		}.bind( this ) );
		
	},
	
	send : function ( command, data ) {
		
		this._socketio.sockets.emit( 'data', {
			command : command,
			data : data || { }
		} );
		
	}
	
} );
