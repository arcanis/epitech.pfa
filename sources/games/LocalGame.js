//!provides:LocalGame
// 
//!requires:JS.Class
//!requires:Game
// 
//!uses:StandardClient
//!uses:StandardServer
//!uses:LocalPipeline

global.LocalGame = new JS.Class(Game, {
	setup: function () {
		this.callSuper();
		this.client = new StandardClient();
		this.server = new StandardServer();
		this.client.pipeline = new LocalPipeline();
		this.server.pipeline = new LocalPipeline();
		this.client.pipeline.setReferent(this.server.pipeline);
		this.server.pipeline.setReferent(this.client.pipeline);
	}
});
