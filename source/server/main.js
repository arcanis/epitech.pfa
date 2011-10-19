//!provides:Main
//!requires:JS.Singleton
//!requires:APP
//!requires:APP.Universe

global.Main = new JS.Singleton({
	initialize : function () {
		console.log('Server-side');
		var universe = new APP.Universe();
	}
});
