//!provides:APP.Block.Client
// 
//!requires:APP.Block
//!requires:JS.Class
//!requires:JS.Updatable

global.APP.Block.Client = new JS.Class({
	include: JS.Updatable,
	
	initialize: function () {
		this.markAsOutdated();
		this.textures = new JS.Hash();
		this.materials = [
			new THREE.MeshBasicMaterial({ color: 0xff0000 }),
			new THREE.MeshBasicMaterial({ color: 0x7f0000 }),
			new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
			new THREE.MeshBasicMaterial({ color: 0x007f00 }),
			new THREE.MeshBasicMaterial({ color: 0x0000ff }),
			new THREE.MeshBasicMaterial({ color: 0x00007f })
		];
	},
	
	setTexture: function (name, value) {
		this.textures.store(name, value);
		this.markAsOutdated();
	},
	
	getTexture: function (name) {
		return this.textures.get(name);
	},
	
	createVisualNodeMesh: function (visualNode) {
		this.revalidate();
		
		var s = APP.Config.get('Cube size');
		var threeGeometry = new THREE.CubeGeometry(s, s, s, 1, 1, 1, this.materials, visualNode.faces);
		
		return new THREE.Mesh(threeGeometry, new THREE.MeshFaceMaterial());
	},
	
	update: function () {
	}
});
