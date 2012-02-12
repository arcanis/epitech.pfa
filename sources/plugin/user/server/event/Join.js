//!requires:Plugin.User.Server.Event
//!provides:Plugin.User.Server.Event.Join
// 
//!requires:JS.Class

Plugin.User.Server.Event.Join = new JS.Class( 'Plugin.User.Server.Event.Join', {
	
	initialize : function ( listener, pipeline, name ) {
		
		this.listener = listener;
		
		this.pipeline = pipeline;
		
		this.name = name;
		
	}
	
} );
