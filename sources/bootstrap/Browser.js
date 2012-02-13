//!requires:Bootstrap
//!provides:Bootstrap.Browser
// 
//!requires:JS.Class
// 
//!uses:Console.Browser
//!uses:Game.Remote
//!uses:Viewport.Browser

Bootstrap.Browser = new JS.Class( 'Bootstrap.Browser', {
	
	initialize : function ( ) {
		
		var game = new Game.Remote( document.location.host, 42000 );
		
		var viewport = new Viewport.Browser( );
		viewport.domElement.style.position = 'absolute';
		viewport.domElement.style.left = viewport.domElement.style.top = 0;
		
		var console = new Console.Browser( );
		console.setSource( game.client.output );
		console.domElement.style.position = 'absolute';
		console.domElement.style.left = console.domElement.style.bottom = 0;
		
		window.addEventListener( 'load', function ( ) {
			
			var body = document.body;
			
			body.appendChild( viewport.domElement );
			body.appendChild( console.domElement );			
			
			viewport.setSize( window.innerWidth, window.innerHeight );
			
		}.bind( this ), false );
		
		window.addEventListener( 'resize', function ( ) {
			
			viewport.setSize( window.innerWidth, window.innerHeight );
			
		}.bind( this ), false );
		
	}
	
} );
