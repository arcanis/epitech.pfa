/**
 * @author Maël Nison
 */

//!requires:Pipeline.Broadcast
//!provides:Pipeline.Broadcast.Base
// 
//!requires:JS.Class
// 
//!uses:Helper.pure

/**
 * @class
 * 
 * The broadcast object allows to send a message to every
 * pipeline except the one containing the broadcast
 * instance.<br />
 * <br />
 * Every pipeline has its own broadcast instance.<br />
 * <br />
 * Please note that this method is pure inside
 * Pipeline.Broadcast.Base : every inheriting class must
 * overwrite it.<br />
 */

Pipeline.Broadcast.Base = new JS.Class('Pipeline.Broadcast.Base', {
	
	send : function ( command, data, callback ) {
		
		Helper.pure( this, 'send' );
		
	}
	
});
