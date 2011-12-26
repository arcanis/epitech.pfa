//!provides:Browser
// 
//!requires:JS.Class
// 
//!uses:System.Display
//!uses:Helper.requestAnimationFrame
// 
//!uses:Game.Remote

global.Browser = new JS.Class('Browser', {
	
	initialize : function ( ) {
		
		var game = new Game.Remote( "http://localhost:7810" );
		
		Helper.requestAnimationFrame(function ( ) {
			
			System.Display.render( game.client.view );
			
		});
		
	}
	
});
