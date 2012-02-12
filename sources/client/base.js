//!provides:Client
// 
//!requires:JS.Class
// 
//!uses:Output.Emitter
//!uses:Plugin

global.Client = new JS.Class( 'Client', {
	
	initialize : function ( ) {
		
		this.output = new Output.Emitter( );
		
		Plugin.plug( this );
		
	}
	
} );
