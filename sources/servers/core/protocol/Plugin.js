//!requires:Server.Core.Protocol
//!provides:Server.Core.Protocol.Plugin
// 
//!requires:JS.Class

Server.Core.Protocol.Plugin = new JS.Class('Server.Core.Protocol.Plugin', {
	
	extend : {
		
		attachServer : function ( server ) {
			
			new this( server );
			
		}
		
	},
	
	initialize : function ( server ) {
		
		this.server = server;
		
		this.server.multiplexer.addObserver( this.method( 'observer' ) );
		
	},
	
	observer : function ( e ) {
		
		if ( e instanceof Pipeline.Event.Command ) {
			
			var eventName = 'on' + e.command[0].toUpperCase( ) + e.command.substr( 1 );
			
			if ( this.hasOwnProperty( eventName ) ) {
				this[ eventName ]( event );
			}
			
		}
		
	},
	
	onHandshake : function ( handshake ) {
		
		var clientAcceptEvent = new Server.Core.Protocol.Event.Client.Accept( );
		this.server.notifyObservers( event );
		
		handshake.aknowledge( true );
		
	}
	
});
