//!requires:Plugin.Authentification.Client
//!provides:Plugin.Authentification.Client.Listener
// 
//!uses:Network.Event.Connection
//!uses:Network.Event.Message
// 
//!uses:Plugin.Authentification
//!uses:Plugin.Authentification.Client.Event.Accept
//!uses:Plugin.Authentification.Client.Event.Reject

Plugin.Authentification.Client.Listener = new JS.Class( 'Plugin.Authentification.Client.Listener', {
	
	initialize : function ( client ) {
		
		client.network.addObserver( function ( event ) {
			
			if ( event instanceof Network.Event.Connection ) {
				
				this._authenticate( event );
				
			} else if ( event instanceof Network.Event.Message ) {
				
				if ( event.command === 'authentification.accept' ) {
					
					this._accept( event );
					
				} else if ( event.command === 'authentification.reject' ) {
					
					this._reject( event );
					
				}
				
			}
			
		}.bind( this ) );
		
	},
	
	_authenticate : function ( event ) {
		
		event.pipeline.send( 'authentification.handshake' );
		
	},
	
	_accept : function ( event ) {
		
		var acceptEvent = new Plugin.Authentification.Client.Event.Accept( this, event.pipeline, event.data.uuid );
		Plugin.Authentification.notifyObservers( acceptEvent );
		
	},
	
	_reject : function ( event ) {
		
		var rejectEvent = new Plugin.Authentification.Client.Event.Reject( this, event.pipeline, event.data.message );
		Plugin.Authentification.notifyObserver( rejectEvent );
		
	}
	
} );
