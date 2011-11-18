//!requires:Helpers
//!provides:Helpers.ifBrowserContext

Helpers.ifBrowserContext = function ( fn ) {
	
	if ( typeof ( window ) !== 'undefined' ) {
		
		fn( );
		
	}
	
};
