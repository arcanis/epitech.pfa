//!requires:Pipeline.Broadcast
//!provides:Pipeline.Broadcast.Base
// 
//!requires:JS.Class
// 
//!uses:Helper.pure

Pipeline.Broadcast.Base = new JS.Class('Pipeline.Broadcast.Base', {
	
	send : function ( command, data, callback ) {
		
		Helper.pure( this, 'send' );
		
	}
	
});
