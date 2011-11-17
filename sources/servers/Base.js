//!requires:Server
//!provides:Server.Base
// 
//!requires:JS.Class

Server.Base = new JS.Class('Server.Base', {
	
	initialize: function () {
		
		this.callSuper();
		
		this.multiplexer = null;
		
		this.generator = new Generator.Flat();
		
		this.persistor = new Persistor.Volatile();
		
		this.logic = null;
		
	}
	
});
