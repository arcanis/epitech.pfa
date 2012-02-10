//!requires:Server
//!provides:Server.Remote
// 
//!requires:JS.Class
// 
//!uses:Network.Server.Remote

Server.Remote = new JS.Class( 'Server.Remote', Server, {
	
	initialize : function ( port ) {
		
		this.network = new Network.Server.Remote( port );
		
		this.callSuper( );
		
	}
	
} );
