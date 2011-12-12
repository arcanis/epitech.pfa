//!requires:Server.Event
//!provides:Server.Event.State
//!requires:Server.Event.Base
// 
//!requires:JS.Class

Server.Event.State = new JS.Class('Server.Event.State', Server.Event.State, {
	
	initialize : function ( ) {
		
		this.canceled = false;
		
	},
	
	cancel : function ( ) {
		
		this.canceled = true;
		
	}
	
});
