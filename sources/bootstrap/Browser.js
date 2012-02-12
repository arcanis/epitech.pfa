//!requires:Bootstrap
//!provides:Bootstrap.Browser
// 
//!requires:JS.Class
// 
//!uses:Console.Browser
//!uses:Game.Remote

Bootstrap.Browser = new JS.Class( 'Bootstrap.Browser', {
	
	initialize : function ( ) {
		
		var game = new Game.Remote( document.location.host, 42000 );
		
		var console = new Console.Browser( );
		console.setSource( game.client.output );
		console.domElement.style.position = 'absolute';
		console.domElement.style.left = console.domElement.style.bottom = 0;
		
		window.addEventListener( 'load', function ( ) {
			
			var body = document.body;
			
			body.appendChild( console.domElement );
			
		}.bind( this ), false );
		
	}
	
} );
