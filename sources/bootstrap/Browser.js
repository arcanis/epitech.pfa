//!requires:Bootstrap
//!provides:Bootstrap.Browser
// 
//!requires:JS.Class
// 
//!uses:Game.Remote

Bootstrap.Browser = new JS.Class( 'Bootstrap.Browser', {
	
	initialize : function ( ) {
		
		var game = new Game.Remote( document.location.host, 42000 );
		
	}
	
} );
