//!requires:Plugin.Authentification
//!provides:Plugin.Authentification.load
// 
//!uses:Plugin.Authentification.Server
//!uses:Plugin.Authentification.Client
// 
//!uses:Server
//!uses:Client

Plugin.Authentification.load = function ( manager ) {
	
	manager.register( Server, Plugin.Authentification.Server );
	
	manager.register( Client, Plugin.Authentification.Client );
	
};
