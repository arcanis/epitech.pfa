//!requires:Helper
//!provides:Helper.requestAnimationFrame

Helper.requestAnimationFrame = function ( fn ) {
	
	var time = + new Date( );
	
	Helper.requestAnimationFrame.gate.call( window, function ( ) {
		
		fn( ( new Date( ) - time ) / 1000 );
		
	});
	
};

Helper.requestAnimationFrame.gate = (function ( ) {
	
	var gate = function ( fn ) { return this.setTimeout( fn, 1000 / 60 ); };
	
	if ( typeof ( window ) === 'object' ) {
		
		var prefixes = [ '', 'moz', 'webkit', 'ms', 'o' ];
		
		for ( var x = 0, l = prefixes.length; x < l; ++ x ) {
			
			var crafted = prefixes[ x ];
			
			if ( crafted.length ) {
				
				crafted += 'RequestAnimationFrame';
				
			} else {
				
				crafted = 'requestAnimationFrame';
				
			}
			
			if ( window[ crafted ] ) {
				
				gate = window[ crafted ];
				
				break ;
				
			}
			
		}
		
	}
	
	return gate;
		
}( ));
