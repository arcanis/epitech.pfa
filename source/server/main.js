//!provides:Main
//!requires:JS.Singleton

global.Main = new JS.Singleton({
	initialize : function () {
		console.log('Server-side');
	}
});
