//!provides:Main
// 
//!requires:JS.Singleton
//!requires:Helper.ifNodeContext
//!requires:Helper.ifBrowserContext
// 
//!requires:Browser
//!requires:Node

new JS.Singleton('Main', {
	
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
