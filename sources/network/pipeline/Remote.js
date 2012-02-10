//!requires:Network.Pipeline
//!provides:Network.Pipeline.Remote
// 
//!requires:JS.Class
// 
//!uses:Network.Event.Disconnection
//!uses:Network.Event.Message

Network.Pipeline.Remote = new JS.Class( 'Network.Pipeline.Remote', Network.Pipeline, {
	
	initialize : function ( siostream ) {
		
		this.siostream = siostream;
		
		siostream.on( 'data', function ( siodata ) {
			
			var messageEvent = new Network.Event.Message( this, siodata.command, siodata.data );
			this.notifyObservers( messageEvent );
			
		}.bind( this ) );
		
		siostream.on( 'disconnect', function ( ) {
			
			var disconnectionEvent = new Network.Event.Disconnection( this );
			this.notifyObservers( disconnectionEvent );
			
		}.bind( this ) );
		
		this.callSuper( );
		
	},
	
	send : function ( command, data ) {
		
		this.siostream.emit( 'data', {
			
			command : command,
			
			data : data || { }
			
		} );
		
	}
	
} );
