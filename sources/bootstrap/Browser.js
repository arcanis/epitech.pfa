//!requires:Bootstrap
//!provides:Bootstrap.Browser
// 
//!requires:JS.Class
// 
//!uses:Game.Remote
//!uses:Interface.Browser
//!uses:Layout.Azerty

Bootstrap.Browser = new JS.Class( 'Bootstrap.Browser', {
	
	initialize : function ( ) {
		
		var game = new Game.Remote( document.location.host, 42000 );
		
		var lnterface = new Interface.Browser( );
		
		lnterface.setLayout( Layout.Azerty );
		lnterface.setGame( game );
		
		lnterface.domElement.style.position = 'absolute';
		lnterface.domElement.style.top = lnterface.domElement.style.left = 0;
		
		window.addEventListener( 'load', function ( ) {
			
			document.body.appendChild( lnterface.domElement );			
			
			lnterface.setSize( window.innerWidth, window.innerHeight );
			
		}.bind( this ), false );
		
		window.addEventListener( 'resize', function ( ) {
			
			lnterface.setSize( window.innerWidth, window.innerHeight );
			
		}.bind( this ), false );
		
	}
	
} );
