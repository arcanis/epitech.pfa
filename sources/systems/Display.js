//!requires:System
//!provides:System.Display
// 
//!requires:JS.Singleton
//!requires:Helper.ifBrowserContext

Helper.ifBrowserContext(function ( ) {
	
	System.Display = new JS.Singleton('Systems.Display', {
		
		initialize: function ( ) {
			
			this.renderer = new THREE.WebGLRenderer( );
			
			var domElement = this.renderer.domElement;
			domElement.style.position = 'absolute';
			domElement.style.top = domElement.style.left = '0';
			
			var that = this;
			
			var updateSize = function ( ) {
				
				that.size = [ window.innerWidth, window.innerHeight ];
				
				that.renderer.setSize( window.innerWidth, window.innerHeight );
				
			};
			
			window.addEventListener('resize', function ( ) {
				
				updateSize( );
				
			}, false );
			
			window.addEventListener('load', function ( ) {
				
				window.document.body.appendChild( domElement );
				
			}, false);
			
			updateSize( );
		},
		
		render: function ( view ) {
			
			var size = this.size;
			
			view.renderOn( this.renderer, size[ 0 ], size[ 1 ] );
			
		}
		
	});
	
});
