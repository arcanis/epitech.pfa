//!requires:Plugin.User
//!provides:Plugin.User.load
// 
//!uses:Client
//!uses:Server
// 
//!uses:Plugin.User.Client.Listener
//!uses:Plugin.User.Server.Listener

Plugin.User.load = function ( manager ) {
	
	manager.register( Client, Plugin.User.Server.Listener );
	
	manager.register( Server, Plugin.User.Server.Listener );
	
};
