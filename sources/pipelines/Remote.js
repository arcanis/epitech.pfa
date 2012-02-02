//!requires:Pipeline
//!provides:Pipeline.Remote
//!requires:Pipeline.Base
//
//!requires:JS.Class
// 
//!uses:Pipeline.Event.Command

Pipeline.Remote = new JS.Class('Pipeline.Remote', Pipeline.Base, {
	
	extend : {
		
		create : function ( host ) {
			
			var socket = io.connect( host );
			
			var pipeline = new Pipeline.Remote( socket );
			
			socket.on( 'connect', function ( ) { pipeline.method( 'finalize' ); } );
			
			return pipeline;
			
		}
		
	},
	
	initialize: function ( socket ) {
		
		this.socket = socket;
		
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
	
	finalize : function ( ) {
		
		var connectionEvent = new Pipeline.Event.Connection( );
		connectionEvent.pipeline = this;
		this.notifyObservers( connectionEvent );
		
	},
	
	send : function ( command, data, callback ) {
		
		this.socket.emit('event', {
			command : command,
			data : data
		}, callback);
		
	},
	
	close : function ( local ) {
		
		if ( this.socket ) {
			
			if ( ! local ) {
				
				this.socketNamespace.disconnect( );
				
			}
			
			this.socketNamespace = null;
			
		}
		
	}
	
});
