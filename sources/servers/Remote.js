//!requires:Server
//!provides:Server.Remote
//!requires:Server.Base
// 
//!requires:JS.Class
// 
//!requires:Pipeline.Multiplexer.Remote

Server.Remote = new JS.Class('Server.Remote', Server.Base, {
	
	initialize : function ( port ) {
		
		this.callSuper( );
		
		this.multiplexer = new Pipeline.Multiplexer.Remote( port );
		
	}
	
});
