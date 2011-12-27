//!requires:Client.Core.Logger
//!provides:Client.Core.Logger.Plugin
// 
//!requires:JS.Class
// 
//!uses:Client.Event.State.Bootstrap
//!uses:Client.Core.Protocol.Event.Connection.Accept
//!uses:Client.Core.Protocol.Event.Connection.Deny

Client.Core.Logger.Plugin = new JS.Class('Client.Core.Logger.Plugin', {
	
	extend : {
		
		attachClient : function ( client ) {
			
			new this( client );
			
		}
		
	},
	
	initialize : function ( client ) {
		
		this.client = client;
		
		this.client.addObserver( this.method( 'clientObserver' ) );
		
		this.client.pipeline.addObserver( this.method( 'pipelineObserver' ) );
		
	},
	
	log : function ( text ) {
		
		console.log( '[Client] ' + text );
		
	},
	
	clientObserver : function ( e ) {
		
		switch ( e.klass ) {
			
		case Client.Event.State.Bootstrap :
			this.log( 'Client bootstraped' );
			break ;
			
		case Client.Core.Protocol.Event.Player.Join:
			this.log( 'Player join' );
			break ;
			
		case Client.Core.Protocol.Event.Player.Part:
			this.log( 'Player part' );
			break ;
			
		}
		
	},
	
	pipelineObserver : function ( e ) {
		
		switch ( e.klass ) {
			
		case Pipeline.Event.Connection :
			this.log( 'Connection started. Waiting for server acceptance.' );
			break ;
			
		case Pipeline.Event.Disconnection :
			this.log( 'Connection dropped.' );
			break;
			
		case Client.Core.Protocol.Event.Connection.Accept :
			this.log( 'Connection accepted by the server' );
			break ;
			
		case Client.Core.Protocol.Event.Connection.Deny :
			this.log( 'Connection denied by the server' );
			break ;
			
		}
		
	}
	
});
