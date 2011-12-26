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
<<<<<<< HEAD
		this.multiplexer.register("test", function (pipeline, object) {
		    alert(object);
		});
=======
>>>>>>> efdf65d7b8e90f5027a02cd1795e8fd5861848de
		
	}
	
});
