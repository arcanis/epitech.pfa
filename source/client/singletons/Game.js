//!provides:APP.Game
//!requires:APP
//!requires:JS.Observable
//!requires:JS.Singleton

global.APP.Game = new JS.Singleton({
	include: JS.Observable,
	
	loop: function () {
		this.requestAnimationFrame(this.method('loop'));
		this.notifyObservers();
	},
	
	requestAnimationFrame: (function () {
		var requestAnimationFrame = function (fn) {
			this.setTimeout(fn, 1000 / 60);
		};
		
		if (window.requestAnimationFrame)
			requestAnimationFrame = window.requestAnimationFrame;
		else if (window.webkitRequestAnimationFrame)
			requestAnimationFrame = window.webkitRequestAnimationFrame;
		else if (window.mozRequestAnimationFrame)
			requestAnimationFrame = window.mozRequestAnimationFrame;
		
		return function (fn) {
			requestAnimationFrame.call(window, fn);
		};
	}())
});
