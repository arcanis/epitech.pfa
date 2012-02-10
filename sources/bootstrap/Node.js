//!requires:Bootstrap
//!provides:Bootstrap.Node
// 
//!requires:JS.Class
// 
//!uses:Server.Remote

Bootstrap.Node = new JS.Class( 'Bootstrap.Node', {
	
	initialize : function ( ) {
		
		var server = new Server.Remote( 42000 );
		
	}
	
} );
