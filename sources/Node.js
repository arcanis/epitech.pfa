//!provides:Node
// 
//!requires:JS.Class
//!requires:Generator.Base

global.Node = new JS.Class('Node', {
	
	initialize : function ( ) {
		
		this.generator = new Generator.Base();
		this.generator.generate(0, 0);
		
	}
	
});
