//!requires:Pipeline
//!provides:Pipeline.Remote
//!requires:Pipeline.Base
//
//!requires:JS.Class
// 
//!uses:Pipeline.Event.Command

Pipeline.Remote = new JS.Class('Pipeline.Remote', Pipeline.Base, {
	
	initialize: function ( host, port ) {
		
		if ( arguments[ 0 ] instanceof io.Socket ) {
			
			this.socket = arguments[ 0 ];
			
		} else {
			
			this.socket = new io.Socket( host, { port : port || 1234 } );
			this.socket.connect( );
			
		}
		
		this.socket.on( 'connect', function ( ) {
			
			var connectionEvent = new Pipeline.Event.Connection( );
			connectionEvent.pipeline = this;
			this.notifyObservers( connectionEvent );
			
		}.bind( this ));
		
		this.socket.on( 'event', function ( data, callback ) {
			
			var commandEvent = new Pipeline.Event.Command( callback );
			commandEvent.pipeline = this;
			commandEvent.command = data.command;
			commandEvent.data = data.data;
			this.notifyObservers( commandEvent );
			
		}.bind( this ));
		
		this.socket.on( 'disconnect', function ( ) {
			
			var disconnectionEvent = new Pipeline.Event.Disconnection( );
			disconnectionEvent.pipeline = this;
			this.notifyObservers( disconnectionEvent );
			
		}.bind( this ));
		
	},
	
	send: function ( command, data, callback ) {
		
		this.socket.emit('event', {
			command : command,
			data : data
		}, callback);
		
	},
	
	close: function ( local ) {
		
		if ( this.socket ) {
			
			if ( ! local ) {
				this.socket.close( );
			}
			
			this.socket = null;
			
		}
		
	}
	
});
