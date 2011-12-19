//!provides:Pipeline.Multiplexer
//!provides:Pipeline.Multiplexer.Base
// 
//!requires:JS.Class
//
//!uses:JS.Hash
//!uses:Pipeline.Base

/**
 * Basic class of Pipeline.Multiplexer
 * @memberOf Pipeline.Multiplexer
 *
 * @constructor
 */

Pipeline.Multiplexer.Base = new JS.Class('Pipeline.Multiplexer.Base', {
	
	initialize : function ( ) {
		
		this.commands = new JS.Hash( );
		
	},

	/**
	 * Give the message to the command functions registered
	 * 
	 * @param {Pipeline.Base} pipeline pipeline qui send
	 * @param {String} command La command qui est renvoyé
	 * @param {Object} message Data recue
	 * @memberOf Pipeline.Multiplexer.Base#	
	 */	
	
	trigger : function ( pipeline, command, message ) {
		
		if ( this.commands.hasKey( command ) ) {
			
			var listCommands = this.commands.get( command );
			
			for ( var i in listCommands ) {
				
				if ( typeof ( listCommands[ i ] ) !== 'undefined' )
				{
					listCommands[ i ]( pipeline, message );
				}
				
			}
			
		}
		
	},

	/**
	 * Register a callback for a command
	 *
	 * @param {String} command The command name
	 * @param {function} callback the callback to execute when receive the command
	 * @memberOf Pipeline.Multiplexer.Base#	
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
	 * @memberOf Pipeline.Multiplexer.Base#	
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

	}

});