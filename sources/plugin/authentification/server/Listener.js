//!requires:Plugin.Authentification.Server
//!provides:Plugin.Authentification.Server.Listener
// 
//!uses:Network.Event.Message
// 
//!uses:Plugin.Authentification
//!uses:Plugin.Authentification.Server.Event.Accept
//!uses:Plugin.Authentification.Server.Event.Reject

Plugin.Authentification.Server.Listener = new JS.Class( 'Plugin.Authentification.Server.Listener', {
	
	initialize : function ( server ) {
		
		server.network.addObserver( function ( event ) {
			
			if ( event instanceof Network.Event.Message && event.command === 'authentification.handshake' ) {
				
				this._judge( event );
				
			}
			
		}.bind( this ) );
		
	},
	
	_judge : function ( event ) {
		
		this._accept( event.pipeline, event.data.name );
		
	},
	
	_accept : function ( pipeline, name ) {
		
		pipeline.send( 'authentification.accept', {
			uuid : pipeline.uuid
		} );
		
		var acceptEvent = new Plugin.Authentification.Server.Event.Accept( this, pipeline, name );
		Plugin.Authentification.notifyObservers( acceptEvent );
		
	},
	
	_reject : function ( pipeline, message ) {
		
		pipeline.send( 'authentification.reject', {
			message : message
		} );
		
		var rejectEvent = new Plugin.Authentification.Server.Event.Reject( this, pipeline, message );
		Plugin.Authentification.notifyObservers( rejectEvent );
		
	}
	
} );
