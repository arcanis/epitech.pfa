/**
 * @author Maël Nison
 */

//!requires:Pipeline.Event
//!provides:Pipeline.Event.Disconnection
//!requires:Pipeline.Event.Base
// 
//!requires:JS.Class

/**
 * @class
 * 
 * This event class is fired after that the transaction is closed.
 */

Pipeline.Event.Disconnection = new JS.Class('Pipeline.Event.Disconnection', Pipeline.Event.Base, {
	
	/**
	 * @name pipeline
	 * @memberof Pipeline.Event.Disconnection#
	 * @const
	 * 
	 * @description
	 * 
	 * Hold a pointer to the related pipeline.
	 */
	
});
