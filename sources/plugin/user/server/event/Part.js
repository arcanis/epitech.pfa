//!requires:Plugin.User.Server.Event
//!provides:Plugin.User.Server.Event.Part
// 
//!requires:JS.Class

Plugin.User.Server.Event.Part = new JS.Class( 'Plugin.User.Server.Event.Part', {
	
	initialize : function ( listener, pipeline ) {
		
		this.listener = listener;
		
		this.pipeline = pipeline;
		
	}
	
} );
