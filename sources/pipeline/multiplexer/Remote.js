//!requires:Pipeline.Multiplexer
//!provides:Pipeline.Multiplexer.Remote
//!requires:Pipeline.Multiplexer.Base
//
//!requires:JS.Class

/*
 * @class
 */

Pipeline.Multiplexer.Remote = new JS.Class('Pipeline.Multiplexer.Remote', Pipeline.Multiplexer.Base, {
	
	/*
	 * @constructor
	 * 
	 * @param {String} port port ou le server doit ecouter
	 */
	
	initialize : function ( port) {
		
		this.callSuper();
		
		this.sockets = JS.Hash( );
		this.connectedClient = 0;
		this.pipeIDs = 0;
		
		var that = this;
		var sockets = this.sockets;
		var connectedClient = this.connectedClient;
		
		this.io = require( 'socket.io' ).listen( port );
		
		this.io.sockets.on('connection', function ( socket ) {
			
			++ that.connectedClient;
			
			that.sockets.store( that.pipeIDs, socket );
			
			socket.on('messages', function ( obj ) {
				var object = JSON.parse( obj );
				this.trigger( obj.command, obj.message );
			});
			
			socket.on('disconnect', function ( ) {
				-- that.connectedClient;
				that.sockets.remove( that.pipeIDs );
			});
			
			++ that.pipeIDs;
			
		});
		
	}
	
});
