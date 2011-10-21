//!provides:APP.VisualUniverse
//!requires:APP.VisualChunk
//!requires:JS.Hash

global.APP.VisualUniverse = new JS.Class(APP.Visual, {
	initialize: function (parent, universe) {
		this.callSuper(parent);
		
		this.universe = universe;
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
		visualChunk.setPosition(data.point);
	},
	
	onUniverseRemoveChunk: function (data) {
		this.chunks.remove(data.point);
		this.markAsOutdated();
	},
	
	update: function () {
		var threeGeometry = new THREE.Geometry();
		this.chunks.forEachValue(function (chunk) {
			THREE.GeometryUtils.merge(threeGeometry, chunk.threeMesh);
		});
		
		this.threeMesh = new THREE.Mesh(threeGeometry, new THREE.MeshFaceMaterial());
	}
});
