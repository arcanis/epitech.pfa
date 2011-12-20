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
		
		var t = new Logic.Event.Voxel.Access( new Value3( 0, 0, 0 ) );
		game.server.logic.notifyObservers( t );
		
		Helper.requestAnimationFrame(function ( ) {
			
			System.Display.render( game.client.view );
			
		});
		
	}
	
});
