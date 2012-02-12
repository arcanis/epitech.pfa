//!requires:Plugin.Authentification.Server.Event
//!provides:Plugin.Authentification.Server.Event.Accept
// 
//!requires:JS.Class

Plugin.Authentification.Server.Event.Accept = new JS.Class( 'Plugin.Authentification.Server.Event.Accept', {
	
	initialize : function ( listener, pipeline, name ) {
		
		this.listener = listener;
		
		this.pipeline = pipeline;
		
		this.name = name;
		
	}
	
} );
