//!requires:Pipeline
//!provides:Pipeline.Local
//!requires:Pipeline.Base
//
//!requires:JS.Class

/**
 * @class
 */

Pipeline.Local = new JS.Class('Pipeline.Local', Pipeline.Base, {
	
	/**
	 * @constructor
	 */
	
	initialize: function ( ) {
		
		this.callSuper( );
		
	},
	
	/**
	 * @param {LocalPipeline} client Pipeline client avec lequel communiquer
	 */
	
	connect: function ( multiplexer ) {
		
		this.multiplexer = multiplexer;
		
	},
	
	/**
	 * @param {String} command La command a envoyer
	 * @param {Object} message Data a envoyer
	 */
	
	send: function ( command, message ) {
		
		if ( typeof ( this.referent ) !== 'undefined' ) {
			
			this.multiplexer.trigger( command, message );
			
		} else {
			
			throw "LocalPipeline Class: sendCommand method: referent doesn't set";
			
		}
		
	}
	
});
