//!requires:Helper
//!provides:Helper.requestAnimationLoop
// 
//!uses:Helper.requestAnimationFrame

Helper.requestAnimationLoop = function ( fn ) {
	
	var craft = function ( delta ) {
		
		Helper.requestAnimationFrame( craft );
		fn( delta );
		
	};
	
	craft( 0 );
	
};
