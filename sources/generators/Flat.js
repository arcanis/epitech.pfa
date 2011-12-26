//!requires:Generator
//!provides:Generator.Flat
//!requires:Generator.Base
// 
//!requires:JS.Class

Generator.Flat = new JS.Class('Generator.Flat', Generator.Base, {
	
	generate : function ( ) {
		
		return [[[]]];
		
	}
	
});
