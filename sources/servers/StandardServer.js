//!provides:StandardServer
// 
//!requires:JS.Class
//!requires:Server
//!requires:Pluggable
//!requires:Helpers
//!requires:Helpers.Coord3
// 
//!uses:Helpers.getStandardPersistor
//!uses:StandardGenerator
//!uses:FlatGenerator
// uses:Logic

global.StandardServer = new JS.Class(Server, {
	include: Pluggable,
	
	setup: function () {
		this.generator = new StandardGenerator();
		this.generator = new FlatGenerator();
		var pos = new Helpers.Coord3(0, 0, 0);
		console.log("StandardServer !");
		console.log(this.generator.generateChunk(pos));
		this.persistor = new Helpers.getStandardPersistor();
//		this.logic = new Logic();
	}
});
