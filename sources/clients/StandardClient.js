//!provides:StandardClient
// 
//!requires:JS.Class
//!requires:Client
//!requires:Pluggable
// 
//!uses:View

global.StandardClient = new JS.Class(Client, {
	include: Pluggable,
	
	setup: function () {
		this.callSuper();
		this.view = new View();
	}
});
