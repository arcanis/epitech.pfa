//!provides:APP.VisualUniverse
//!requires:APP
//!requires:APP.Visual
//!requires:JS.Hash

global.APP.VisualUniverse = new JS.Class(APP.Visual, {
	initialize: function (universe) {
		this.callSuper();
		
		this.chunks = new JS.Hash();
		
		universe.addObserver(this.method('universeObserver'));
	},
	
	universeObserver: function (event, data) {
		var methodName = 'onUniverse' + event.charAt(0).toUpperCase() + event.substr(1);
		this.method(methodName)(data);
	},
	
	onUniverseAddChunk: function (data) {
		var visualChunk = new APP.VisualChunk(this, data.chunk);
		this.chunks.store(data.point, visualChunk);
	},
	
	onUniverseRemoveChunk: function (data) {
		this.chunks.remove(data.point);
	}
});
