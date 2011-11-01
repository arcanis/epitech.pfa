//!provides:Main
// 
//!requires:JS.Singleton

var Main = new JS.Singleton({
	node: function () {
		console.log("Node code running.");
	},
	
	browser: function () {
		console.log("Browser code running.");
	},
	
	initialize: function () {
		if (typeof(process) !== 'undefined') {
			return this.node();
		}
		
		if (typeof(window) !== 'undefined') {
			return this.browser();
		}
		
		return null;
	}
});
