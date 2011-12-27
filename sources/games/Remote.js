//!requires:Game
//!provides:Game.Remote
//!requires:Game.Base
// 
//!requires:JS.Class
// 
//!uses:Client.Remote

Game.Remote = new JS.Class('Game.Remote', Game.Base, {
	
	initialize: function ( host ) {
		
		this.callSuper();
		
		this.client = new Client.Remote( host );
		this.client.bootstrap( );
		
		this.client.view.activateAxes( );
		
	}
	
});
