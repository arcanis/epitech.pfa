//!provides:APP.VisualNode
//!requires:APP.Config
//!requires:APP.Visual
//!requires:JS.Class

global.APP.VisualNode = new JS.Class(APP.Visual, {
	initialize: function (parent, node) {
		this.callSuper(parent);
		
		this.node = node;
		this.faces = { px: true, nx: true, py: true, ny: true, pz: true, nz: true };
		this.materials = [ node.type.faces.px, node.type.faces.nx, node.type.faces.py, node.type.faces.ny, node.type.faces.pz, node.type.faces.nz ];
		
		node.addObserver(this.method('nodeObserver'));
	},
	
	nodeObserver: function (event, data) {
		var methodName = 'onNode' + event.charAt(0).toUpperCase() + event.substr(1);
		this.method(methodName)(data);
	},
	
	setPosition: function (point) {
		this.position = point;
		this.markAsOutdated();
	},
	
	update: function () {
		var s = APP.Config.get('Cube size');
		var threeGeometry = new THREE.CubeGeometry(s, s, s, 1, 1, 1, this.materials, this.faces);
		
		this.threeMesh = new THREE.Mesh(threeGeometry, new THREE.MeshFaceMaterial());
		this.threeMesh.matrix.setPosition(new THREE.Vector3(this.position.x, this.position.y, this.position.z).multiplyScalar(APP.Config.get('Cube size')));
		this.threeMesh.matrixAutoUpdate = false;
	}
});
