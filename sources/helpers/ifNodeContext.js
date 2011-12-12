//!requires:Helper
//!provides:Helper.ifNodeContext

Helper.ifNodeContext = function ( fn ) {
	
	if ( typeof ( process ) !== 'undefined' ) {
		
		fn( );
		
	}
	
};
