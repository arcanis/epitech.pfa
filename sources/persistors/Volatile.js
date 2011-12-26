//!requires:Persistor
//!provides:Persistor.Volatile
//!requires:Persistor.Base
// 
//!requires:JS.Class

Persistor.Volatile = new JS.Class('Persistor.Volatile', Persistor.Base, {
	
	has : function ( ) {
		
		return false;
		
	},
	
	load : function ( ) {
		
		return false;
		
	},
	
	save : function ( ) {
		
		return false;
		
	}
	
});
