//!requires:Output
//!provides:Output.Message
// 
//!requires:JS.Class

Output.Message = new JS.Class( 'Output.Message', {
	
	initialize : function ( text, parameters ) {
		
		this.text = text;
		
		this.parameters = parameters;
		
	}
	
} );
