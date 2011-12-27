//!requires:Server.Core.Player
//!provides:Server.Core.Player.Plugin
// 
//!requires:JS.Class
// 
//!uses:Server.Core.Protocol.Event.Player.Join
//!uses:Server.Core.Protocol.Event.Player.Part
//!uses:Server.Core.Protocol.Event.Player.Move

Server.Core.Player.Plugin = new JS.Class('Server.Core.Player.Plugin', {
	
	extend : {
		
		attachServer : function ( server ) {
			
			new this( server );
			
		}
		
	},
	
	initialize : function ( server ) {
		
		this.server = server;
		
		this.server.addObserver( this.method( 'observer' ) );
		
	},
	
	observer : function ( e ) {
		
		switch ( e.klass ) {
			
		case Server.Core.Protocol.Event.Player.Join:
			this.server.multiplexer.send('playerJoin', { id : e.playerId, position : e.position.toArray( ), orientation : e.orientation.toArray( ) });
			break ;
			
		case Server.Core.Protocol.Event.Player.Part:
			this.server.multiplexer.send('playerPart', { id : e.playerId });
			break ;
			
		case Server.Core.Protocol.Event.Player.Move:
			e.pipeline.broadcast.send('playerMove', { id : e.playerId, position : e.position.toArray( ), orientation : e.orientation.toArray( ) });
			break ;
			
		}
		
	}
	
});
