//!provides:APP.VisualChunk
//!requires:APP.VisualNode
//!requires:JS.Hash

global.APP.VisualChunk = new JS.Class(APP.Visual, {
	initialize: function (parent, chunk) {
		this.callSuper(parent);
		
		this.chunk = chunk;
		this.nodes = new JS.Hash();
		
		chunk.addObserver(this.method('chunkObserver'));
	},
	
	chunkObserver: function (event, data) {
		var methodName = 'onChunk' + event.charAt(0).toUpperCase() + event.substr(1);
		this.method(methodName)(data);
	},
	
	onChunkUpdate: function (data) {
		this.nodes.clear();
		
		this.chunk.nodes.forEachPair(function (point, node) {
			var visualNode = new APP.VisualNode(this, node);
			this.nodes.store(point, visualNode);
			visualNode.setPosition(point);
		}, this);
		
		var check = function (node, neighbor, uFace, vFace) {
			if (!neighbor) return ;
			node.faces[uFace] = false;
			neighbor.faces[vFace] = false;
		}.bind(this);
		
		this.nodes.forEachPair(function (point, node) {
			check(node, this.nodes.get(point.px()), 'px', 'nx');
			check(node, this.nodes.get(point.nx()), 'nx', 'px');
			check(node, this.nodes.get(point.py()), 'py', 'ny');
			check(node, this.nodes.get(point.ny()), 'ny', 'py');
			check(node, this.nodes.get(point.pz()), 'pz', 'nz');
			check(node, this.nodes.get(point.nz()), 'nz', 'pz');
		}, this);
	},
	
	onChunkAddNode: function (data) {
		var visualNode = new APP.VisualNode(this, data.node);
		this.nodes.store(data.point, visualNode);
		visualNode.setPosition(data.point);
	},
	
	onChunkRemoveNode: function (data) {
		this.chunks.remove(data.point);
		this.markAsOutdated();
	},
	
	setPosition: function (point) {
		this.position = point;
		this.markAsOutdated();
	},
	
	update: function () {
		var threeGeometry = new THREE.Geometry();
		this.nodes.forEachValue(function (node) {
			THREE.GeometryUtils.merge(threeGeometry, node.threeMesh);
		});
		
		this.threeMesh = new THREE.Mesh(threeGeometry, new THREE.MeshFaceGeometry());
		this.threeMesh.matrix.setPosition(new THREE.Vector3(this.position.x, this.position.y, this.position.z).multiplySelf(new THREE.Vector3(APP.Config.get('Chunk width'), APP.Config.get('Chunk height'), APP.Config.get('Chunk depth'))).multiplyScalar(APP.Config.get('Cube size')));
		this.threeMesh.matrixAutoUpdate = false;
	}
});
