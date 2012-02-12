//!requires:Plugin.Authentification.Client.Event
//!provides:Plugin.Authentification.Client.Event.Reject
// 
//!requires:JS.Class

Plugin.Authentification.Client.Event.Reject = new JS.Class( 'Plugin.Authentification.Client.Event.Reject', {
	
	initialize : function ( listener, pipeline, message ) {
		
		this.listener = listener;
		
		this.pipeline = pipeline;
		
		this.message = message;
		
	}
	
} );
