//!provides:Client
// 
//!requires:JS.Class
// 
//!uses:Engine.Scene
//!uses:Output.Emitter
//!uses:Plugin

global.Client = new JS.Class( 'Client', {
	
	initialize : function ( ) {
		
		this.output = new Output.Emitter( );
		
		this.engine = new Engine.Scene( );
		
		Plugin.plug( this );
		
	}
	
} );
