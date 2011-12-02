//!requires:Systems
//!provides:Systems.Keyboard
// 
//!requires:JS.Singleton
//!requires:Helpers.ifBrowserContext

Helpers.ifBrowserContext(function () {
	
	Systems.Keyboard = new JS.Singleton('Systems.Keyboard', {
		
		KEY_A: 65,
		KEY_B: 66,
		KEY_C: 67,
		KEY_D: 68,
		KEY_E: 69,
		KEY_F: 70,
		KEY_G: 71,
		KEY_H: 72,
		KEY_I: 73,
		KEY_J: 74,
		KEY_K: 75,
		KEY_L: 76,
		KEY_M: 77,
		KEY_N: 78,
		KEY_O: 79,
		KEY_P: 80,
		KEY_Q: 81,
		KEY_R: 82,
		KEY_S: 83,
		KEY_T: 84,
		KEY_U: 85,
		KEY_V: 86,
		KEY_W: 87,
		KEY_X: 88,
		KEY_Y: 89,
		KEY_Z: 90,
		
		KEY_ARROW_LEFT:   37,
		KEY_ARROW_UP:     38,
		KEY_ARROW_RIGHT:  39,
		KEY_ARROW_DOWN:   40,
		
		KEY_NUMPAD_1:     97,
		KEY_NUMPAD_2:     98,
		KEY_NUMPAD_3:     99,
		KEY_NUMPAD_4:    100,
		KEY_NUMPAD_5:    101,
		KEY_NUMPAD_6:    102,
		KEY_NUMPAD_7:    103,
		KEY_NUMPAD_8:    104,
		KEY_NUMPAD_9:    105,
		
		KEY_PLUS:  107,
		KEY_MINUS: 109,
		
		initialize: function () {
			
			var active = this.active = {};
			
			window.document.addEventListener('keydown', function (e) {
				
				active[e.keyCode] = true;
				
			}, false);
			
			window.document.addEventListener('keyup', function (e) {
				
				delete active['down', e.keyCode];
				
			}, false);
			
		},
		
		check: function (keycode) {
			
			return this.active.hasOwnProperty(keycode);
			
		}
		
	});
	
});
