//!requires:Plugin.Authentification.Event
//!provides:Plugin.Authentification.Event.Reject
// 
//!requires:JS.Class

Plugin.Authentification.Event.Reject = new JS.Class( 'Plugin.Authentification.Event.Reject', {
	
	initialize : function ( client, message ) {
		
		this.client = client;
		
		this.message = message;
		
	}
	
} );
