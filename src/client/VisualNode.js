/**
 * @author Maël Nison
 */

/**
 * @class TITANIA.VisualNode
 */

TITANIA.VisualNode =
	function (parent, node) {
		this.parent = parent;
		this.node = node;
	};

TITANIA.ClassUtils.mix(TITANIA.VisualNode, TITANIA.UpdateBehavior);

/**
 * Related native node.
 * 
 * @readonly
 */

TITANIA.VisualNode.prototype.node = null;

/**
 * Mesh position.
 * 
 * @readonly
 */

TITANIA.VisualNode.prototype.position = null;

/**
 * Generation node mesh.
 * 
 * @readonly
 */

TITANIA.VisualNode.prototype.mesh = null;

/**
 * Set the mesh position in the space.
 * 
 * @param {Number} x Node X position.
 * @param {Number} y Node Y position.
 * @param {Number} z Node Z position.
 */

TITANIA.VisualNode.prototype.setPosition =
	function (x, y, z) {
		// Processing the chunk position.
		var position = new THREE.Vector3(this.x, this.y, this.z);
		position.multiplyScalar(TITANIA.Config.CUBE_SIZE);
		
		// Storing chunk position.
		this.position = position;
		
		// Mark visual chunk as updated.
		this.markAsUpdated();
	};

/**
 * Generate the node mesh.
 */

TITANIA.VisualNode.prototype.update =
	function () {
		// We generate the cube geometry.
		var geometry = new THREE.CubeGeometry(TITANIA.Config.CUBE_SIZE, TITANIA.Config.CUBE_SIZE, TITANIA.Config.CUBE_SIZE, 1, 1, 1, this.materials, false, this.faces);
		
		// We replace the old mesh by the new one.
		this.mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial());
		
		// Set its position.
		this.mesh.matrix.setPosition(this.position);
		this.mesh.matrixAutoUpdate = false;
		
		// Finaly, we reset the up-to-date flag.
		this.upToDate = true;
	};

/**
 * Remove any reference to external resources.
 */

TITANIA.VisualNode.prototype.free =
	function () {
		// No reference on the parent, NOTHING !
		this.parent = null;
		
		// No reference on the node, NOTHING !
		this.node = null;
		
		// No reference on the position, NOTHING !
		this.position = null;
		
		// No reference on the mesh, NOTHING !
		this.mesh = null;
		
		/// I won't notify that the instance has changed, because
		/// maybe markAsUpdated() will trigger an event, later.
	};
