//!requires:Output
//!provides:Output.Emitter
// 
//!requires:JS.Class
//!requires:JS.Observable
// 
//!uses:Output.Event.Append
//!uses:Output.Event.Clear
//!uses:Output.Event.Drop
//!uses:Output.Message

Output.Emitter = new JS.Class( 'Output.Emitter', {
	
	include : [ JS.Observable ],
	
	initialize : function ( ) {
		
		this.messages = [ ];
		
	},
	
	drop : function ( ) {
		
		if ( this.messages.length ) {
			
			this.message.shift( );
			
			var dropEvent = new Output.Event.Drop( );
			this.notifyObservers( dropEvent );
			
		}
		
	},
	
	clear : function ( ) {
		
		if ( this.messages.length ) {
			
			this.messages.length = 0;
			
			var clearEvent = new Output.Event.Clear( );
			this.notifyObservers( clearEvent );
			
		}
		
	},
	
	append : function ( text, parameters ) {
		
		var message = new Output.Message( text, parameters );
		
		this.messages.push( message );
		
		var messageEvent = new Output.Event.Append( message );
		this.notifyObservers( messageEvent );
		
	}
	
} );
