//!provides:APP.Node
//!requires:APP
//!requires:JS.Class

global.APP.Node = new JS.Class({
	include: JS.Observable,
	
	initialize: function (type) {
		this.type = type;
	}
});
