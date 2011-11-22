//!requires:Pipeline.Multiplexer
//!provides:Pipeline.Multiplexer.Base
// 
//!requires:JS.Class
//
//!uses:JS.Hash
//!uses:Helpers.pure
//!uses:Pipeline.Base

Pipeline.Multiplexer.Base = new JS.Class('Pipeline.Multiplexer.Base', Pipeline.Multiplexer.Object, {

		/*
		 * @constructor
		 * 
		 * @param {Number} port Le numero du port a ecouter
		 */

		initialize: function (port) {

			this.commands = new JS.Hash( );

		},

		/*
		 * @function
		 * 
		 * @param {Pipeline.Base} pipeline pipeline qui send
		 * @param {String} command La command qui est renvoyé
		 * @param {Object} message Data recue
		 */

		trigger: function ( pipeline, command, message ) {

			if (this.commands.hasKey(command)) {

				var listCommands = this.commands.get(command);

				for (var i in listCommands) {

					if (typeof(listCommands[i]) !== 'undefined')
						listCommands[i](pipeline, message);

				}

			}

		},

    register: function ( command, callback ) {

	    if ( ! this.commands.hasKey( command ) ) {
			
		    this.commands.store( command, new Array( callback ) );
			
	    } else {
			
		    this.commands.get( command ).push( callback );
			
		}

	},

    unregister: function ( command, callback ) {

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