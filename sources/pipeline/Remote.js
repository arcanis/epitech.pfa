//!requires:Pipeline
//!provides:Pipeline.Remote
//!requires:Pipeline.Base
//
//!requires:JS.Class

/**
 * Class for connect to a remote server
 * @extends Pipeline.Base
 * @memberof Pipeline
 *
 * @constructor
 *
 * @param {String} host IP or domain name of the server
 */

Pipeline.Remote = new JS.Class('Pipeline.Remote', Pipeline.Base, {
		
	initialize: function ( host ) {
		
		this.callSuper( );

		this.socket = new io.Socket( host, { port : 1234 } );
		this.socket.connect( );
		
		var that = this;
		this.socket.on( 'message', function ( data ) {

			var object = JSON.parse( data );
			that.receiveCommand( object.command, object.message );

		});
		
	},
	
	/**
	 * Send a command to the remote server
	 * 
	 * @param {String} command La command a envoyer
	 * @param {Object} message Data a envoyer
	 * @memberof Pipeline.Remote#
	 */
	
	send: function ( command, message ) {
		
		this.socket.send( JSON.stringify( { command : command, message : message } ) );
		
		this.callSuper( command, message );
		
	},
	
	/**
	 * Close the connection with the remote server
	 * @memberof Pipeline.Remote#
	 */
	
	close: function ( ) {
		
		this.socket.close( );
		
	}
	
});
