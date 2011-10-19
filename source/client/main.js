//!provides:Main
//!requires:JS.Singleton
//!requires:APP.Config#Client
//!requires:APP.Universe
//!requires:APP.VisualUniverse

global.Main = new JS.Singleton({
	initialize : function () {
		this.renderer = new THREE.WebGLRenderer();
		this.camera = new THREE.PerspectiveCamera(APP.Config.get('Field of view'));
		
		var universe = new APP.Universe();
		var visualUniverse = new APP.VisualUniverse(universe);
	}
});
