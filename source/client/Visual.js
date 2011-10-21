//!provides:APP.Visual
//!requires:APP
//!requires:JS.Updatable

/**
 * @class APP.Visual
 */

global.APP.Visual = new JS.Class({
	include: JS.Updatable,
	
	/**
	 * When the Visual element is created, its updatable parent is set and
	 * the element is marked as outdated.
	 * 
	 * @constructor
	 * @param {JS.Updatable} parent Updatable parent.
	 */
	
	initialize: function (parent) {
		this.setUpdatableParent(parent);
		this.markAsOutdated();
	}
});
