//!requires:Plugin.Authentification.Event
//!provides:Plugin.Authentification.Event.Accept
// 
//!requires:JS.Class

Plugin.Authentification.Event.Accept = new JS.Class( 'Plugin.Authentification.Event.Accept', {
	
	initialize : function ( client, uuid ) {
		
		this.client = client;
		
		this.uuid = uuid;
		
	}
	
} );
