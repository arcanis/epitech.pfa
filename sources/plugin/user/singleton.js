//!requires:Plugin
//!provides:Plugin.User
// 
//!requires:JS.Singleton
//!requires:JS.Observable

Plugin.User = new JS.Singleton( 'Plugin.User', {
	
	include : [ JS.Observable ]
	
} );
