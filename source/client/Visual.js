//!provides:APP.Visual
//!requires:APP
//!requires:JS.Updatable

global.APP.Visual = new JS.Class({
	include: JS.Updatable,
	
	initialize: function (parent) {
		this.setUpdatableParent(parent);
	}
});
