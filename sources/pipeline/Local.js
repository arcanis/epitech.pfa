//!requires:Pipeline
//!provides:Pipeline.Local
//!requires:Pipeline.Base
//
//!requires:JS.Class

/**
 * Class for connect to a local server
 * @extends Pipeline.Base
 * @memberOf Pipeline
 *
 * @constructor
 */

Pipeline.Local = new JS.Class('Pipeline.Local', Pipeline.Base, {
	
	initialize: function ( ) {
		
		this.callSuper( );
		
	},
	
	/**
	 * Connect to the local server
	 *
	 * @param {Pipeline.Multiplexer.Local} multiplexer Pipeline client avec lequel communiquer
	 * @memberOf Pipeline.Local#
	 */
	
	connect: function ( multiplexer ) {
		
		this.multiplexer = multiplexer;
		
	},
	
	/**
	 * Send command to the server
	 *
	 * @param {String} command La command a envoyer
	 * @param {Object} message Data a envoyer
	 * @memberOf Pipeline.Local#
	 */
	
	send: function ( command, message ) {
		
		if ( typeof ( this.multiplexer ) !== 'undefined' ) {
			
		    this.multiplexer.trigger( this, command, message );
			
		} else {
			
			throw "Pipeline.Local: send: multiplexer doesn't set";
			
		}
		
	}
	
});
