/**
 * @author Maël Nison
 */

/**
 * @namespace TITANIA.ClassUtils
 */

TITANIA.ClassUtils = {
	
	/**
	 * Extend a function with a parent class.
	 * 
	 * Parent constructor is not called (you will have to call it manually).
	 * 
	 * A function can have only one parent.
	 * 
	 * @param {Function} target Function to extend.
	 * @param {Function} parent Parent function.
	 */
	
	inherit : function (target, parent) {
		var wrapper = function () { };
		wrapper.prototype = parent.prototype;
		target.prototype = new wrapper();
		target.prototype.constructor = target;
	},
	
	/**
	 * Extend a function with a mixin.
	 * 
	 * Multiple behaviors can be applied on the same function.
	 * 
	 * @param {Function} target   Function to extend.
	 * @param {Object}   behavior Mixin behavior to apply.
	 */
	
	mix : function (target, behavior) {
		this.merge(target.prototype, behavior);
	},
	
	/**
	 * Merge two objects together.
	 * 
	 * After calling this function, the first object will have every properties
	 * of the second.
	 * 
	 * @param {Object} target Object to extend.
	 * @param {Object} source Source object.
	 */
	
	merge : function (target, source) {
		for (var x in source)
			target[x] = source[x];
	}
	
};

if (typeof module !== 'undefined')
	module.export = TITANIA.ClassUtils;
