//!provides:Main
// 
//!requires:JS.Singleton

var Main = new JS.Singleton({
	node: function () {
	},
	
	browser: function () {
	},
	
	exec: function () {
		if (process)
			return this.node();
		if (window)
			return this.browser();
		return null;
	}
});
