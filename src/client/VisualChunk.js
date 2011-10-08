/**
 * @author Maël Nison
 */

/**
 * @class TITANIA.VisualChunk
 * 
 * @mixes FUULIB.StoreBehavior
 * @mixes FUULIB.UpdateBehavior
 */

TITANIA.VisualChunk =
	function (parent, chunk) {
		this.parent = parent;
		this.chunk = chunk;
		
		this.createStore3D('visualNodes', TITANIA.Config.CHUNK_WIDTH, TITANIA.Config.CHUNK_HEIGHT, TITANIA.Config.CHUNK_DEPTH);
		
		this.addNodeEvent = this.addNodeEvent.bind(this);
		this.removeNodeEvent = this.removeNodeEvent.bind(this);
		this.copyNodesEvent = this.copyNodesEvent.bind(this);
		
		this.chunk.on('addNode', this.addNodeEvent);
		this.chunk.on('removeNode', this.removeNodeEvent);
		this.chunk.on('copyNodes', this.copyNodesEvent);
	};

FUULIB.ClassUtils.mix
(TITANIA.VisualChunk, FUULIB.StoreBehavior);

FUULIB.ClassUtils.mix
(TITANIA.VisualChunk, FUULIB.UpdateBehavior);

/**
 * Related native chunk.
 * 
 * @readonly
 */

TITANIA.VisualChunk.prototype.chunk = null;

/**
 * Mesh position.
 * 
 * @readonly
 */

TITANIA.VisualChunk.prototype.position = null;

/**
 * Generated chunk mesh.
 * 
 * @readonly
 */

TITANIA.VisualChunk.prototype.mesh = null;

/**
 * Set the mesh position in the space.
 * 
 * @param {Number} x Chunk X position.
 * @param {Number} y Chunk Y position.
 * @param {Number} z Chunk Z position.
 */

TITANIA.VisualChunk.prototype.setPosition =
	function (x, y, z) {
		// Processing the chunk position.
		var position = new THREE.Vector3(this.x, this.y, this.z);
		position.multiplySelf(new THREE.Vector3(TITANIA.Config.CHUNK_WIDTH, TITANIA.Config.CHUNK_HEIGHT, TITANIA.Config.CHUNK_DEPTH));
		position.multiplyScalar(TITANIA.Config.CUBE_SIZE);
		
		// Storing chunk position.
		this.position = position;
		
		// Mark visual chunk as updated.
		this.markAsUpdated();
	};

/**
 * Generate the chunk mesh.
 */

TITANIA.VisualChunk.prototype.update =
	function () {
		var geometry = new THREE.Geometry();
		
		// We merge every visual nodes in a single geometry.
		this.store('visualNodes').forEach(function (x, y, z, visualNodeMeta) {
			if (visualNodeMeta === null)
				return ;
			var visualNode = visualNodeMeta.visualNode;
			visualNode.upToDate || visualNode.update();
			THREE.GeometryUtils.merge(geometry, visualNode.mesh);
		});
		
		// Then we replace the old mesh by the new one.
		this.mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial());
		
		// Set its position.
		this.mesh.matrix.setPosition(this.position);
		this.mesh.matrixAutoUpdate = false;
		
		// Finaly, we reset the up-to-date flag.
		this.upToDate = true;
	};

/**
 * Reset internal array, remove any reference to external resources.
 * 
 * Object instance should not be used after this.
 */

TITANIA.VisualChunk.prototype.free =
	function () {
		// No reference on the parent, NOTHING !
		this.parent = null;
		
		// No reference on the chunk, NOTHING !
		this.chunk = null;
		
		// No reference on the processed position, NOTHING !
		this.position = null;
		
		// No reference on the generated mesh, NOTHING !
		this.mesh = null;
		
		// Reset store.
		this.store('visualNodes').forEach(function (x, y, z, visualNode) { visualNode.free(); });
		this.store('visualNodes').reset();
		
		// Drop event listeners.
		this.chunk.removeListener('addNode', this.addNodeEvent);
		this.chunk.removeListener('removeNode', this.removeNodeEvent);
		this.chunk.removeListener('copyNodes', this.copyNodesEvent);
		
		/// I won't notify that the instance has changed, because
		/// maybe markAsUpdated() will trigger an event, later.
	};

/**
 * This function is meant to be binded to the addNode event of the Chunk class.
 * 
 * @private
 */

TITANIA.VisualChunk.prototype.addNodeEvent =
	function (addNodeData) {
		var store = this.store('visualNodes');
		
		// Creating the object.
		var visualNode = new TITANIA.VisualNode(this, addNodeData.node);
		visualNode.setPosition(addNodeData.x, addNodeData.y, addNodeData.z);
		
		// Insert it into the store.
		store.add(addNodeData.x, addNodeData.y, addNodeData.z, {
			x : addNodeData.x, y : addNodeData.y, z : addNodeData.z,
			visualNode : visualNode
		});
		
		// Hide non-displayed faces.
		function check(x, y, z, fcurrent, fneighbor) {
			var neighbor = store.get(x, y, z, null);
			if (neighbor) {
				neighbor = neighbor.visualNode;
				// Hide faces if they are opaques
				if (visualNode.node.type[fcurrent].opaque && neighbor.node.type[fneighbor].opaque) {
					visualNode.faces[fcurrent] = false;
					neighbor.faces[fneighbor] = false;
					visualNode.markAsUpdated();
					neighbor.markAsUpdated();
				}
			}
		}
		
		// Check adjacents nodes.
		check(addNodeData.x - 1, addNodeData.y, addNodeData.z, 'nx', 'px');
		check(addNodeData.x + 1, addNodeData.y, addNodeData.z, 'px', 'nx');
		check(addNodeData.x, addNodeData.y - 1, addNodeData.z, 'ny', 'py');
		check(addNodeData.x, addNodeData.y + 1, addNodeData.z, 'py', 'ny');
		check(addNodeData.x, addNodeData.y, addNodeData.z - 1, 'nz', 'pz');
		check(addNodeData.x, addNodeData.y, addNodeData.z + 1, 'pz', 'nz');
		
		// Mark visual chunk as updated.
		this.markAsUpdated();
	};

/**
 * This function is meant to be binded to the removeNode event of the Chunk
 * class.
 * 
 * @private
 */

TITANIA.VisualChunk.prototype.removeNodeEvent =
	function (removeNodeData) {
		var store = this.store('visualChunks');
		
		// Free the visual node resources.
		store.get(removeNodeData.x, removeNodeData.y, removeNodeData.z).visualNode.free();
		
		// Remove the visual node from the store.
		store.remove(removeNodeData.x, removeNodeData.y, removeNodeData.z);
		
		// Show visible faces.
		function check(x, y, z, fneighbor) {
			var neighbor = store.get(x, y, z, null);
			if (neighbor) {
				neighbor = neighbor.visualNode;
				neighbor.faces[fneighbor] = true;
				neighbor.markAsUpdated();
			}
		}
		
		// Check adjacents nodes.
		check(removeNodeData.x - 1, removeNodeData.y, removeNodeData.z, 'px');
		check(removeNodeData.x + 1, removeNodeData.y, removeNodeData.z, 'nx');
		check(removeNodeData.x, removeNodeData.y - 1, removeNodeData.z, 'py');
		check(removeNodeData.x, removeNodeData.y + 1, removeNodeData.z, 'ny');
		check(removeNodeData.x, removeNodeData.y, removeNodeData.z - 1, 'pz');
		check(removeNodeData.x, removeNodeData.y, removeNodeData.z + 1, 'nz');
		
		// Mark visual chunk as updated.
		this.markAsUpdated();
	};

/**
 * This function is meant to be binded to the copyNodes event of the Chunk
 * class.
 * 
 * @private
 */

TITANIA.VisualChunk.prototype.copyNodesEvent =
	function (copyNodesData) {
		var visualNodesStore = this.store('visualNodes');
		copyNodesData.store.forEach(function (x, y, z, nodesMeta) {
			if (nodesMeta) {
				var visualNode = new TITANIA.VisualNode(nodesMeta.node);
				visualNode.setPosition(x, y, z);
				visualNodesStore.add(x, y, z, {
					x : x, y : y, z : z,
					visualNode : visualNode
				}, true);
			} else {
				visualNodesStore.remove(x, y, z, true);
			}
		});
		
		// Mark visual chunk as updated.
		this.markAsUpdated();
	};
