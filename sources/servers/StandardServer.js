//!provides:StandardServer
// 
//!requires:JS.Class
//!requires:Server
//!requires:Pluggable
// 
//!uses:Helpers.getStandardPersistor
//!uses:StandardGenerator
//!uses:Logic

global.StandardServer = new JS.Class(Server, {
	include: Pluggable,
	
	setup: function () {
		this.generator = new StandardGenerator();
		this.persistor = new Helpers.getStandardPersistor();
		this.logic = new Logic();
	}
});
