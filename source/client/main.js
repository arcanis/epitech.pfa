//!provides:Main
//!requires:JS.Singleton
//!requires:APP.Config#Client

global.Main = new JS.Singleton({
	initialize : function () {
		this.renderer = new THREE.WebGLRenderer();
		this.camera = new THREE.PerspectiveCamera(fov);
	}
});
