//!requires:Server.Core
//!provides:Server.Core.Logs
// 
//!requires:JS.Singleton

/**
 * Plugin for Logs
 * @memberOf Server.Core
 */

Server.Core.Logs = new JS.Singleton('Server.Core.Logs', {
	
	observer : function ( e ) {
		
		if ( e.klass === Server.Event.Bootstrap ) {
			
			console.log( 'Server bootstraped !' );

		} else if (e.klass === Server.Event.NewConnection) {

			console.log( 'New connection !' );

		}
		
	},
	
	attachServer : function ( server ) {
		
		server.addObserver( this.method( 'observer' ) );
		
	}
	
});
