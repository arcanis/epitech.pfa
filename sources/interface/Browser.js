//!requires:Interface
//!provides:Interface.Browser
// 
//!requires:JS.Class
// 
//!uses:Console.Browser
//!uses:Input.Event.KeyDown
//!uses:Input.Event.KeyUp
//!uses:Viewport.Browser

Interface.Browser = new JS.Class( 'Interface.Browser', Interface, {
	
	initialize : function ( ) {
		
		this._game = null;
		
		this._layout = null;
		
		this._keyEvents = [ ];
		
		var domElement = this.domElement = document.createElement( 'div' );
		domElement.setAttribute( 'tabindex', 0 );
		domElement.style.position = 'relative';
		domElement.focus( );
		
		domElement.addEventListener( 'keydown', function ( e ) {
			
			if ( this._layout.hasOwnProperty( e.keyCode ) ) {
				
				this._keyDown( this._layout[ e.keyCode ] );
				
			}
			
		}.bind( this ), false );
		
		domElement.addEventListener( 'keyup', function ( e ) {
			
			if ( this._layout.hasOwnProperty( e.keyCode ) ) {
				
				this._keyUp( this._layout[ e.keyCode ] );
				
			}
			
		}.bind( this ), false );
		

		domElement.addEventListener( 'blur', function ( ) {
			
			this._clearEvents( );
			
		}.bind( this ), false );
		
		var viewport = this.viewport = new Viewport.Browser( );
		domElement.appendChild( viewport.domElement );
		viewport.domElement.style.position = 'absolute';
		viewport.domElement.style.top = viewport.domElement.style.left = 0;
		
		var console = this.console = new Console.Browser( );
		domElement.appendChild( console.domElement );
		console.domElement.style.overflow = 'hidden';
		console.domElement.style.position = 'absolute';
		console.domElement.style.bottom = console.domElement.style.left = 0;
		
		this.setSize( 500, 500 );
		
	},
	
	setSize : function ( width, height ) {
		
		this.domElement.style.width = width + 'px';
		this.domElement.style.height = height + 'px';
		
		this.viewport.setSize( width, height );
		
		this.console.setSize( width, height );
		
	},
	
	setLayout : function ( layout ) {
		
		this._layout = layout;
		
	},
	
	setGame : function ( game ) {
		
		this._game = game;
		
		this.viewport.setEngine( game.client.engine );
		
		this.console.setSource( game.client.output );
		
	},
	
	_keyDown : function ( key ) {
		
		if ( this._keyEvents.indexOf( key ) === - 1 ) {
			
			this._keyEvents.unshift( key );
			
			var keyDownEvent = new Input.Event.KeyDown( key );
			this._game.client.input.notifyObservers( keyDownEvent );
			
		}
		
	},
	
	_keyUp : function ( key ) {
		
		var indexOf = this._keyEvents.indexOf( key );
		
		if ( indexOf !== - 1 ) {
			
			this._keyEvents.splice( indexOf, 1 );
			
			var keyUpEvent = new Input.Event.KeyUp( key );
			this._game.client.input.notifyObservers( keyUpEvent );
			
		}
		
	},
	
	_clearEvents : function ( ) {
		
		var keyEvents = this._keyEvents;
		
		for ( var t = 0, l = keyEvents.length; t < l; ++ t ) {
			
			this._keyUp( keyEvents[ t ] );
			
		}
		
	}
	
} );
