//!requires:Server.Core.Logger
//!provides:Server.Core.Logger.Plugin
// 
//!requires:JS.Singleton
// 
//!uses:Server.Event.State.Bootstrap
//!uses:Server.Core.Loader.Event.Generated
//!uses:Server.Core.Loader.Event.Loaded
// 
//!uses:Pipeline.Event.Connection
//!uses:Pipeline.Event.Disconnection

Server.Core.Logger.Plugin = new JS.Class('Server.Core.Logger.Plugin', {
	
	extend : {
		
		attachServer : function ( server ) {
			
			new this( server );
			
		}
		
	},
	
	initialize : function ( server ) {
		
		this.server = server;
		
		this.server.addObserver( this.method( 'serverObserver' ) );
		
		this.server.multiplexer.addObserver( this.method( 'multiplexerObserver' ) );
		
	},
	
	log : function ( text ) {
		
		console.log( '[Server] ' + text );
		
	},
	
	serverObserver : function ( e ) {
		
		switch ( e.klass ) {
			
		case Server.Event.State.Bootstrap :
			this.log( 'Server bootstraped !' );
			break;
			
		case Server.Core.Loader.Event.Generated :
			this.log( 'Chunk generated' );
			break;
			
		case Server.Core.Loader.Event.Loaded :
			this.log( 'Chunk loaded from cache' );
			break;
			
		}
		
	},
	
	multiplexerObserver : function ( e ) {
		
		switch ( e.klass ) {
			
		case Pipeline.Event.Connection :
			this.log( 'Connection started' );
			break;
			
		case Pipeline.Event.Disconnection :
			this.log( 'Socket disconnected' );
			break;
			
		}
		
	}
	
});
