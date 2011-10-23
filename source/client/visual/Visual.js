//!provides:APP.Visual
//!requires:APP
//!requires:JS.Class
//!requires:JS.Updatable

global.APP.Visual = new JS.Class({
	include: [ JS.Updatable, JS.Observable ],
	
	initialize: function (parent) {
		this.setUpdatableParent(parent);
		this.markAsOutdated();
	},
	
	update: function () {
		this.notifyObservers('update', {
			mesh : this.threeMesh
		});
	}
});
