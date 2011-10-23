//!provides:Main
//!requires:APP.Chunk
//!requires:APP.Config
//!requires:APP.Game
//!requires:APP.Node
//!requires:APP.Renderer
//!requires:APP.DirtBlock.client
//!requires:APP.Universe
//!requires:APP.VisualUniverse
//!requires:JS.Singleton
//!requires:JS.Point

global.Main = new JS.Singleton({
	initialize: function () {
		var universe = new APP.Universe();
		var chunk = new APP.Chunk();
		universe.addChunk(new JS.Point(0, 0, 0), chunk);
		for (var x = APP.Config.get('Chunk width'); x--;)
			for (var y = APP.Config.get('Chunk height'); y--;)
				for (var z = APP.Config.get('Chunk depth'); z--;)
					chunk.addNode(new JS.Point(x, y, z), new APP.Node(APP.DirtBlock));
		
		var currentUniverseMesh = null;
		function resetUniverseMesh(mesh) {
			if (currentUniverseMesh)
				APP.Renderer.scene.remove(currentUniverseMesh);
			APP.Renderer.scene.add(mesh);
			currentUniverseMesh = mesh;
		}
		
		var visualUniverse = new APP.VisualUniverse(universe);
		visualUniverse.addObserver(function (event, data) {
			if (event === 'update') {
				resetUniverseMesh(data.mesh);
			}
		});
		
		APP.Game.addObserver(function () {
			visualUniverse.revalidate();
			APP.Renderer.render();
		});
		
		APP.Game.loop();
	}
});
