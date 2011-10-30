//!provides:Client
// 
//!requires:JS.Class
//!requires:Pluggable

global.Client = new JS.Class({
	include: Pluggable,
	
	setup: function () {
		this.pipeline = null;
		this.view = null;
	}
});
