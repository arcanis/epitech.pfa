//!requires:Server
//!provides:Server.Local
//!requires:Server.Base
// 
//!requires:JS.Class

Server.Local = new JS.Class('Server.Local', Server.Base, {
	
	initialize: function () {
		
		this.callSuper();
		
		this.multiplexer = new PipelineMultiplexer.Local();
		
	}
	
});
