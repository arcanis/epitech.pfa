//!provides:APP.Block.Client
// 
//!requires:APP.Block
//!requires:JS.Class

global.APP.Block.Client = new JS.Class({
	initialize: function () {
		this.materials = [
			new THREE.MeshBasicMaterial({ color: 0xff0000 }),
			new THREE.MeshBasicMaterial({ color: 0x7f0000 }),
			new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
			new THREE.MeshBasicMaterial({ color: 0x007f00 }),
			new THREE.MeshBasicMaterial({ color: 0x0000ff }),
			new THREE.MeshBasicMaterial({ color: 0x00007f })
		];
	}
});
