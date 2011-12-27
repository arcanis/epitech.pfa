//!provides:Browser
// 
//!requires:JS.Class
// 
//!uses:System.Display
//!uses:Helper.requestAnimationLoop
// 
//!uses:Game.Remote

global.Browser = new JS.Class('Browser', {
	
	initialize : function ( ) {
		
		var game = new Game.Remote( "http://localhost:7810" );
		
		Helper.requestAnimationLoop(function ( ) {
			
			System.Display.render( game.client.view );
			
		});
		
	}
	
});
