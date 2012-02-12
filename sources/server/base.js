//!provides:Server
// 
//!requires:JS.Class
// 
//!uses:Plugin
//!uses:Storage.adaptater

global.Server = new JS.Class( 'Server', {
	
	initialize : function ( ) {
		
		this.storage = new Storage.adaptater( );
		
		Plugin.plug( this );
		
	}
	
} );
