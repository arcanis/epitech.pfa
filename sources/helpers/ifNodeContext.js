//!requires:Helpers
//!provides:Helpers.ifNodeContext

Helpers.ifNodeContext = function ( fn ) {
	
	if ( typeof ( process ) !== 'undefined' ) {
		
		fn( );
		
	}
	
};
