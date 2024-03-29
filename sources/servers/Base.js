//!requires:Server
//!provides:Server.Base
// 
//!requires:JS.Class
//!requires:JS.Observable
// 
//!requires:Logic.Apis
//!requires:Generator.Base
//!requires:Persistor.Volatile
// 
//!uses:Server.Core.Logger.Plugin
//!uses:Server.Core.Loader.Plugin
//!uses:Server.Core.Protocol.Plugin
//!uses:Server.Core.Player.Plugin
// 
//!uses:Server.Event.State.Bootstrap

Server.Base = new JS.Class('Server.Base', {
	
	include : JS.Observable,
	
	initialize : function ( ) {
		
		this.multiplexer = null;
		
		this.generator = new Generator.Base( );
		
		this.persistor = new Persistor.Volatile( );
		
		this.logic = new Logic.Apis( );
		
	},
	
	bootstrap : function ( ) {
		
		this.plug( Server.Core.Logger.Plugin   );
		this.plug( Server.Core.Loader.Plugin   );
		this.plug( Server.Core.Protocol.Plugin );
		this.plug( Server.Core.Player.Plugin   );
		
		var event = new Server.Event.State.Bootstrap( );
		this.notifyObservers( event );
		
	},
	
	plug : function ( plugin ) {
		
		plugin.attachServer( this );
		
	}
	
});
