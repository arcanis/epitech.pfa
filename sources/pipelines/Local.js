//!requires:Pipeline
//!provides:Pipeline.Local
//!requires:Pipeline.Base
//
//!requires:JS.Class
// 
//!uses:Pipeline.Event.Command
//!uses:Pipeline.Event.Disconnection

Pipeline.Local = new JS.Class('Pipeline.Local', Pipeline.Base, {
	
	initialize : function ( ) {
		
		this.other = null;
		
	},
	
	finalize : function ( ) {
		
		var connectionEvent;
		
		connectionEvent = new Pipeline.Event.Connection( );
		connectionEvent.pipeline = this.other;
		this.other.notifyObservers( connectionEvent );
		
		connectionEvent = new Pipeline.Event.Connection( );
		connectionEvent.pipeline = this;
		this.notifyObservers( connectionEvent );
		
	},
	
	send : function ( command, data, callback ) {
		
		var commandEvent = new Pipeline.Event.Command( callback );
		commandEvent.pipeline = this.other;
		commandEvent.command = command;
		commandEvent.data = data;
		this.other.notifyObservers( commandEvent );
		
	},
	
	close : function ( local ) {
		
		if ( this.other ) {
			
			if ( ! local ) {
				this.other.close( true );
			}
			
			var disconnectionEvent = new Pipeline.Event.Disconnection( );
			disconnectionEvent.pipeline = this;
			this.notifyObservers( disconnectionEvent );
			
			this.other = null;
			
		}
		
	}
	
});
