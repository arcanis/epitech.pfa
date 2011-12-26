/**
 * @author Maël Nison
 */

//!requires:Pipeline.Event
//!provides:Pipeline.Event.Command
//!requires:Pipeline.Event.Base
// 
//!requires:JS.Class

/**
 * @class
 * 
 * This event class is fired every time a pipeline receive data.
 */

Pipeline.Event.Command = new JS.Class('Pipeline.Event.Command', Pipeline.Event.Base, {
	
	initialize : function ( aknowledgement ) {
		
		this.aknowledge = aknowledgement || function ( ) { };
		
	}
	
	/**
	 * @name aknowledge
	 * @memberof Pipeline.Event.Command#
	 * @function
	 * 
	 * @description
	 * 
	 * If the sender has specified an aknowledgement callback
	 * function, calling this method will try to call it with
	 * the exact same arguments.<br />
	 * <br />
	 * Otherelse, doesn't do anything.<br />
	 */
	
	/**
	 * @name pipeline
	 * @memberof Pipeline.Event.Command#
	 * @const
	 * 
	 * @description
	 * 
	 * Hold a pointer to the related pipeline.
	 */
	
	/**
	 * @name command
	 * @memberof Pipeline.Event.Command#
	 * @const
	 * 
	 * @description
	 * 
	 * Hold the command name.
	 */
	
	/**
	 * @name message
	 * @memberof Pipeline.Event.Command#
	 * @const
	 * 
	 * @description
	 * 
	 * Hold the event data object.
	 */
	
});
