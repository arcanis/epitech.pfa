//!requires:Client
//!provides:Client.Remote
//!requires:Client.Base
// 
//!requires:JS.Class
// 
//!uses:Pipeline.Remote

Client.Remote = new JS.Class('Client.Remote', Client.Base, {
	
	initialize : function ( host ) {
		
		this.callSuper( );
		
		this.pipeline = new Pipeline.Remote.create( host );
		
	}
	
});
