//!requires:Pipeline
//!provides:Pipeline.Remote
//!requires:Pipeline.Base
//
//!requires:JS.Class

/*
 * @class
 */

Pipeline.Remote = new JS.Class('Pipeline.Remote', Pipeline.Base, {
	
	/*
	 * @constructor
	 * 
	 * @param {String} host IP ou nom de domaine du serveur a ce connecter
	 * 
	 * @todo Ajouter le protocol créé
	 * 
	 */
	
	initialize: function ( host ) {
		
		this.callSuper( );
		this.socket = new io.Socket( host, { port : 1234 } );
		this.socket.connect( );
		
		var remote = this;
		this.socket.on( 'message', function ( data ) {
			var object = JSON.parse( data );
			remote.receiveCommand( object.command, object.message );
		});
		
	},
	
	/*
	 * @function
	 * 
	 * @param {String} command La command a envoyer
	 * @param {Object} message Data a envoyer
	 */
	
	send: function ( command, message ) {
		
		this.socket.send( JSON.stringify( { command : command, message : message } ) );
		
		this.callSuper( command, message );
		
	},
	
	/*
	 * @function
	 * 
	 * Close socket
	 */
	
	close: function ( ) {
		
		this.socket.close( );
		
	}
	
});