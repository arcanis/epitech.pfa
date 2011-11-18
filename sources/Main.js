//!provides:Main
// 
//!requires:JS.Singleton
//!requires:Helpers.requestAnimationLoop
//!requires:Value3
//!requires:View.Apis
// 
//!requires:KeyboardSystem
//!requires:DisplaySystem
// 
//!requires:View.Characters.Cube
//!requires:View.Voxels.Grass
//!requires:View.Voxels.Dirt

var Main = new JS.Singleton('Main', {
	node: function () {
		console.log("Node code running.");
	},
	
	browser: function () {
		
		var displaysys = new DisplaySystem();
		var keyboardsys = new KeyboardSystem();
		
		var view = new View.Apis();
		view.activateAxes();
		view.activateLights();
		
		var camera = view.createCamera();
		var character = view.createCharacter(View.Characters.Cube);
		
		var S = 4;
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
			camera.setPosition(position.x + (Math.sin(orientation) * 50), position.y + 50, position.z + (Math.cos(orientation) * 50));
			camera.lookAt(position);
			//*/
			
			// 1st Person
			/*
			view.setCameraPosition(camera, position);
			view.setCameraPitch(camera, orientation);
			//*/
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
			character.setPitchOrientation(character.getPitchOrientation() - rotation);
			updateCamera();
		}
		
		function turnr(rotation) {
			character.setPitchOrientation(character.getPitchOrientation() + rotation);
			updateCamera();
		}
		
		var translationSpeed = 100;
		var rotationSpeed = Math.PI / 2;
		
		updateCamera();
		
		Helpers.requestAnimationLoop(function (delta) {
			
			var realTranslationSpeed = delta * translationSpeed;
			
			keyboardsys.check(KeyboardSystem.KEY_Z) && front(realTranslationSpeed);
			keyboardsys.check(KeyboardSystem.KEY_S) && back(realTranslationSpeed);
			keyboardsys.check(KeyboardSystem.KEY_Q) && left(realTranslationSpeed);
			keyboardsys.check(KeyboardSystem.KEY_D) && right(realTranslationSpeed);
			
			var realRotationSpeed = delta * rotationSpeed;

			keyboardsys.check(KeyboardSystem.KEY_A) && turnl(realRotationSpeed);
			keyboardsys.check(KeyboardSystem.KEY_E) && turnr(realRotationSpeed);
			
			displaysys.render(view);
			
		});
		
		console.log("Browser code running.");
	},
	
	initialize: function () {
		if (typeof(process) !== 'undefined') {
			this.node();
			
			return true;
		}
		
		if (typeof(window) !== 'undefined') {
			window.addEventListener('load', function () {
				
				this.browser();
			
			}.bind(this));
			
			return true;
		}
		
		return false;
	}
});
