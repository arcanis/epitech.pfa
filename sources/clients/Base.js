//!requires:Client
//!provides:Client.Base
// 
//!requires:JS.Class
//!requires:JS.Observable
// 
//!uses:View.Apis
// 
//!uses:Client.Core.Logger.Plugin
//!uses:Client.Core.Protocol.Plugin
// 
//!uses:Client.Event.State.Bootstrap

Client.Base = new JS.Class('Client.Base', {
	
	include : [ JS.Observable ],
	
	initialize: function ( ) {
		
		this.pipeline = null;
		
		this.view = new View.Apis();
		
	},
	
	bootstrap : function ( ) {
		
		this.plug( Client.Core.Logger.Plugin );
		this.plug( Client.Core.Protocol.Plugin );
		
		var event = new Client.Event.State.Bootstrap( );
		this.notifyObservers( event );
		
		this.pipeline.finalize( );
		
	},
	
	plug : function ( plugin ) {
		
		plugin.attachClient( this );
		
	}
	
});
