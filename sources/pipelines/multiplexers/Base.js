/**
 * @author Maël Nison
 */

//!provides:Pipeline.Multiplexer
//!provides:Pipeline.Multiplexer.Base
// 
//!requires:JS.Class
//!requires:JS.Observable

/**
 * @class
 * 
 * A pipeline multiplexer is like a server : after being created, his
 * only role will be to accept (or deny) incoming connections.<br />
 * <br />
 * When a new connection is opened, a new Pipeline will be created.<br />
 * <br />
 * When one of the pipelines trigger an event, this event will also be
 * emitted by the pipeline multiplexer.<br />
 * 
 * @toc Pipeline.Multiplexer.Base
 * 
 * @mixes JS.Observable
 */

Pipeline.Multiplexer.Base = new JS.Class('Pipeline.Multiplexer.Base', {
	
	include : [ JS.Observable ],
	
	/**
	 * Send a message to every connected pipelines. This message will
	 * trigger a Pipeline.Event.Command for each pipeline, with its
	 * parameters set accordingly to arguments.<br />
	 * <br />
	 * The callbak is a function which could be called by the receivers,
	 * using the .aknowledge() method of the Command event.<br />
	 * <br />
	 * Please note that this method is pure inside Pipeline.Multiplexer.Base :
	 * every inheriting class must overwrite it.<br />
	 * 
	 * @member Pipeline.Multiplexer.Base#
	 * 
	 * @see Pipeline.Base#send
	 */
	
	send : function ( command, data, callback ) {
		
		Helper.pure( this, 'send' );
		
	}
	
});
