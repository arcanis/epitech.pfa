//!provides:Main
// 
//!requires:JS.Singleton
//!requires:Helpers.requestAnimationLoop
//!requires:Helpers.Coord3
//!requires:View
// 
//!requires:KeyboardSystem
//!requires:DisplaySystem
// 
//!requires:View.SphereCharacter
//!requires:View.GrassVoxel
//!requires:View.DirtVoxel

var Main = new JS.Singleton('Main', {
	node: function () {
		console.log("Node code running.");
	},
	
	browser: function () {
		
		var displaysys = new DisplaySystem();
		var keyboardsys = new KeyboardSystem();
		
		var view = new View();
		view.activateAxes();
		view.activateLights();
		
		var camera = view.createCamera();
		var character = view.createCharacter(View.SphereCharacter);
		
		var S = 4;
		for (var x = 0; x < S; ++x) {
			for (var y = 0; y < S; ++y) {
				for (var z = 0; z < S; ++z) {
					var type = y === S - 1 ? View.GrassVoxel : View.DirtVoxel;
					view.setVoxelType(new Helpers.Coord3(x, y, z), type);
				}
			}
		}
		
		function updateCamera() {
			var position = view.getCharacterPosition(character);
			var orientation = view.getCharacterOrientation(character);
			
			//view.setCameraPosition(camera, position);
			view.setCameraPosition(camera, position.x + Math.cos((orientation + 270) * Math.PI / 180) * 50,
			                       position.y + 50,
			                       position.z + Math.sin((orientation - 270) * Math.PI / 180) * 50
			                      );
			//view.setCameraAngles(camera, 0, 0, 0);
			//view.setCameraPitch(camera, orientation);
			view.setCameraTarget(camera, position);
		}
		
		function front(distance) {
			view.moveCharacterFront(character, distance);
			updateCamera();
		}
		
		function back(distance) {
			view.moveCharacterBack(character, distance);
			updateCamera();
		}
		
		function left(distance) {
			view.strafeCharacterLeft(character, distance);
			updateCamera();
		}
		
		function right(distance) {
			view.strafeCharacterRight(character, distance);
			updateCamera();
		}
		
		function turnl(rotation) {
			view.turnCharacterLeft(character, rotation);
			updateCamera();
		}
		
		function turnr(rotation) {
			view.turnCharacterRight(character, rotation);
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
