//!requires:Client.Core.Protocol
//!provides:Client.Core.Protocol.Plugin
// 
//!requires:JS.Class
// 
//!uses:Pipeline.Event.Connection
//!uses:Pipeline.Event.Disconnection
//!uses:Pipeline.Event.Command
//!uses:Client.Core.Protocol.Event.Connection.Accept
//!uses:Client.Core.Protocol.Event.Connection.Deny

Client.Core.Protocol.Plugin = new JS.Class('Client.Core.Protocol.Plugin', {
	
	extend : {
		
		attachClient : function ( client ) {
			
			new this( client );
			
		}
		
	},
	
	initialize : function ( client ) {
		
		this.client = client;
		
		this.client.pipeline.addObserver( this.method( 'observer' ) );
		
	},
	
	observer : function ( e ) {
		
		switch ( e.klass ) {
			
		case Pipeline.Event.Connection:
			this.startTransaction( );
			break;
			
		case Pipeline.Event.Disconnection:
			this.endTransaction( );
			break;
			
		case Pipeline.Event.Command:
			var eventName = 'on' + e.command[0].toUpperCase( ) + e.command.substr( 1 );
			if ( this.hasOwnProperty( eventName ) )
				this[ eventName ]( event );
			break;
			
		}
		
	},
	
	startTransaction : function ( ) {
		
		var pipeline = this.client.pipeline;
		
		pipeline.send( 'handshake', { }, function ( status ) {
			
			if ( ! status ) {
				
				var connectionFailureEvent = new Client.Core.Protocole.Event.Connection.Deny( );
				pipeline.notifyObservers( connectionFailureEvent );
				
			} else {
				
				var connectionAcceptEvent = new Client.Core.Protocol.Event.Connection.Accept( );
				pipeline.notifyObservers( connectionAcceptEvent );
				
			}
			
		}.bind( this ));
		
	},
	
	endTransaction : function ( ) {
	}
	
});
