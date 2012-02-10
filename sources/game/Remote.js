//!requires:Game
//!provides:Game.Remote
// 
//!requires:JS.Class
// 
//!uses:Client.Remote

Game.Remote = new JS.Class( 'Game.Remote', Game, {
	
	initialize : function ( host, port ) {
		
		this.client = new Client.Remote( host, port );
		
	}
	
} );
