//!provides:RemoteGame
// 
//!requires:JS.Class
//!requires:Game
// 
//!uses:StandardClient
//!uses:RemotePipeline

global.RemoteGame = new JS.Class(Game, {
	setup: function (hostname) {
		this.callSuper();
		this.client = new StandardClient();
		this.client.pipeline = new RemotePipeline(hostname);
	}
});
