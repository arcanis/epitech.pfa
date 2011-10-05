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
		for (var x in behavior)
			target.prototype[x] = behavior[x];
	}
	
};

if (typeof module !== 'undefined')
	module.export = TITANIA.ClassUtils;
