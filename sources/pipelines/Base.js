/**
 * @author Maël Nison
 */

//!requires:Pipeline
//!provides:Pipeline.Base
// 
//!requires:JS.Class
//!requires:JS.Observable
//
//!uses:Helper.pure

/**
 * @class
 * 
 * A pipeline is basically a socket : it allows to abstract
 * efficiently the transactions between two hosts.<br />
 * <br />
 * As almost every component of this project, we're using an
 * observer pattern in order to listen the messages coming
 * from the pipeline.<br />
 * <br />
 * Three kinds of event can be emitted :<br />
 * <br />
 * - Pipeline.Event.Connection<br />
 * - Pipeline.Event.Disconnection<br />
 * - Pipeline.Event.Command<br />
 * 
 * @toc Pipeline.Base
 * 
 * @mixes JS.Observable
 * 
 * @see Pipeline.Event.Connection
 * @see Pipeline.Event.Disconnection
 * @see Pipeline.Event.Command
 */

Pipeline.Base = new JS.Class('Pipeline.Base', {
	
	include : [ JS.Observable ],
	
	/**
	 * @name broadcast
	 * @memberof Pipeline.Base#
	 * @see Pipeline.Broadcast.Base
	 * 
	 * @description
	 * 
	 * Hold a reference toward the pipeline's broadcast
	 * instance.
	 */
	
	/**
	 * Start the connection. It should be called when a
	 * pipeline is manually opened.<br />
	 * <br />
	 * Please note that this method is pure inside
	 * Pipeline.Broadcast.Base : every inheriting class must
	 * overwrite it.<br />
	 * 
	 * @memberof Pipeline.Base#
	 * 
	 * @see Pipeline.Event.Connection
	 */
	
	finalize : function ( ) {
		
		Helper.pure( this, 'finalize' );
		
	},
	
	/**
	 * Send an message to the receiver. This message will
	 * trigger a Pipeline.Event.Command event, with its
	 * parameters set accordingly.<br />
	 * <br />
	 * The callback is a function which could be called by
	 * the receiver, using the .aknowledge() method of the
	 * Command event.<br />
	 * <br />
	 * Please note that this method is pure inside
	 * Pipeline.Broadcast.Base : every inheriting class must
	 * overwrite it.<br />
	 * 
	 * @memberof Pipeline.Base#
	 * 
	 * @see Pipeline.Event.Command
	 * 
	 * @param command {String} Command name.
	 * @param message {Mixed} Command data.
	 * @param [callback] {Function} Aknowledgement callback.
	 */
	
    send : function ( command, message, callback ) {
	    
	    Helper.pure( this, 'send' );
	    
    },
	
	/**
	 * Terminate the transaction.
	 * <br />
	 * Please note that this method is pure inside
	 * Pipeline.Broadcast.Base : every inheriting class must
	 * overwrite it.<br />
	 * 
	 * @memberof Pipeline.Base#
	 * 
	 * @see Pipeline.Event.Disconnection
	 */
	
	close : function ( ) {
		
		Helper.pure( this, 'close' );
		
	}
	
});