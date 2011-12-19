//!requires:Pipeline
//!provides:Pipeline.Base
// 
//!requires:JS.Class
//
//!uses:JS.Hash
//!uses:Pipeline.Broadcast

/**
 * Basic class of Pipeline
 * @memberOf Pipeline
 *
 * @constructor
 */

Pipeline.Base = new JS.Class('Pipeline.Base', {
	
	initialize : function ( ) {
		
		this.multiplexer = null;
		
		this.broadcast = new Pipeline.Broadcast( this );
		
		this.commands = new JS.Hash( );
		
		this.clients = [ ];
		
	},

	/**
	 * Give the message to the command functions registered
	 * 
	 * @param {String} command The command name
	 * @param {Object} message The object message
	 * @memberOf Pipeline.Base#	
	 */

	trigger : function ( command, message ) {
		
		if ( this.commands.hasKey( command ) ) {
			
			this.commands.get( command ).forEach(function ( fn ) {
				
				fn( message, command );
				
			});
			
		}

	},

	/**
	 * @param {String} command The command name
	 * @param {Object} message The object message
	 * @memberOf Pipeline.Base#	
	 */

	send : function ( command, message ) {
	    
		Helper.pure( this, 'sendCommand' );
	    
	},
	
	/**
	 * Register a callback for a command
	 *
	 * @param {String} command The command name
	 * @param {function} callback the callback to execute when receive the command
	 * @memberOf Pipeline.Base#	
	 */

	register : function ( command, callback ) {
		
		if ( ! this.commands.hasKey( command ) ) {
			
			this.commands.store( command, new Array( callback ) );
			
		} else {
			
			this.commands.get( command ).push( callback );
			
		}
		
	},
	
	/**
	 * Unregister a callback for a command
	 *
	 * @param {String} command The command name
	 * @param {function} callback the callback to execute when receive the command
	 * @memberOf Pipeline.Base#	
	 */

	unregister : function ( command, callback ) {
		
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
		
	},
	
	close : function ( command, callback ) {
		
	}
	
});