//!requires:Client
//!provides:Client.Base
// 
//!requires:JS.Class
//!requires:JS.Observable
// 
//!uses:View.Apis
// 
//!uses:Client.Event.Bootstrap

Client.Base = new JS.Class('Client.Base', {
	
	include : JS.Observable,
	
	initialize: function () {
		
		this.pipeline = null;
		
		this.view = new View.Apis();
		
	},
	
	bootstrap : function ( ) {
		
		var event = new Client.Event.Bootstrap( );
		this.notifyObservers( event );
		
		return ! event.canceled;
		
	},
	
	plug : function ( plugin ) {
		
		plugin.attachClient( this );
		
	}
	
});
