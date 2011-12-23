//!requires:Client.Core.Logger
//!provides:Client.Core.Logger.Plugin
// 
//!requires:JS.Class
// 
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
		
	},
	
	pipelineObserver : function ( e ) {
		
		switch ( e.klass ) {
			
		case Client.Core.Protocol.Event.Connection.Accept :
			this.log( 'Connection accepted by the server' );
			break ;
			
		case Client.Core.Protocol.Event.Connection.Deny :
			this.log( 'Connection denied by the server' );
			break ;
			
		}
		
	}
	
});
