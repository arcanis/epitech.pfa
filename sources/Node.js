//!provides:Node
// 
//!requires:JS.Class
// 
//!requires:Server.Remote

global.Node = new JS.Class('Node', {
	
	initialize : function ( ) {
		
		var server = new Server.Remote( 7810 );
		server.bootstrap( );
		
	}
	
});
