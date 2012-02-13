//!requires:Engine.Event
//!provides:Engine.Event.Cycle
// 
//!requires:JS.Class

Engine.Event.Cycle = new JS.Class( 'Engine.Event.Cycle', {
	
	initialize : function ( delta ) {
		
		this.delta = delta;
		
	}
	
} );
