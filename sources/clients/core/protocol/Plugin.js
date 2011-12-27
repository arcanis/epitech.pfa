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

//[1] : We can't use .hasOwnProperty(), because we need to inspect the full prototype tree, due to inheritance

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
			var eventName = 'on' + e.command[0].toUpperCase( ) + e.command.substr( 1 ) + 'Command';
			if ( eventName in this ) //[1]
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
				
				this.client.id = id;
				
				var connectionAcceptEvent = new Client.Core.Protocol.Event.Connection.Accept( );
				pipeline.notifyObservers( connectionAcceptEvent );
				
			}
			
		}.bind( this ));
		
	},
	
	endTransaction : function ( ) {
	},
	
	onPlayerJoinCommand : function ( command ) {
		
		var data = command.data;
		
		var playerJoinEvent = new Client.Core.Protocol.Event.Player.Join( );
		playerJoinEvent.id = data.id;
		playerJoinEvent.position = Value3.fromArray( data.position );
		playerJoinEvent.orientation = Value3.fromArray( data.orientation );
		this.client.notifyObservers( playerJoinEvent );
		
	},
	
	onPlayerPartCommand : function ( command ) {
		
		var data = command.data;
		
		var playerPartEvent = new Client.Core.Protocol.Event.Player.Part( );
		playerPartEvent.id = data.id;
		this.client.notifyObservers( playerPartEvent );
		
	},
	
	onPlayerMoveCommand : function ( command ) {
		
		var data = command.data;
		
		var playerMoveEvent = new Client.Core.Protocol.Event.Player.Move( );
		playerMoveEvent.id = data.id;
		playerMoveEvent.position = Value3.fromArray( data.position );
		playerMoveEvent.orientation = Value3.fromArray( data.orientation );
		this.client.notifyObservers( playerMoveEvent );
		
	}
	
});
