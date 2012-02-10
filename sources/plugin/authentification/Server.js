//!requires:Plugin.Authentification
//!provides:Plugin.Authentification.Server
// 
//!uses:Network.Event.Message

Plugin.Authentification.Server = new JS.Class( 'Plugin.Authentification.Server', {
	
	initialize : function ( server ) {
		
		this.server = server;
		
		server.network.addObserver( function ( event ) {
			
			if ( event instanceof Network.Event.Message && event.command === 'authentification.handshake' ) {
				
				this.judge( event );
				
			}
			
		}.bind( this ) );
		
	},
	
	judge : function ( event ) {
		
		event.pipeline.send( 'authentification.accept', {
			uuid : event.pipeline.uuid
		} );
		
	}
	
} );
