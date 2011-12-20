//!requires:Server.Core.Logger
//!provides:Server.Core.Logger.Plugin
// 
//!requires:JS.Singleton
// 
//!uses:Server.Event.Bootstrap
//!uses:Server.Core.Loader.Event.Generated
//!uses:Server.Core.Loader.Event.Loaded

Server.Core.Logger.Plugin = new JS.Singleton('Server.Core.Logger.Plugin', {
	
	observer : function ( e ) {
		
		if ( e.klass === Server.Event.Bootstrap ) {
			
			console.log( 'Server bootstraped !' );
			
		}
		
		else if ( e.klass === Server.Core.Loader.Event.Generated ) {
			
			console.log( 'Chunk generated' );
			
		}
		
		else if ( e.klass === Server.Core.Loader.Event.Loaded ) {
			
			console.log( 'Chunk loaded from cache' );
			
		}
		
	},
	
	attachServer : function ( server ) {
		
		if ( typeof ( console ) !== 'undefined' ) {
			
			server.addObserver( this.method( 'observer' ) );
			
		}
		
	}
	
});
