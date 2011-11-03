//!provides:Server
// 
//!requires:JS.Class
//!requires:Pluggable

global.Server = new JS.Class({
	include: Pluggable,
	
	setup: function () {
		this.pipeline = null;
		this.generator = null;
		this.persistor = null;
		this.logic = null;
	}
});
