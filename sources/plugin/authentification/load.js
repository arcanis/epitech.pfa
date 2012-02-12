//!requires:Plugin.Authentification
//!provides:Plugin.Authentification.load
// 
//!uses:Client
//!uses:Server
// 
//!uses:Plugin.Authentification.Client.Listener
//!uses:Plugin.Authentification.Server.Listener

Plugin.Authentification.load = function ( manager ) {
	
	manager.register( Client, Plugin.Authentification.Client.Listener );
	
	manager.register( Server, Plugin.Authentification.Server.Listener );
	
};
