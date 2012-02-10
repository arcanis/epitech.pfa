//!requires:Plugin.Authentification
//!provides:Plugin.Authentification.Client
// 
//!uses:Network.Event.Connection
//!uses:Network.Event.Message
// 
//!uses:Plugin.Authentification.Event.Accept
//!uses:Plugin.Authentification.Event.Reject

Plugin.Authentification.Client = new JS.Class( 'Plugin.Authentification.Client', {
	
	initialize : function ( client ) {
		
		this.client = client;
		
		client.network.addObserver( function ( event ) {
			
			if ( event instanceof Network.Event.Connection ) {
				
				this.authenticate( event );
				
			} else if ( event instanceof Network.Event.Message ) {
				
				if ( event.command === 'authentification.accept' ) {
					
					this.accept( event );
					
				} else if ( event.command === 'authentification.reject' ) {
					
					this.reject( event );
					
				}
				
			}
			
		}.bind( this ) );
		
	},
	
	authenticate : function ( event ) {
		
		event.pipeline.send( 'authentification.handshake' );
		
	},
	
	accept : function ( event ) {
		
		var acceptEvent = new Plugin.Authentification.Event.Accept( this.client, event.data.uuid );
		Plugin.Authentification.notifyObservers( acceptEvent );
		
	},
	
	reject : function ( event ) {
		
		var rejectEvent = new Plugin.Authentification.Event.Reject( this.client, event.data.message );
		Plugin.Authentification.notifyObserver( rejectEvent );
		
	}
	
} );
