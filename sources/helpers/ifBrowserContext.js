//!requires:Helper
//!provides:Helper.ifBrowserContext

Helper.ifBrowserContext = function ( fn ) {
	
	if ( typeof ( window ) !== 'undefined' ) {
		
		fn( );
		
	}
	
};
