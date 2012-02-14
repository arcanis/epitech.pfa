//!provides:Node
// 
//!requires:JS.Class
// 
//!requires:Server.Remote
//!requires:Generator.Base

global.Node = new JS.Class('Node', {
	
	initialize : function ( ) {
		
		//var server = new Server.Remote( 7810 );
		//server.bootstrap( );
		var generator = new Generator.Base();
		//console.log(25 * 16 * 2);
		//console.log(25 * 16 * 2);
		for (var x = 0; x < 10; x++)
		  for (var z = 0; z < 10; z++)
		  {
		    console.log("c " + x + " " + z);
		    generator.generate(x, z);
		    
		  }
		  console.log("Done");
	}
	
	
});
