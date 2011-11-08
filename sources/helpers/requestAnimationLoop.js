//!provides:Helpers.requestAnimationLoop
// 
//!requires:Helpers
// 
//!uses:Helpers.requestAnimationFrame

global.Helpers.requestAnimationLoop = function (fn) {
	
	var craft = function (delta) {
		
		Helpers.requestAnimationFrame(craft);
		fn(delta);
		
	};
	
	craft(0);
	
};
