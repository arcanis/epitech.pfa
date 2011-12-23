//!requires:Pipeline.Event
//!provides:Pipeline.Event.Command
//!requires:Pipeline.Event.Base
// 
//!requires:JS.Class

Pipeline.Event.Command = new JS.Class('Pipeline.Event.Command', Pipeline.Event.Base, {
	
	initialize : function ( aknowledgement ) {
		
		this.aknowledge = aknowledgement || function ( ) { };
		
	}
	
});
