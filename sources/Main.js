//!provides:Main
// 
//!requires:JS.Singleton
//!requires:Helpers.requestAnimationLoop
//!requires:Helpers.ifBrowserContext
//!requires:Helpers.ifNodeContext
//!requires:Value3
//!requires:View.Apis
// 
//!requires:Systems.Keyboard
//!requires:Systems.Display
// 
//!requires:View.Characters.Cube
//!requires:View.Voxels.Grass
//!requires:View.Voxels.Dirt

var Main = new JS.Singleton('Main', {
	node: function () {
		console.log("Node code running.");
	},
	
	browser: function () {
		
		var view = new View.Apis();
		view.activateAxes();
		view.activateLights();
		
		var camera = view.createCamera();
		var character = view.createCharacter(View.Characters.Cube);
		
		var S = 10;
		for (var x = 0; x < S; ++x) {
			for (var y = 0; y < S; ++y) {
				for (var z = 0; z < S; ++z) {
					var type = y === S - 1 ? View.Voxels.Grass : View.Voxels.Dirt;
					view.setVoxelType(new Value3(x, y, z), type);
				}
			}
		}
		
		function updateCamera() {
			var position = character.getPosition( );
			var orientation = character.getPitchOrientation( );
			
			///////////////////////////////
			// Camera
			///////////////////////////////
			// 
			// touch:
			// 
			// front       z
			// back        s
			// right       d
			// left        q
			// turn right  e
			// turn left   a
			///////////////////////////////

			// 3rd Person
			//*
			
			var cameraPosition = new Value3( ).copy( position );
			cameraPosition.x -= ( Math.sin( orientation ) * 50 );
			cameraPosition.y += 50;
			cameraPosition.z -= ( Math.cos( orientation ) * 50 );
			
			camera.setPosition( cameraPosition );
			camera.lookAt( position );
			
			//*/
			
			// 1st Person
			/*
			view.setCameraPosition(camera, position);
			view.setCameraPitch(camera, orientation);
			//*/
			//camera.setPosition({ x: 125, y: 125, z: 125 });
			//camera.lookAt({ x: 0, y: 0, z: 0 });
		}
		
		function front(distance) {
			character.moveFront(distance);
			updateCamera();
		}
		
		function back(distance) {
			character.moveBack(distance);
			updateCamera();
		}
		
		function left(distance) {
			character.moveLeft(distance);
			updateCamera();
		}
		
		function right(distance) {
			character.moveRight(distance);
			updateCamera();
		}
		
		function turnl(rotation) {
			character.setPitchOrientation(character.getPitchOrientation() + rotation);
			updateCamera();
		}
		
		function turnr(rotation) {
			character.setPitchOrientation(character.getPitchOrientation() - rotation);
			updateCamera();
		}
		
		var translationSpeed = 100;
		var rotationSpeed = Math.PI / 2;
		
		updateCamera();
		
		Helpers.requestAnimationLoop(function (delta) {
			
			var realTranslationSpeed = delta * translationSpeed;
			
			Systems.Keyboard.check(Systems.Keyboard.KEY_Z) && front(realTranslationSpeed);
			Systems.Keyboard.check(Systems.Keyboard.KEY_S) && back(realTranslationSpeed);
			Systems.Keyboard.check(Systems.Keyboard.KEY_Q) && left(realTranslationSpeed);
			Systems.Keyboard.check(Systems.Keyboard.KEY_D) && right(realTranslationSpeed);
			
			var realRotationSpeed = delta * rotationSpeed;

			Systems.Keyboard.check(Systems.Keyboard.KEY_A) && turnl(realRotationSpeed);
			Systems.Keyboard.check(Systems.Keyboard.KEY_E) && turnr(realRotationSpeed);
			
			Systems.Display.render(view);
			
		});
		
		console.log( "Browser code running." );
	},
	
	initialize: function ( ) {
		var that = this;
		
		Helpers.ifNodeContext(function ( ) {
			that.node( );
		});
		
		Helpers.ifBrowserContext(function () {
			window.addEventListener('load', function ( ) {
				that.browser( );
			}, false);
		});
	}
});
