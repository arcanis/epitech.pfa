/**
 * @author Maël Nison
 */

/**
 * @class TITANIA.Chunk
 * 
 * @mixes TITANIA.EventBehavior
 * @mixes TITANIA.StoreBehavior
 */

TITANIA.Chunk =
	function () {
		this.createStore3D('nodes', TITANIA.Config.CHUNK_WIDTH, TITANIA.Config.CHUNK_HEIGHT, TITANIA.Config.CHUNK_DEPTH);
	};

FUULIB.ClassUtils.mix
(TITANIA.Chunk, FUULIB.EventBehavior);

FUULIB.ClassUtils.mix
(TITANIA.Chunk, FUULIB.StoreBehavior);

/**
 * Add a node inside the chunk instance.
 * 
 * @param {Number}       x    Node X position.
 * @param {Number}       y    Node Y position.
 * @param {Number}       z    Node Z position.
 * @param {TITANIA.Node} node Node object.
 * 
 * @fires TITANIA.Chunk#event:addNode
 */

TITANIA.Chunk.prototype.addNode =
	function (x, y, z, node) {
		// Adding the node in the store with its metadatas.
		this.store('nodes').add(x, y, z, {
			x : x, y : y, z : z,
			node : node
		});
		
		/**
		 * @event TITANIA.Chunk#addNode
		 * 
		 * @param {Object}       data      Event data.
		 * @param {Number}       data.x    Node X position.
		 * @param {Number}       data.y    Node Y position.
		 * @param {Number}       data.z    Node Z position.
		 * @param {TITANIA.Node} data.node Node object.
		 */
		
		this.emit('addNode', {
			x : x, y : y, z : z,
			node : node
		});
	};

/**
 * Remove a node from the chunk instance.
 * 
 * @param {Number} x Node X position.
 * @param {Number} y Node Y position.
 * @param {Number} z Node Z position.
 * 
 * @fires TITANIA.Chunk#event:removeNode
 */

TITANIA.Chunk.prototype.remove =
	function (x, y, z) {
		// Removing the node from the store, but keeping its value for the event.
		var node = this.store('nodes').get(x, y, z);
		this.store('nodes').remove(x, y, z);
		
		/**
		 * @event TITANIA.Chunk#removeNode
		 * 
		 * @param {Object}       data      Event data.
		 * @param {Number}       data.x    Node X position.
		 * @param {Number}       data.y    Node Y position.
		 * @param {Number}       data.z    Node Z position.
		 * @param {TITANIA.Node} data.node Node object.
		 */
		
		this.emit('removeNode', {
			x : x, y : y, z : z,
			node : node
		});
	};

/**
 * Modify every chunk nodes in a single pass.
 * 
 * @param {TITANIA.StoreBehavior.Store3D} store 3D store containing nodes.
 * 
 * @fires TITANIA.Chunk#event:refreshNodes
 */

TITANIA.Chunk.prototype.copyNodes =
	function (storeSource) {
		var storeDestination = this.store('nodes');
		storeSource.forEach(function (x, y, z, node) {
			storeDestination.add(x, y, z, {
				x : x, y : y, z : z,
				node : node
			});
		});
		
		/**
		 * @event TITANIA.Chunk#copyNodes
		 * 
		 * @param {Object}                        data       Event data.
		 * @param {TITANIA.StoreBehavior.Store3D} data.store Node store.
		 */
		
		this.emit('copyNodes', {
			store : storeDestination
		});
	};
