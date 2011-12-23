//!requires:Pipeline
//!provides:Pipeline.Base
// 
//!requires:JS.Class
//!requires:JS.Observable
//
//!uses:Helper.pure

Pipeline.Base = new JS.Class('Pipeline.Base', {
	
	include : [ JS.Observable ],
	
	finalize : function ( ) {
		
		Helper.pure( this, 'finalize' );
		
	},
	
    send : function ( command, message, callback ) {
	    
	    Helper.pure( this, 'send' );
	    
    },
	
	close : function ( command, callback ) {
		
		Helper.pure( this, 'close' );
		
	}
	
});