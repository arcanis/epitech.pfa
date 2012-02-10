//!requires:Client
//!provides:Client.Remote
// 
//!requires:JS.Class
// 
//!uses:Network.Client.Remote

Client.Remote = new JS.Class( 'Client.Remote', Client, {
	
	initialize : function ( host, port ) {
		
		this.network = new Network.Client.Remote( host, port );
		
		this.callSuper( );
		
	}
	
} );
