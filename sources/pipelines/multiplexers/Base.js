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
	
	include : [ JS.Observable ]
	
});
