//!requires:Client.Core.Protocol
//!provides:Client.Core.Protocol.Plugin
// 
//!requires:JS.Class
// 
//!uses:Value3
// 
//!uses:Pipeline.Event.Connection
//!uses:Pipeline.Event.Disconnection
//!uses:Pipeline.Event.Command
//!uses:Client.Core.Protocol.Event.Connection.Accept
//!uses:Client.Core.Protocol.Event.Connection.Deny
//!uses:Client.Core.Protocol.Event.Player.Join
//!uses:Client.Core.Protocol.Event.Player.Part
//!uses:Client.Core.Protocol.Event.Player.Move

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
				this[ eventName ]( e );
			break;
			
		}
		
	},
	
	startTransaction : function ( ) {
		
		var pipeline = this.client.pipeline;
		
		pipeline.send( 'handshake', { }, function ( id ) {
			
			if ( id === -1 ) {
				
				var connectionDenyEvent = new Client.Core.Protocole.Event.Connection.Deny( );
				pipeline.notifyObservers( connectionDenyEvent );
				
			} else {
				
				this.client.playerId = id;
				
				var connectionAcceptEvent = new Client.Core.Protocol.Event.Connection.Accept( );
				pipeline.notifyObservers( connectionAcceptEvent );
				
			}
			
		}.bind( this ));
		
	},
	
	endTransaction : function ( ) {
	},
	
	onPlayerMove : function ( e ) {
		
		var playerMoveEvent = new Client.Core.Protocol.Event.Player.Move( );
		playerMoveEvent.position = Value3.fromArray( e.position );
		playerMoveEvent.rotation = Value3.fromArray( e.rotation );
		this.client.notifyObservers( playerMoveEvent );
		
	}
	
});
