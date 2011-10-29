//!provides:Main
// 
//!requires:JS.Singleton

var Main = new JS.Singleton({
	node: function () {
	},
	
	browser: function () {
	},
	
	initialize: function () {
		if (typeof(process) !== undefined)
			return this.node();
		if (typeof(window) !== undefined)
			return this.browser();
		return null;
	}
});
