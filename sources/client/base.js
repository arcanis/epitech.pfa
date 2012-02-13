//!provides:Client
// 
//!requires:JS.Class
// 
//!uses:Engine.Scene
//!uses:Input.Recepter
//!uses:Output.Emitter
//!uses:Plugin

global.Client = new JS.Class( 'Client', {
	
	initialize : function ( ) {
		
		this.input = new Input.Recepter( );
		
		this.output = new Output.Emitter( );
		
		this.engine = new Engine.Scene( );
		
		Plugin.plug( this );
		
	}
	
} );
