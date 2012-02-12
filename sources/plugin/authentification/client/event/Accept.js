//!requires:Plugin.Authentification.Client.Event
//!provides:Plugin.Authentification.Client.Event.Accept
// 
//!requires:JS.Class

Plugin.Authentification.Client.Event.Accept = new JS.Class( 'Plugin.Authentification.Client.Event.Accept', {
	
	initialize : function ( listener, pipeline ) {
		
		this.listener = listener;
		
		this.pipeline = pipeline;
		
	}
	
} );
