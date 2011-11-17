//!requires:Client
//!provides:Client.Base
// 
//!requires:JS.Class
// 
//!uses:View.Apis

global.Client = new JS.Class('Client', {
	
	initialize: function () {
		
		this.pipeline = null;
		
		this.view = new View.Apis();
		
	}
	
});
