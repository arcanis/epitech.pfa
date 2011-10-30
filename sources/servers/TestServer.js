//!provides:TestServer
// 
//!requires:JS.Class
//!requires:Server
//!requires:Pluggable
// 
//!uses:FlatGenerator
//!uses:VolatilePersistor
//!uses:Logic

global.TestServer = new JS.Class(Server, {
	include: Pluggable,
	
	setup: function () {
		this.generator = new FlatGenerator();
		this.persistor = new VolatilePersistor();
		this.logic = new Logic();
	}
});
