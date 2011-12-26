//!requires:Pipeline.Multiplexer
//!provides:Pipeline.Multiplexer.Local
//!requires:Pipeline.Multiplexer.Base
//
//!requires:JS.Class
// 
//!uses:Pipeline.Local
//!uses:Pipeline.Broadcast.Local

Pipeline.Multiplexer.Local = new JS.Class('Pipeline.Multiplexer.Local', Pipeline.Multiplexer.Base, {
	
	connect : function ( ) {
		
		var mine = new Pipeline.Local( );
		var your = new Pipeline.Local( );
		
		mine.other = your;
		your.other = mine;
		
		mine.multiplexer = this;
		mine.broadcast = new Pipeline.Broadcast.Local( mine );
		
		mine.addObserver(function ( event ) {
			
			this.notifyObservers( event );
			
		}.bind( this ));
		
		return your;
		
	}
	
});
