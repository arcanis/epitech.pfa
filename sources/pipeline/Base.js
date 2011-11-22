//!requires:Pipeline
//!provides:Pipeline.Base
// 
//!requires:JS.Class
//
//!uses:JS.Hash
//!uses:Helpers.pure
//!uses:Pipeline.Broadcast

Pipeline.Base = new JS.Class('Pipeline.Base', Pipeline.Object, {

	initialize: function ( ) {
		
		this.multiplexer = null;

		this.broadcast = new Broadcast(this);

		this.commands = new JS.Hash( );
		
		this.clients = [];

	},

    trigger: function ( command, message ) {

		if ( this.commands.hasKey( command ) ) {
			
			this.commands.get( command ).forEach(function ( fn ) {
				
				fn(message, command);
				
			});
			
		}

    },

    send: function ( command, message ) {

	    Helpers.pure( this, 'sendCommand' );

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

	},

    close: function ( command, callback ) {



	}
});