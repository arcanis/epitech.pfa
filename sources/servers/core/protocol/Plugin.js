//!requires:Server.Core.Protocol
//!provides:Server.Core.Protocol.Plugin
// 
//!requires:JS.Class
// 
//!uses:Pipeline.Event.Command
//!uses:Server.Core.Protocol.Event.Connection.Accept
//!uses:Server.Core.Protocol.Event.Connection.Deny
//!uses:Server.Core.Protocol.Event.Player.Join
//!uses:Server.Core.Protocol.Event.Player.Part
//!uses:Server.Core.Protocol.Event.Player.Move

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
		
		this.playersCount = 0;
		
	},
	
	observer : function ( e ) {
		
		switch ( e.klass ) {
			
		case Pipeline.Event.Disconnection :
			this.onDisconnection( );
			break;
			
		case Pipeline.Event.Command :
			var eventName = 'on' + e.command[0].toUpperCase( ) + e.command.substr( 1 ) + 'Command';
			if ( eventName in this ) //[1]
				this[ eventName ]( e );
			break;
			
		}
		
	},
	
	onDisconnection : function ( disconnection ) {
		
		var pipeline = disconnection.pipeline;
		
		var playerPartEvent = new Server.Core.Protocol.Event.Player.Part( );
		playerPartEvent.pipeline = pipeline;
		this.server.multiplexer.notifyObservers( playerPartEvent );
		
	},
	
	onHandshakeCommand : function ( handshake ) {
		
		var pipeline = handshake.pipeline;
		pipeline.playerId = this.playerCount ++;
		
		var connectionAcceptEvent = new Server.Core.Protocol.Event.Connection.Accept( );
		connectionAcceptEvent.pipeline = pipeline;
		this.server.multiplexer.notifyObservers( connectionAcceptEvent );
		
		var playerJoinEvent = new Server.Core.Protocol.Event.Player.Join( );
		playerJoinEvent.pipeline = pipeline;
		this.server.notifyObservers( playerJoinEvent );
		
		handshake.aknowledge( pipeline.playerId );
		
		pipeline.send('playerMove', { playerId : pipeline.playerId, position : [ 0, 0, 0 ], rotation : [ 0, 0, 0 ] });
		
	},
	
	onPlayerMoveCommand : function ( playerMove ) {
		
		var playerMoveEvent = new Server.Core.Protocol.Event.Player.Move( );
		playerMoveEvent.pipeline = playerMove.pipeline;
		playerMoveEvent.position = Value3.fromArray( playerMove.position );
		playerMoveEvent.rotation = Value3.fromArray( playerMove.rotation );
		this.server.notifyObservers( playerMoveEvent );
		
	}
	
});
