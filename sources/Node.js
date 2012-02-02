//!provides:Node
// 
//!requires:JS.Class
// 
//!requires:Server.Remote
//!requires:Generator.Base

global.Node = new JS.Class('Node', {
	
	initialize : function ( ) {
		
		var server = new Server.Remote( 7810 );
		server.bootstrap( );
		var generator = new Generator.Base();
		for (var x = 0; x < 4; x++)
		  for (var z = 0; z < 4; z++)
		    generator.generate(x, z);

	}
	
});
