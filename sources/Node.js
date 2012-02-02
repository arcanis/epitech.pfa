//!provides:Node
// 
//!requires:JS.Class
// 
//!requires:Server.Remote
//!requires:Generator.Base

global.Node = new JS.Class('Node', {
	
	initialize : function ( ) {
		
		var server = new Server.Remote( 42000 );
		server.bootstrap( );
		
	}
	
});
