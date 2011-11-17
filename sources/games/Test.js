//!requires:Game
//!provides:Game.Test
//!requires:Game.Base
// 
//!requires:JS.Class
// 
//!uses:Client.Local
//!uses:Server.Local

Game.Test = new JS.Class('Game.Test', Game.Base, {
	
	initialize: function () {
		
		this.callSuper();
		
		this.server = new Server.Local();
		this.server.start();
		
		this.client = new Client.Local(this.server);
		
	}
	
});
