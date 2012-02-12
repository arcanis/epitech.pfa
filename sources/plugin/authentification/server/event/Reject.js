//!requires:Plugin.Authentification.Server.Event
//!provides:Plugin.Authentification.Server.Event.Reject
// 
//!requires:JS.Class

Plugin.Authentification.Server.Event.Reject = new JS.Class( 'Plugin.Authentification.Server.Event.Reject', {
	
	initialize : function ( listener, pipeline, message ) {
		
		this.listener = listener;
		
		this.pipeline = pipeline;
		
		this.message = message;
		
	}
	
} );
