//!provides:Pipeline
//
//!requires:JS.Class
//
//!uses:JS.Hash
//!uses:Helpers.pure

/*
 * @class
 */

global.Pipeline = new JS.Class('Pipeline', {
	
	/*
	 * @constructor
	 */
	
	initialize: function ( ) {
		
		this.commands = new JS.Hash( );
		
		this.clients = [];
		
	},

	/*
	 * @param {String} command Commande à envoyer
	 * @param {Object} message Message de la commande
	 */
	
	sendCommand: function ( command, message ) {
		
		Helpers.pure( this, 'sendCommand' );
		
	},

	/*
	 * @param {String} command Commande reçue
	 * @param {Object} message Message de la commande
	 */
	
	receiveCommand: function ( command, message ) {
		
		if ( this.commands.hasKey( command ) ) {
			
			this.commands.get( command ).forEach(function ( fn ) {
				
				fn(message, command);
				
			});
			
		}
		
	},

	/*
	 * @param {String}   command  Commande affectée
	 * @param {Function} callback Fonction de rappel à ajouter
	 */
	
	suscribeCommand: function ( command, callback ) {
		
		if ( ! this.commands.hasKey( command ) ) {
			
			this.commands.store( command, new Array( callback ) );
			
		} else {
			
			this.commands.get( command ).push( callback );
			
		}
		
	},

	/*
	 * @param {String}   command Commande affectée
	 * @param {Function} fn      Fonction de rappel à retirer
	 */
	
	unsuscribeCommand: function ( command, callback ) {
		
		var commands = this.commands;
		
		if ( commands.hasKey( command ) ) {	
			
			var callbacks = commands.get( command ).filter(function ( fn ) {
				
				return fn !== callback;
				
			});
			
			if ( callbacks.length ) {
				
				commands.store( command, callbacks );
				
			} else {
				
				this.commands.remove( command );
				
			}
			
		}
		
	}
	
});
