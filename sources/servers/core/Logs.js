//!requires:Server.Core
//!provides:Server.Core.Logs
// 
//!requires:JS.Singleton

Server.Core.Logs = new JS.Singleton('Server.Core.Logs', {
	
	observer : function ( e ) {
		
		if ( e.klass === Server.Event.Bootstrap ) {
			
			console.log( 'Server bootstraped !' );
		}
		
	},
	
	attachServer : function ( server ) {
		
		server.addObserver( this.method( 'observer' ) );
		
	}
	
});
