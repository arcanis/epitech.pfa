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
		
		var game = new Game.Remote( 'http://' + global.SERVER_HOST + ':42000' );
		
		Helper.requestAnimationLoop(function ( ) {
			
			System.Display.render( game.client.view );
			
		});
		
	}
	
});
