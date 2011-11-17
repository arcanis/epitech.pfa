//!requires:Client
//!provides:Client.Local
//!requires:Client.Base
// 
//!requires:JS.Class
// 
//!uses:Pipeline.Local

Client.Local = new JS.Class('Client.Local', Client, {
	
	initialize: function (server) {
		
		this.callSuper();
		
		this.pipeline = Pipeline.Local.connect(server);
		
	}
	
});
