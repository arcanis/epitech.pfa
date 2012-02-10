//!requires:Network.Pipeline
//!provides:Network.Pipeline.Remote
// 
//!requires:JS.Class
// 
//!uses:Network.Event.Disconnection
//!uses:Network.Event.Message

//[1] http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript

Network.Pipeline.Remote = new JS.Class( 'Network.Pipeline.Remote', Network.Pipeline, {
	
	initialize : function ( siostream ) {
		
		// Generate a guid [1]
		this.id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, function ( c ) {
			var r = Math.random( ) * 16 | 0, v = c == 'x' ? r : ( r & 0x3 | 0x8 );
			return v.toString( 16 );
		} );
		
		this.siostream = siostream;
		
		siostream.on( 'data', function ( siodata ) {
			
			var messageEvent = new Network.Event.Message( this, siodata.command, siodata.data );
			this.notifyObservers( messageEvent );
			
		}.bind( this ) );
		
		siostream.on( 'disconnect', function ( ) {
			
			var disconnectionEvent = new Network.Event.Disconnection( this );
			this.notifyObservers( disconnectionEvent );
			
		}.bind( this ) );
		
	},
	
	send : function ( command, data ) {
		
		this.siostream.emit( 'data', {
			
			command : command,
			
			data : data || { }
			
		} );
		
	}
	
} );
