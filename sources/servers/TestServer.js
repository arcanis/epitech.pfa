//!provides:TestServer
// 
//!requires:JS.Class
//!requires:Server
//!requires:Pluggable
//!requires:Helpers.Point
//
//!uses:FlatGenerator
//!uses:VolatilePersistor
// uses:Logic

global.TestServer = new JS.Class(Server, {
	include: Pluggable,
	
	setup: function () {
	  this.generator = new FlatGenerator();
	  var pos = new Helpers.Point(0, 0, 0);
	  console.log("TestServer");
	  console.log(this.generator.generateChunk(pos));
	  this.persistor = new VolatilePersistor();
//	this.logic = new Logic();
	}
});
