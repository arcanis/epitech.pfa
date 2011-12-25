/**
 * @author Maël Nison
 */

//!requires:Helper
//!provides:Helper.pure

/**
 * This function just throws an error.<br />
 * <br />
 * It should be used when you want to mark a function
 * as pure : every call to unimplemented child method
 * will result by a critical failure.<br />
 * 
 * @param instance {Mixed} Invalid object (should be 'this').
 * @param name {String} Name of the unimplemented method.
 */

Helper.pure = function ( instance, name ) {
	
	throw new Error( 'Call to unimplemented pure method \'' + name + '\' in ' + instance + '.' );
	
};
