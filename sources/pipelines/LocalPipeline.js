//!provides:LocalPipeline
//
//!requires:JS.Class
//!requires:Pipeline

/*
 * @class
 */

global.LocalPipeline = new JS.Class('LocalPipeline', Pipeline, {
	
	/*
	 * @constructor
	 */
	
	initialize: function ( ) {
		
		this.callSuper( );
		
	},
	
	/*
	 * @param {LocalPipeline} client Pipeline client avec lequel communiquer
	 */
	
	link: function ( client ) {
		
		this.clients.push(referent;
		
	},
	
	/*
	 * @param {String} command La command a envoyer
	 * @param {Object} message Data a envoyer
	 */
	
	sendCommand: function ( command, message ) {
		
		if ( typeof (this.referent) !== 'undefined' ) {
			
			this.referent.receiveCommand( command, message );
			
		} else {
			
			throw "LocalPipeline Class: sendCommand method: referent doesn't set";
			
		}
		
	}
	
});
