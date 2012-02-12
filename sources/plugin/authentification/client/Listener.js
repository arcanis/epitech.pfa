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
		
		this.client = client;
		
		client.network.addObserver( function ( event ) {
			
			if ( event instanceof Network.Event.Connection ) {
				
				this._authenticate( event.pipeline );
				
			} else if ( event instanceof Network.Event.Message ) {
				
				if ( event.command === 'authentification.accept' ) {
					
					this._onAccept( event );
					
				} else if ( event.command === 'authentification.reject' ) {
					
					this._onReject( event );
					
				}
				
			}
			
		}.bind( this ) );
		
	},
	
	_authenticate : function ( pipeline ) {
		
		pipeline.send( 'authentification.handshake' );
		
	},
	
	_onAccept : function ( event ) {
		
		var acceptEvent = new Plugin.Authentification.Client.Event.Accept( this, event.pipeline, event.data.uuid );
		Plugin.Authentification.notifyObservers( acceptEvent );
		
	},
	
	_onReject : function ( event ) {
		
		var rejectEvent = new Plugin.Authentification.Client.Event.Reject( this, event.pipeline, event.data.message );
		Plugin.Authentification.notifyObserver( rejectEvent );
		
	}
	
} );
