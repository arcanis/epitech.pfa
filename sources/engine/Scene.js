//!requires:Engine
//!provides:Engine.Scene
// 
//!requires:JS.Class
//!requires:JS.Observable
// 
//!uses:Engine.Camera
//!uses:Engine.Character
//!uses:Engine.Event.Cycle

Engine.Scene = new JS.Class( 'Engine.Scene', {
	
	include : [ JS.Observable ],
	
	initialize : function ( ) {
		
		this.threeElement = new THREE.Scene( );
		
		this._clock = new THREE.Clock( );
		
		this._cameras = [ ];
		
		this.primaryCamera = this.createCamera( );
		
	},
	
	cycle : function ( ) {
		
		var delta = this._clock.getDelta( );
		
		var cycleEvent = new Engine.Event.Cycle( delta );
		this.notifyObservers( cycleEvent );
		
	},
	
	createCamera : function ( parameters ) {
		
		var camera = new Engine.Camera( parameters );
		
		this.threeElement.add( camera.threeElement );
		
		this._cameras.unshift( camera );
		
		return camera;
		
	},
	
	removeCamera : function ( camera ) {
		
		this.threeElement.remove( camera.threeElement );
		
		var indexOf = this._cameras.indexOf( camera );
		
		this._cameras.splice( indexOf, 1 );
		
	},
	
	createCharacter : function ( parameters ) {
		
		var character = new Engine.Character( parameters );
		
		this.threeElement.add( character.threeElement );
		
		return character;
		
	},
	
	removeCharacter : function ( character ) {
		
		this.threeElement.remove( character.threeElement );
		
	}
	
} );
