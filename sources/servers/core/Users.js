//!requires:Server.Core
//!provides:Server.Core.Users
// 
//!requires:JS.Singleton

/**
 * Plugin for Manage Users
 * @memberOf Server.Core
 */

Server.Core.Users = new JS.Singleton('Server.Core.Users', {
	
	observer : function ( e ) {
		
		if ( e.klass === Server.Event.NewConnection ) {
			
			console.log( 'Server bootstraped !' );
		}
		
	},
	
	attachServer : function ( server ) {
		
		server.addObserver( this.method( 'observer' ) );
		
	}
	
});
