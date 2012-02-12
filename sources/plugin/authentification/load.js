//!requires:Plugin.Authentification
//!provides:Plugin.Authentification.load
// 
//!uses:Plugin.Authentification.Server.Listener
//!uses:Plugin.Authentification.Client.Listener
// 
//!uses:Server
//!uses:Client

Plugin.Authentification.load = function ( manager ) {
	
	manager.register( Server, Plugin.Authentification.Server.Listener );
	
	manager.register( Client, Plugin.Authentification.Client.Listener );
	
};
