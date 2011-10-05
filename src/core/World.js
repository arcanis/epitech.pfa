/**
 * @author Maël Nison
 */

/**
 * @class TITANIA.World
 * @mixes TITANIA.EventBehavior
 * @mixes TITANIA.StoreBehavior
 */

TITANIA.World =
	function () {
		this.system = { x : 0, y : 0, z : 0 };
		this.createStore3D('chunks', TITANIA.Config.WORLD_WIDTH, 1, TITANIA.Config.WORLD_DEPTH);
	};

TITANIA.ClassUtils.mix(TITANIA.World, TITANIA.EventBehavior);
TITANIA.ClassUtils.mix(TITANIA.World, TITANIA.StoreBehavior);

/**
 * Request a chunk.
 * 
 * The chunk is loaded asynchroneously, so it could not be loaded when the call
 * return.
 * 
 * @param {Number} x Chunk X position.
 * @param {Number} y Chunk Y position.
 * @param {Number} z Chunk Z position.
 */

TITANIA.World.prototype.request =
	function (x, y, z) {
		throw Error('This function has not been implemented. Maybe you\'ve instancied a World instead of a NetworkWorld / PlainWorld / HardDriveWorld ?');
	};

/**
 * Load a chunk in the world memory.
 * 
 * @param {Number}        x     Chunk X position.
 * @param {Number}        y     Chunk Y position.
 * @param {Number}        z     Chunk Z position.
 * @param {TITANIA.Chunk} chunk Chunk data.
 */

TITANIA.World.prototype.load =
	function (x, y, z, chunk) {
		var hash = TITANIA.ChunkUtils.getHash(x, y, z);
		this.store('chunks').add(hash, {
			x : x, y : y, z : z,
			chunk : chunk
		});
		
		/**
		 * @event TITANIA.World#loadChunk
		 * 
		 * @param {Object}        data        Event data.
		 * @param {Number}        param.x     Chunk X position.
		 * @param {Number}        param.y     Chunk Y position.
		 * @param {Number}        param.z     Chunk Z position.
		 * @param {TITANIA.Chunk} param.chunk Chunk data.
		 */
		
		this.emit('loadChunk', {
			x : x, y : y, z : z,
			chunk : chunk
		});
	};

/**
 * Unload a chunk from the world memory.
 * 
 * @param {Number} x Chunk X position.
 * @param {Number} y Chunk Y position.
 * @param {Number} z Chunk Z position.
 */

TITANIA.World.prototype.unload =
	function (x, y, z) {
		var hash = TITANIA.ChunkUtils.getHash(x, y, z);
		this.store('chunks').remove(hash);
		
		/**
		 * @event TITANIA.World#unloadChunk
		 * 
		 * @param {Object} data    Event data.
		 * @param {Number} param.x Chunk X position.
		 * @param {Number} param.y Chunk Y position.
		 * @param {Number} param.z Chunk Z position.
		 */
		
		this.emit('unloadChunk', {
			x : x, y : y, z : z
		});
	};

/**
 * Auto-update chunks, removing far chunks and requesting new ones.
 * 
 * @param {Number} ox Origin X position.
 * @param {Number} oy Origin Y position.
 * @param {Number} oz Origin Z position.
 */

TITANIA.World.prototype.autoUpdate = function (ox, oy, oz) {
	var chunks = this.store('chunks');
	
	var origin = new THREE.Vector3(ox, oy, oz);
	
	var sx = (ox - TITANIA.Config.FAR_DISTANCE) / TITANIA.Config.CHUNK_WIDTH,  ex = (ox + TITANIA.Config.FAR_DISTANCE) / TITANIA.Config.CHUNK_WIDTH;
	var sy = (oy - TITANIA.Config.FAR_DISTANCE) / TITANIA.Config.CHUNK_HEIGHT, ey = (oy + TITANIA.Config.FAR_DISTANCE) / TITANIA.Config.CHUNK_HEIGHT;
	var sz = (oz - TITANIA.Config.FAR_DISTANCE) / TITANIA.Config.CHUNK_DEPTH,  ez = (oz + TITANIA.Config.FAR_DISTANCE) / TITANIA.Config.CHUNK_DEPTH;
	
	for (var x = sx; x <= ex; ++x) {
		for (var y = sy; y <= ey; ++y) {
			for (var z = sz; z <= ez; ++z) {
				var hash = TITANIA.ChunkUtils.getHash(x, y, z);
				var data = chunks.get(hash, null);
				
				if (data === null)
					loadingList.push(hash);
				else
					data.doNotTrash = true;
			}
		}
	}
	
	chunks.forEach(function (hash, data) {
		if (data.hasOwnProperty('doNotTrash')) {
			delete data.doNotTrash;
		} else {
			chunks.remove(hash);
		}
	});
	
	for (var t = 0; t < loadingList.length; ++t) {
		this.request(loadingList[t]);
	}
};
