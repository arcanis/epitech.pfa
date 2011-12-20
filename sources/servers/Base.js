//!requires:Server
//!provides:Server.Base
// 
//!requires:JS.Class
//!requires:JS.Observable
// 
//!requires:Logic.Apis
//!requires:Generator.Flat
//!requires:Persistor.Volatile
// 
//!uses:Server.Core.Logger.Plugin
//!uses:Server.Core.Loader.Plugin
// 
//!uses:Server.Event.Bootstrap

Server.Base = new JS.Class('Server.Base', {
	
	include : JS.Observable,
	
	initialize : function ( ) {
		
		this.multiplexer = null;
		
		this.generator = new Generator.Flat( );
		
		this.persistor = new Persistor.Volatile( );
		
		this.logic = new Logic.Apis( );
		
	},
	
	bootstrap : function ( ) {
		
		this.plug( Server.Core.Logger.Plugin );
		this.plug( Server.Core.Loader.Plugin );
		
		var event = new Server.Event.Bootstrap( );
		this.notifyObservers( event );
		
	},
	
	plug : function ( plugin ) {
		
		plugin.attachServer( this );
		
	}
	
});
