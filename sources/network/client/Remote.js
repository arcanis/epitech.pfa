//!requires:Network.Client
//!provides:Network.Client.Remote
// 
//!requires:JS.Class
// 
//!uses:Network.Pipeline.Remote
// 
//!uses:Network.Event.Connection
//!uses:Network.Event.Disconnection

Network.Client.Remote = new JS.Class( 'Network.Client.Remote', Network.Client, {
	
	initialize : function ( host, port ) {
		
		if ( typeof ( io ) === 'undefined' )
			
			throw new Error( 'Socket.IO does not seems to be loaded' );
		
	    console.log(host + ':' + port);
		this.socketio = io.connect( 'http://' + host + ':' + port );
		
		this.socketio.on( 'connect', function ( ) {
			
			var pipeline = new Network.Pipeline.Remote( this.socketio );
			this.pipeline = pipeline;
			
			var connectionEvent = new Network.Event.Connection( pipeline );
			this.notifyObservers( connectionEvent );
			
			pipeline.addObserver( function ( event ) {
				
				this.notifyObservers( event );
				
				if ( event instanceof Network.Event.Disconnection ) {
					
					this.pipeline = null;
					
				}
				
			}.bind( this ) );
			
		}.bind( this ) );
		
	}
	
} );
