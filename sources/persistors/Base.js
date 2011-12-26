//!requires:Persistor
//!provides:Persistor.Base
// 
//!requires:JS.Class
// 
//!requires:Helper.pure

Persistor.Base = new JS.Class('Persistor.Base', {
	
	has : function ( ) {
		
		Helper.pure( 'Persistor.Base:has' );
		
	},
	
	load : function ( ) {
		
		Helper.pure( 'Persistor.Base:load' );
		
	},
	
	save : function ( ) {
		
		Helper.pure( 'Persistor.Base:save' );
		
	}
	
});
