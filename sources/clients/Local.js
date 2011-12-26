//!requires:Client
//!provides:Client.Local
//!requires:Client.Base
// 
//!requires:JS.Class

Client.Local = new JS.Class('Client.Local', Client.Base, {
	
	initialize: function ( server ) {
		
		this.callSuper( );
		
	    this.pipeline = server.multiplexer.connect( );
		
	}
	
});
