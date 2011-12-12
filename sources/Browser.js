//!provides:Browser
// 
//!requires:JS.Class
// 
//!uses:System.Display
//!uses:Helper.requestAnimationFrame
// 
//!uses:Game.Test

global.Browser = new JS.Class('Browser', {
	
	initialize : function ( ) {
		
		var game = new Game.Test( );
		
		Helper.requestAnimationFrame(function ( ) {
			
			System.Display.render( game.view );
			
		});
		
	}
	
});
