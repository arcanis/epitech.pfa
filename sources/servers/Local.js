//!requires:Server
//!provides:Server.Local
//!requires:Server.Base
// 
//!requires:JS.Class
// 
//!requires:Pipeline.Multiplexer.Local

Server.Local = new JS.Class('Server.Local', Server.Base, {
	
	initialize : function ( ) {
		
		this.callSuper( );
		
		this.multiplexer = new Pipeline.Multiplexer.Local( );
	    this.multiplexer.register("test", function (pipeline, object) {
		    alert(object);
		});
		
	}
	
});
