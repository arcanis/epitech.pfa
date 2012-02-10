//!provides:main
//!requires:plug
// 
//!requires:Bootstrap.Node
//!requires:Bootstrap.Browser

( function ( ) {
	
	if ( typeof ( process ) !== 'undefined' ) {
		
		new Bootstrap.Node( );
		
	} else if ( typeof ( window ) !== 'undefined' ) {
		
		new Bootstrap.Browser( );
		
	} else {
		
		throw new Error( 'Unable to detect environment.' );
		
	}
	
} ( ) );
