//!provides:Main
// 
//!requires:JS.Singleton
//!requires:Helper.ifNodeContext
//!requires:Helper.ifBrowserContext
// 
//!requires:Browser
//!requires:Node

new JS.Singleton('Main', {
<<<<<<< HEAD
	                 
	                 initialize: function ( ) {
		                 var that = this;
		                 
		                 Helper.ifNodeContext(function ( ) {
			                                      new Node( );
		                                      });
		                 
		                 Helper.ifBrowserContext(function () {
			                                         window.addEventListener('load', function ( ) {
				                                                                 new Browser( );
			                                                                 }, false);
		                                         });
	                 }
	                 
                 });
=======
	
	initialize: function ( ) {
		
		var that = this;
		
		Helper.ifNodeContext(function ( ) {
			
			new Node( );
			
		});
		
		Helper.ifBrowserContext(function ( ) {
			
			window.addEventListener('load', function ( ) {
				
				new Browser( );
				
			}, false);
			
		});
		
	}
	
});
>>>>>>> efdf65d7b8e90f5027a02cd1795e8fd5861848de
