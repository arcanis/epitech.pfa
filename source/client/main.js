//!provides:Main
//!requires:JS.Singleton

var Main = new JS.Singleton({
	initialize: function () {
		console.log('Client-side');
	},
	exec: function () {
	}
});
