//!requires:Plugin.User
//!provides:Plugin.User.load
// 
//!uses:Client
//!uses:Plugin.User.Client.Listener
//!uses:Plugin.User.Server.Listener
//!uses:Server

Plugin.User.load = function ( manager ) {
	
	manager.register( Client, Plugin.User.Client.Listener );
	
	manager.register( Server, Plugin.User.Server.Listener );
	
};
