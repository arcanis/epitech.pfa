//!provides:ServerGame
// 
//!requires:JS.Class
//!requires:Game
// 
//!uses:StandardServer
//!uses:PipelineMultiplexer

global.ServerGame = new JS.Class(Game, {
	setup: function () {
		this.callSuper();
		this.server = new StandardServer();
		this.server.pipeline = new PipelineMultiplexer();
	}
});
