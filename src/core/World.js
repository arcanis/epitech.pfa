/**
 * @author Maël Nison
 */

/**
 * @class TITANIA.World
 * 
 * @mixes FUULIB.EventBehavior
 * @mixes FUULIB.StoreBehavior
 */

TITANIA.World =
	function () {
		this.createStore('chunks');
	};

FUULIB.ClassUtils.mix
(TITANIA.World, FUULIB.EventBehavior);

FUULIB.ClassUtils.mix
(TITANIA.World, FUULIB.StoreBehavior);

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

TITANIA.World.prototype.requestChunk =
	function () {
		TITANIA.ClassUtils.pure();
	};

/**
 * Returns true if the world instance contains the chunk.
 * 
 * @param {Number} x Chunk X position.
 * @param {Number} y Chunk Y position.
 * @param {Number} z Chunk Z position.
 * 
 * @returns {Boolean} True if the chunk is loaded.
 */

TITANIA.World.prototype.hasChunk =
	function (x, y, z) {
		var hash = TITANIA.World.getHash(x, y, z);
		
		return this.store('chunks').get(x, y, z, false) !== false;
	};

/**
 * Add a chunk inside the world instance.
 * 
 * @param {Number}        x     Chunk X position.
 * @param {Number}        y     Chunk Y position.
 * @param {Number}        z     Chunk Z position.
 * @param {TITANIA.Chunk} chunk Chunk data.
 * 
 * @fires TITANIA.World#event:addChunk
 */

TITANIA.World.prototype.addChunk =
	function (x, y, z, chunk) {
		var hash = TITANIA.World.getHash(x, y, z);
		
		// Adding the chunk in the store with its metadatas.
		this.store('chunks').add(hash, {
			x : x, y : y, z : z,
			chunk : chunk
		});
		
		/**
		 * @event TITANIA.World#addChunk
		 * 
		 * @param {Object}        data        Event data.
		 * @param {Number}        param.x     Chunk X position.
		 * @param {Number}        param.y     Chunk Y position.
		 * @param {Number}        param.z     Chunk Z position.
		 * @param {TITANIA.Chunk} param.chunk Chunk data.
		 */
		
		this.emit('addChunk', {
			x : x, y : y, z : z,
			chunk : chunk
		});
	};

/**
 * Remove a chunk from the world instance.
 * 
 * @param {Number} x Chunk X position.
 * @param {Number} y Chunk Y position.
 * @param {Number} z Chunk Z position.
 * 
 * @fires TITANIA.World#event:removeChunk
 */

TITANIA.World.prototype.removeChunk =
	function (x, y, z) {
		var hash = TITANIA.World.getHash(x, y, z);
		
		// Removing the chunk from the store, but keeping its value for the event.
		var chunk = this.store('chunks').get(x, y, z);
		this.store('chunks').remove(hash);
		
		/**
		 * @event TITANIA.World#removeChunk
		 * 
		 * @param {Object}        data        Event data.
		 * @param {Number}        param.x     Chunk X position.
		 * @param {Number}        param.y     Chunk Y position.
		 * @param {Number}        param.z     Chunk Z position.
		 * @param {TITANIA.Chunk} param.chunk Chunk data.
		 */
		
		this.emit('removeChunk', {
			x : x, y : y, z : z,
			chunk : chunk
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
	var store = this.store('chunks');
	
	var origin = new THREE.Vector3(ox, oy, oz);
	
	// Processing visible bounds of the world.
	var sx = (ox - TITANIA.Config.FAR_DISTANCE) / TITANIA.Config.CHUNK_WIDTH,  ex = (ox + TITANIA.Config.FAR_DISTANCE) / TITANIA.Config.CHUNK_WIDTH;
	var sy = (oy - TITANIA.Config.FAR_DISTANCE) / TITANIA.Config.CHUNK_HEIGHT, ey = (oy + TITANIA.Config.FAR_DISTANCE) / TITANIA.Config.CHUNK_HEIGHT;
	var sz = (oz - TITANIA.Config.FAR_DISTANCE) / TITANIA.Config.CHUNK_DEPTH,  ez = (oz + TITANIA.Config.FAR_DISTANCE) / TITANIA.Config.CHUNK_DEPTH;
	
	// We check which are the displayed chunks.
	for (var x = sx; x <= ex; ++x) {
		for (var y = sy; y <= ey; ++y) {
			for (var z = sz; z <= ez; ++z) {
				var hash = TITANIA.World.getHash(x, y, z);
				var data = store.get(hash, null);
				
				// If the chunk is already displayed, we just forbid remove him later.
				if (data !== null)
					data.doNotTrash = true;
				
				// Else, we push it in the list of chunks to request.
				else
					loadingList.push(hash);
			}
		}
	}
	
	// For each currently loaded chunk :
	store.forEach(function (key, item) {
		// If the chunk is not displayed, it don't have doNotTrash flag and we remove it.
		if (!data.hasOwnProperty('doNotTrash'))
			store.remove(key);
		
		// Else, we just reset its flag.
		else
			delete data.doNotTrash;
	});
	
	// Now, we can freely request all new chunks.
	for (var t = 0; t < loadingList.length; ++t) {
		this.request(loadingList[t]);
	}
};

/**
 * Process the hash for a given position.
 * 
 * @param {Number} x Node X position.
 * @param {Number} y Node Y position.
 * @param {Number} z Node Z position.
 * 
 * @returns {String} Hash identifying the position.
 */

TITANIA.World.getHash =
	function (x, y, z) {
		return [x, y, z].join(',');
	};
