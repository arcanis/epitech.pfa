//!requires:Helper
//!provides:Helper.mergeObjects

Helper.mergeObjects = function ( target, source ) {
	
	for ( var x in source ) {
		
		if ( source.hasOwnProperty( x ) ) {
			
			target[ x ] = source[ x ];
			
		}
		
	}
	
	return target;
	
};
