//!requires:Server.Core
//!provides:Server.Core.Logs
// 
//!requires:JS.Singleton

Server.Core.Logs = new JS.Singleton('Server.Core.Logs', {
	
	observer : function ( e ) {
		
		switch ( e.klass ) {
			
		case Server.Event.Bootstrap:
			console.log( 'Server bootstraped !' );
			break;
			
		}
		
	},
	
	attachServer : function ( server ) {
		
		server.addObserver( this.method( 'observer' ) );
		
	}
	
});
