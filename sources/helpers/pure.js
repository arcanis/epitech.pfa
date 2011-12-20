//!requires:Helper
//!provides:Helper.pure

Helper.pure = function ( name ) {
	
	throw new Error( 'Call to unimplemented method \'' + name + '\'.' );
	
};
