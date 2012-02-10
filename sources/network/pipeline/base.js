//!requires:Network
//!provides:Network.Pipeline
// 
//!requires:JS.Class
//!requires:JS.Observable

Network.Pipeline = new JS.Class( 'Network.Pipeline', {
	
	include : [ JS.Observable ],
	
	initialize : function ( ) {
		
		// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
		
		this.uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, function ( c ) {
			var r = Math.random( ) * 16 | 0, v = c == 'x' ? r : ( r & 0x3 | 0x8 );
			return v.toString( 16 );
		} );
		
	}
	
} );
