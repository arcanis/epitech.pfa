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
		
		if ( typeof ( this.multiplexer ) !== 'undefined' ) {
			
		    this.multiplexer.trigger( this, command, message );
			
		} else {
			
			throw "Pipeline.Local: send: multiplexer doesn't set";
			
		}
		
	}
	
});
