//!provides:Main
// 
//!requires:JS.Singleton
//!requires:Helpers.requestAnimationLoop
//!requires:View
// 
//!requires:KeyboardSystem
//!requires:DisplaySystem
// 
//!requires:SphereCharacter

var Main = new JS.Singleton({
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
		var character = view.createCharacter(SphereCharacter);
		
		function updateCamera() {
			var position = view.getCharacterPosition(character);
			var orientation = view.getCharacterOrientation(character);
			
			view.setCameraPosition(camera, position);
			view.setCameraAngles(camera, 0, 0, 0);
			
			view.setCameraPosition(camera, 50, 50, 50);
			view.setCameraTarget(camera, position);
			
			//view.setCameraPitch(camera, orientation);
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
		
		var translationSpeed = 10;
		var rotationSpeed = Math.PI / 2;
		
		updateCamera();
		
		Helpers.requestAnimationLoop(function (delta) {
			
			var realTranslationSpeed = delta * translationSpeed;
			
			keyboardsys.check(KeyboardSystem.KEY_NUMPAD_8) && front(realTranslationSpeed);
			keyboardsys.check(KeyboardSystem.KEY_NUMPAD_2) && back(realTranslationSpeed);
			keyboardsys.check(KeyboardSystem.KEY_NUMPAD_4) && left(realTranslationSpeed);
			keyboardsys.check(KeyboardSystem.KEY_NUMPAD_6) && right(realTranslationSpeed);
			
			var realRotationSpeed = delta * rotationSpeed;
			
			keyboardsys.check(KeyboardSystem.KEY_NUMPAD_7) && turnl(realRotationSpeed);
			keyboardsys.check(KeyboardSystem.KEY_NUMPAD_9) && turnr(realRotationSpeed);
			
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
