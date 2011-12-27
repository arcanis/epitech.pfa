//!requires:Pipeline
//!provides:Pipeline.Remote
//!requires:Pipeline.Base
//
//!requires:JS.Class
// 
//!uses:Pipeline.Event.Command

Pipeline.Remote = new JS.Class('Pipeline.Remote', Pipeline.Base, {
	
	initialize: function ( host ) {
		
		if ( typeof ( arguments[ 0 ] ) == 'object' ) {
			
			this.socketNamespace = arguments[ 0 ];
			
		} else {
			
			this.socketNamespace = io.connect( host, {
				'auto connect' : false,
				'reconnect' : false
			});
			
		}
		
		this.socketNamespace.on( 'connect', function ( ) {
			
			var connectionEvent = new Pipeline.Event.Connection( );
			connectionEvent.pipeline = this;
			this.notifyObservers( connectionEvent );
			
		}.bind( this ));
		
		this.socketNamespace.on( 'event', function ( data, callback ) {
			
			var commandEvent = new Pipeline.Event.Command( callback );
			commandEvent.pipeline = this;
			commandEvent.command = data.command;
			commandEvent.data = data.data;
			this.notifyObservers( commandEvent );
			
		}.bind( this ));
		
		this.socketNamespace.on( 'disconnect', function ( ) {
			
			var disconnectionEvent = new Pipeline.Event.Disconnection( );
			disconnectionEvent.pipeline = this;
			this.notifyObservers( disconnectionEvent );
			
		}.bind( this ));
		
	},
	
	finalize : function ( ) {
		
		this.socketNamespace.socket.connect( );
		
	},
	
	send : function ( command, data, callback ) {
		
		this.socketNamespace.emit('event', {
			command : command,
			data : data
		}, callback);
		
	},
	
	close : function ( local ) {
		
		if ( this.socketNamespace ) {
			
			if ( ! local ) {
				
				this.socketNamespace.disconnect( );
				
			}
			
			this.socketNamespace = null;
			
		}
		
	}
	
});
