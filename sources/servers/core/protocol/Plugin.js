//!requires:Server.Core.Protocol
//!provides:Server.Core.Protocol.Plugin
// 
//!requires:JS.Class
// 
//!uses:Pipeline.Event.Command
//!uses:Server.Core.Protocol.Event.Connection.Accept
//!uses:Server.Core.Protocol.Event.Connection.Deny

//[1] : We can't use .hasOwnProperty(), because we need to inspect the full prototype tree, due to inheritance

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
		
		if ( e.klass === Pipeline.Event.Command ) {
			
			var eventName = 'on' + e.command[0].toUpperCase( ) + e.command.substr( 1 );
			
			if ( eventName in this ) { //[1]
				this[ eventName ]( e );
			}
			
		}
		
	},
	
	onHandshake : function ( handshake ) {
		
		var clientAcceptEvent = new Server.Core.Protocol.Event.Connection.Accept( );
		this.server.notifyObservers( clientAcceptEvent );
		
		handshake.aknowledge( true );
		
	}
	
});
