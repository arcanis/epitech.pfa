//!requires:Engine
//!provides:Engine.Scene
// 
//!requires:JS.Class
// 
//!uses:Engine.Camera
//!uses:Engine.Character

Engine.Scene = new JS.Class( 'Engine.Scene', {
	
	initialize : function ( ) {
		
		this.threeElement = new THREE.Scene( );
		
		this._cameras = [ ];
		
		this.primaryCamera = this.createCamera( );
		
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
