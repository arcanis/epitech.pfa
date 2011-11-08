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
		
		function front(distance) {
			view.moveCharacterFront(character, distance);
		}
		
		function back(distance) {
			view.moveCharacterBack(character, distance);
		}
		
		function left(distance) {
			view.strafeCharacterLeft(character, distance);
		}
		
		function right(distance) {
			view.strafeCharacterRight(character, distance);
		}
		
		function turnl(rotation) {
			view.turnCharacterLeft(character, rotation);
		}
		
		function turnr(rotation) {
			view.turnCharacterRight(character, rotation);
		}
		
		var translationSpeed = 10;
		var rotationSpeed = Math.PI / 2;
		
		view.setCameraPosition(camera, 20, 20, 20);
		view.setCameraTarget(camera, 0, 0, 0);
		
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
