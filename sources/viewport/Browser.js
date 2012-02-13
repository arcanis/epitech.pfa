//!requires:Viewport
//!provides:Viewport.Browser
// 
//!requires:JS.Class

Viewport.Browser = new JS.Class( 'Viewport.Browser', {
	
	initialize : function ( ) {
		
		this._renderer = new THREE.WebGLRenderer( );
		
		this._engine = null;
		
		this._aspect = 0;
		
		this.domElement = this._renderer.domElement;
		
		this._update( );
		
	},
	
	setEngine : function ( engine ) {
		
		this._engine = engine;
		
	},
	
	setSize : function ( width, height ) {
		
		this._renderer.setSize( width, height );
		
		this._aspect = width / height;
		
	},
	
	_update : function ( ) {
		
		this._requestAnimationFrame( this.method( '_update' ) );
		
		if ( this._engine ) {
			
			var scene = this._engine._scene;
			
			var camera = this._engine._cameras[ 0 ];
			camera.aspect = this._aspect;
			camera.updateProjectionMatrix( );
			
			this._renderer.render( scene, camera );
			
		}
		
	},
	
	_requestAnimationFrame : function ( fn ) {
		
		this.extend( {
			
			_requestAnimationFrame : ( function ( ) {
				
				if ( window.requestAnimationFrame ) {
					
					return window.requestAnimationFrame;
					
				} else if ( window.webkitRequestAnimationFrame ) {
					
					return window.webkitRequestAnimationFrame;
					
				} else if ( window.moRequestAnimationFrame ) {
					
					return window.mozRequestAnimationFrame;
					
				} else if ( window.oRequestAnimationFrame ) {
					
					return window.oRequestAnimationFrame;
					
				} else if ( window.ieRequestAnimationFrame ) {
					
					return window.ieRequestAnimationFrame;
					
				} else {
					
					return function ( fn ) {
						
						this.setTimeout( fn, 1000 / 60 );
						
					};
					
				}
				
			}( ) ).bind( window )
			
		} );
		
		this._requestAnimationFrame( fn );
		
	}
	
} );
