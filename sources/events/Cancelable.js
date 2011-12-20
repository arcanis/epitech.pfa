//!requires:Event
//!provides:Event.Cancelable
// 
//!requires:JS.Module

Event.Cancelable = new JS.Module({
	
	force : function ( ) {
		this._forced = true;
	},
	
	cancel : function ( ) {
		this._canceled = true;
	},
	
	isCanceled : function ( ) {
		var forced = this.hasOwnProperty( '_forced' ) ? this._forced : false;
		var canceled = this.hasOwnProperty( '_canceled' ) ? this._canceled : false;
		
		return ( ! forced ) && ( canceled );
	}
	
});
