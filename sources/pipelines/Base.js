//!requires:Pipeline
//!provides:Pipeline.Base
// 
//!requires:JS.Class
//!requires:JS.Observable
//
//!uses:Helper.pure

Pipeline.Base = new JS.Class('Pipeline.Base', {
	
	include : [ JS.Observable ],
	
    send : function ( command, message, callback ) {
	    
	    Helper.pure( this, 'Pipeline.Base:send' );
	    
    },
	
	close : function ( command, callback ) {
		
		Helper.pure( this, 'Pipeline.Base:close' );
		
	}
	
});