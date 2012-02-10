//!requires:Plugin
//!provides:Plugin.Authentification
// 
//!requires:JS.Singleton
//!requires:JS.Observable

Plugin.Authentification = new JS.Singleton( 'Plugin.Authentification', {
	
	include : [ JS.Observable ]
	
} );
