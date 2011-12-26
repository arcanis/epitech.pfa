/**
 * @author Maël Nison
 */

//!requires:Pipeline.Event
//!provides:Pipeline.Event.Connection
//!requires:Pipeline.Event.Base
// 
//!requires:JS.Class

/**
 * @class
 * 
 * This event class is fired when a pipeline transaction is ready
 * to use.
 */

Pipeline.Event.Connection = new JS.Class('Pipeline.Event.Connection', Pipeline.Event.Base, {
	
	/**
	 * @name pipeline
	 * @memberof Pipeline.Event.Connection#
	 * @const
	 * 
	 * @description
	 * 
	 * Hold a pointer to the related pipeline.
	 */
	
});
