//!requires:Server
//!provides:Server.Base
// 
//!requires:JS.Class
//!requires:JS.Observable
// 
//!requires:Generator.Flat
//!requires:Persistor.Volatile
// 
//!uses:Server.Core.Logs
// 
//!uses:Server.Event.Bootstrap

Server.Base = new JS.Class('Server.Base', {
	
	include : JS.Observable,
	
	initialize : function ( ) {
		
		this.multiplexer = null;
		
		this.generator = new Generator.Flat( );
		
		this.persistor = new Persistor.Volatile( );
		
		this.logic = null;
		
	},
	
	bootstrap : function ( ) {
		
		this.plug( Server.Core.Logs );
		
		var event = new Server.Event.Bootstrap( );
		this.notifyObservers( event );
		
		return ! event.canceled;
		
	},
	
	plug : function ( plugin ) {
		
		plugin.attachServer( this );
		
	}
	
});
