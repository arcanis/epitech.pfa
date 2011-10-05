/**
 * @author Maël Nison
 */

/**
 * @class TITANIA.ChunkClient
 * @mixes TITANIA.EventBehavior
 * @mixes TITANIA.StoreBehavior
 */

TITANIA.ChunkClient =
	function () {
		this.addHandler = TITANIA.ChunkClient.addHandler.bind(this);
		this.removeHandler = TITANIA.ChunkClient.removeHandler.bind(this);
		this.refreshHandler = TITANIA.ChunkClient.refreshHandler.bind(this);
		
		this.createStore3D('nodes', TITANIA.Config.CHUNK_WIDTH, TITANIA.Config.CHUNK_HEIGHT, TITANIA.Config.CHUNK_DEPTH);
	};

TITANIA.ClassUtils.mix(TITANIA.ChunkClient, TITANIA.EventBehavior);
TITANIA.ClassUtils.mix(TITANIA.ChunkClient, TITANIA.StoreBehavior);

/**
 * Current attached chunk.
 * 
 * @readonly
 */

TITANIA.ChunkClient.prototype.chunk = null;

/**
 * 3D representation of the chunk.
 * 
 * @readonly
 */

TITANIA.ChunkClient.prototype.mesh = null;

/**
 * Attach listeners to a chunk.
 * 
 * If called twice in a row, throw an Error.
 * 
 * @param {TITANIA.Chunk} chunk Chunk to listen.
 */

TITANIA.ChunkClient.prototype.attach =
	function (chunk) {
		if (this.chunk !== null)
			throw new Error();
		
		this.chunk = chunk;
		
		this.chunk.on('addNode', this.addHandler);
		this.chunk.on('removeNode', this.removeHandler);
		this.chunk.on('refreshNodes', this.refreshHandler);
	};

/**
 * Detach every listeners from the attached chunk, so it could be safely
 * dereferenced.
 * 
 * If called when attach() has not yet been called, nothing happens.
 * 
 * @todo Reset chunk client.
 */

TITANIA.ChunkClient.prototype.detach =
	function () {
		if (this.chunk === null)
			return ;
		
		this.chunk.removeListener('refreshNodes', this.refreshHandler);
		this.chunk.removeListener('removeNode', this.removeHandler);
		this.chunk.removeListener('addNode', this.addHandler);
		
		this.chunk = null;
	};

/**
 * Check if visibles faces of a node have changed. If so, force node geometry
 * and mesh refresh.
 * 
 * @private
 * 
 * @param {Number} x Node X position.
 * @param {Number} y Node Y position.
 * @param {Number} z Node Z position.
 */

TITANIA.ChunkClient.prototype.regenerate =
	function (x, y, z) {
		if (x < 0 || x === this.width)
			return ;
		if (y < 0 || y === this.height)
			return ;
		if (z < 0 || z === this.depth)
			return ;
		
		var node = this.store('nodes').get(x, y, z, null);
		if (node === null)
			return ;
		
		var faces = node.faces;
		
		var displayed, forceCommit = false;
		
		displayed = this.isFaceVisible(x, y, z, 'px');
		if (displayed !== node.faces.px) {
			node.faces.px = displayed;
			forceCommit = true;
		}
		
		displayed = this.isFaceVisible(x, y, z, 'nx');
		if (displayed !== node.faces.nx) {
			node.faces.nx = displayed;
			forceCommit = true;
		}
		
		displayed = this.isFaceVisible(x, y, z, 'py');
		if (displayed !== node.faces.py) {
			node.faces.py = displayed;
			forceCommit = true;
		}
		
		displayed = this.isFaceVisible(x, y, z, 'ny');
		if (displayed !== node.faces.ny) {
			node.faces.ny = displayed;
			forceCommit = true;
		}
		
		displayed = this.isFaceVisible(x, y, z, 'pz');
		if (displayed !== node.faces.pz) {
			node.faces.pz = displayed;
			forceCommit = true;
		}
		
		displayed = this.isFaceVisible(x, y, z, 'nz');
		if (displayed !== node.faces.nz) {
			node.faces.nz = displayed;
			forceCommit = true;
		}
		
		if (forceCommit) {
			this.commitNode(x, y, z);
		}
	};

/**
 * Check visibility of a face. If this visibility has changed, force refresh of
 * node geometry and mesh.
 * 
 * @private
 * 
 * @param {Number} x    Node X position.
 * @param {Number} y    Node Y position.
 * @param {Number} z    Node Z position.
 * @param {String} face Face to check.
 */

TITANIA.ChunkClient.prototype.regenerateFace =
	function (x, y, z, face) {
		var store = this.store('nodes');
		
		console.log(x, y, z);
		
		// Check chunk bounds
		if (x < 0 || x === store.width)
			return ;
		if (y < 0 || y === store.height)
			return ;
		if (z < 0 || z === store.depth)
			return ;
		
		// If the node is empty, then no face should be set
		var node = store.get(x, y, z, null);
		if (node === null)
			return ;
		
		// Recalc chunk geometry if the face visibility has changed
		var displayed = this.isFaceVisible(x, y, z, face);
		if (displayed !== node.faces[face]) {
			node.faces[face] = displayed;
			this.commitNode(x, y, z);
		}
	};

/**
 * Generate mesh for a single node.
 * 
 * @private
 * 
 * @param {Number} x Node X position.
 * @param {Number} y Node Y position.
 * @param {Number} z Node Z position.
 */

TITANIA.ChunkClient.prototype.commitNode =
	function (x, y, z) {
		var node = this.store('nodes').get(x, y, z);
		if (node === null)
			return ;
		
		var materials = [
			node.type.px.material,
			node.type.nx.material,
			node.type.py.material,
			node.type.ny.material,
			node.type.pz.material,
			node.type.nz.material
		];
		
		var geometry = new THREE.CubeGeometry(TITANIA.Config.CUBE_SIZE, TITANIA.Config.CUBE_SIZE, TITANIA.Config.CUBE_SIZE, 1, 1, 1, materials, false, node.faces);
		node.mesh = new THREE.Mesh(geometry);
		node.mesh.matrix.setPosition(new THREE.Vector3(x, y, z).multiplyScalar(TITANIA.Config.CUBE_SIZE));
		node.mesh.matrixAutoUpdate = false;
	};

/**
 * Generate the chunk mesh.
 * 
 * @private
 * 
 * @fires TITANIA.ChunkClient#event:refresh
 */

TITANIA.ChunkClient.prototype.commit =
	function () {
		var store = this.store('nodes');
		var geometry = new THREE.Geometry();
		
		store.forEach(function (x, y, z, value) {
			if (value === null)
				return ;
			THREE.GeometryUtils.merge(geometry, value.mesh);
		});
		
		this.mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial());
		
		/**
		 * @event TITANIA.ChunkClient#refresh
		 */
		
		this.emit('refresh');
	};

/**
 * Check if a face of selected node is visible.
 * 
 * @private
 * 
 * @param {Number} x    Node X position.
 * @param {Number} y    Node Y position.
 * @param {Number} z    Node Z position.
 * @param {String} face Face to check.
 * 
 * @throw {Error} When a bad face argument is requested.
 */

TITANIA.ChunkClient.prototype.isFaceVisible =
	function (x, y, z, face) {
		var temp = null;
		var store = this.store('nodes');
		
		switch (face) {
		case 'px':
			if (x + 1 === store.width)
				return true;
			temp = store.get(x + 1, y, z, null);
			if (temp === null || !temp.type.nx.opaque)
				return true;
			return false;
			
		case 'nx':
			if (x === 0)
				return true;
			temp = store.get(x - 1, y, z, null);
			if (temp === null || !temp.type.px.opaque)
				return true;
			return false;
			
		case 'py':
			if (y + 1 === store.height)
				return true;
			temp = store.get(x, y + 1, z, null);
			if (temp === null || !temp.type.ny.opaque)
				return true;
			return false;
			
		case 'ny':
			if (y === 0)
				return true;
			temp = store.get(x, y - 1, z, null);
			if (temp === null || !temp.type.py.opaque)
				return true;
			return false;
			
		case 'pz':
			if (z + 1 === store.depth)
				return true;
			temp = store.get(x, y, z + 1, null);
			if (temp === null || !temp.type.nz.opaque)
				return true;
			return false;
			
		case 'nz':
			if (z === 0)
				return true;
			temp = store.get(x, y, z - 1, null);
			if (temp === null || !temp.type.pz.opaque)
				return true;
			return false;
		}
		
		throw Error();
	};

/**
 * Handler for the `add' event of TITANIA.Client.
 * 
 * @private
 * 
 * @param {Object} data      Event data.
 * @param {Number} data.x    Block X position.
 * @param {Number} data.y    Block Y position.
 * @param {Number} data.z    Block Z position.
 * @param {Number} data.type Block type.
 * 
 * @see TITANIA.Chunk#event:add
 */

TITANIA.ChunkClient.addHandler =
	function (data) {
		this.store('nodes').add(data.x, data.y, data.z, {
			type : data.type,
			mesh : null,
			faces : {
				px : null, nx : null,
				py : null, ny: null,
				pz : null, nz : null
			}
		});
		
		this.regenerateFace(data.x - 1, data.y, data.z, 'px');
		this.regenerateFace(data.x + 1, data.y, data.z, 'nx');
		this.regenerateFace(data.x, data.y - 1, data.z, 'py');
		this.regenerateFace(data.x, data.y + 1, data.z, 'ny');
		this.regenerateFace(data.x, data.y, data.z - 1, 'pz');
		this.regenerateFace(data.x, data.y, data.z + 1, 'nz');
		
		this.regenerate(data.x, data.y, data.z);
		
		this.commit();
	};

/**
 * Handler for the `remove' event of TITANIA.Client.
 * 
 * @private
 * 
 * @param {Object} data   Event data.
 * @param {Number} data.x Block X position.
 * @param {Number} data.y Block Y position.
 * @param {Number} data.z Block Z position.
 * 
 * @see TITANIA.Chunk#event:remove
 */

TITANIA.ChunkClient.removeHandler =
	function (data) {
		this.store('nodes').remove(data.x, data.y, data.z);
		
		this.regenerateFace(data.x - 1, data.y, data.z, 'px');
		this.regenerateFace(data.x + 1, data.y, data.z, 'nx');
		this.regenerateFace(data.x, data.y - 1, data.z, 'py');
		this.regenerateFace(data.x, data.y + 1, data.z, 'ny');
		this.regenerateFace(data.x, data.y, data.z - 1, 'pz');
		this.regenerateFace(data.x, data.y, data.z + 1, 'nz');
		
		this.regenerate(data.x, data.y, data.z);
		
		this.commit();
	};

/**
 * Handler for the `refresh' event of TITANIA.Chunk.
 * 
 * @private
 * 
 * @param {Object} data Event data.
 * 
 * @see TITANIA.Chunk#event:refresh
 */

TITANIA.ChunkClient.refreshHandler =
	function (data) {
		var nodes = this.store('nodes');
		
		data.store.forEach(function (x, y, z, type) {
			if (type === null)
				return ;
			
			this.add(x, y, z, {
				type : type,
				mesh : null,
				faces : {
					px : null, nx : null,
					py : null, ny : null,
					pz : null, nz : null
				}
			});
		}.bind(nodes));
		
		nodes.forEach(function (x, y, z) {
			this.regenerate(x, y, z);
		}.bind(this));
		
		this.commit();
	};
