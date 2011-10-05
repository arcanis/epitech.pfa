/**
 * @author Maël Nison
 */

/**
 * @class TITANIA.WorldClient
 */

TITANIA.WorldClient =
	function () {
		this.addHandler = TITANIA.WorldClient.addHandler.bind(this);
		this.removeHandler = TITANIA.WorldClient.removeHandler.bind(this);
	};

/**
 * Current attached world.
 * 
 * @readonly
 */

TITANIA.WorldClient.prototype.world = null;

/**
 * World 3D scene.
 * 
 * @readonly
 */

TITANIA.WorldClient.prototype.scene = null;

/**
 * Attach listeners to a world.
 * 
 * If called twice in a row, throw an Error.
 * 
 * @param {TITANIA.World} world World to listen.
 */

TITANIA.WorldClient.prototype.attach =
	function (world) {
		if (this.world !== null)
			throw new Error();
		
		this.world = world;
		
		this.world.on('loadChunk', this.loadHandler);
		this.world.on('unloadChunk', this.unloadHandler);
	};

/**
 * Detach every listeners from the attached world, so it could be safely
 * dereferenced.
 * 
 * If called when attach() has not yet been called, nothing happens.
 * 
 * @todo Reset world client.
 */

TITANIA.WorldClient.prototype.detach =
	function () {
		if (this.chunk === null)
			return ;
		
		this.world.removeListener('unloadChunk', this.unloadHandler);
		this.world.removeListener('loadChunk', this.loadHandler);
		
		this.world = null;
	};

/**
 * Handler for the `loadChunk' event of TITANIA.World
 * 
 * @private
 * 
 * @param {Object}        data       Event data.
 * @param {Number}        data.x     Chunk X position.
 * @param {Number}        data.y     Chunk Y position.
 * @param {Number}        data.z     Chunk Z position.
 * @param {TITANIA.Chunk} data.chunk Chunk data.
 * 
 * @see TITANIA.World#event:loadChunk
 */

TITANIA.WorldClient.loadChunkHandler =
	function (loadChunkData) {
		var store = this.store('chunkClientsData');
		
		var chunkClientData = new Object();
		chunkClientData.client = new TITANIA.ChunkClient();
		chunkClientData.mesh = null;
		
		chunkClientData.client.on('meshRefresh', function (meshRefreshData) {
			if (chunkClientData.mesh !== null)
				this.scene.removeObject(chunkClientData.mesh);
			chunkClientData.mesh = meshRefreshData.mesh;
			this.scene.addObject(chunkClientData.mesh);
		}.bind(this));
		
		var hash = TITANIA.ChunkUtils.getHash(loadChunkData.x, loadChunkData.y, loadChunkData.z);
		store.add(hash, chunkClientData);
		
		chunkClientData.client.attach(loadChunkData.chunk);
	};

/**
 * Handler for the `unloadChunk' event of TITANIA.World
 * 
 * @private
 * 
 * @param {Object} data   Event data.
 * @param {Number} data.x Chunk X position.
 * @param {Number} data.y Chunk Y position.
 * @param {Number} data.z Chunk Z position.
 * 
 * @see TITANIA.World#event:unloadChunk
 */

TITANIA.WorldClient.unloadChunkHandler =
	function (data) {
		var store = this.store('data(chunkClients)');
		var data = store.get(data.x, data.y, data.z);
		
		
		this.scene.removeObject(data.currentMesh);
		
		store.remove(data.x, data.y, data.z);
	};
