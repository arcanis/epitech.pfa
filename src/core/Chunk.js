/**
 * @author Maël Nison
 */

/**
 * @class TITANIA.Chunk
 * @mixes TITANIA.EventBehavior
 * @mixes TITANIA.StoreBehavior
 */

TITANIA.Chunk =
	function () {
		this.createStore3D('nodes', TITANIA.Config.CHUNK_WIDTH, TITANIA.Config.CHUNK_HEIGHT, TITANIA.Config.CHUNK_DEPTH);
	};

TITANIA.ClassUtils.mix(TITANIA.Chunk, TITANIA.EventBehavior);
TITANIA.ClassUtils.mix(TITANIA.Chunk, TITANIA.StoreBehavior);

/**
 * Add a block inside a block.
 * 
 * @param {Number}        x    Node X position.
 * @param {Number}        y    Node Y position.
 * @param {Number}        z    Node Z position.
 * @param {TITANIA.Block} type Block type.
 * 
 * @fires TITANIA.Chunk#event:addNode
 */

TITANIA.Chunk.prototype.add =
	function (x, y, z, type) {
		this.store('nodes').add(x, y, z, type);
		
		/**
		 * @event TITANIA.Chunk#addNode
		 * 
		 * @param {Object}        data      Event data.
		 * @param {Number}        data.x    Node X position.
		 * @param {Number}        data.y    Node Y position.
		 * @param {Number}        data.z    Node Z position.
		 * @param {TITANIA.Block} data.type Block type.
		 */
		
		this.emit('addNode', {
			x : x, y : y, z : z,
			type : type
		});
	};

/**
 * Remove a block from a node.
 * 
 * @param {Number} x Node X position.
 * @param {Number} y Node Y position.
 * @param {Number} z Node Z position.
 * 
 * @fires TITANIA.Chunk#event:removeNode
 */

TITANIA.Chunk.prototype.remove =
	function (x, y, z) {
		this.store('nodes').remove(x, y, z);
		
		/**
		 * @event TITANIA.Chunk#removeNode
		 * 
		 * @param {Object} data   Event data.
		 * @param {Number} data.x Node X position.
		 * @param {Number} data.y Node Y position.
		 * @param {Number} data.z Node Z position.
		 */
		
		this.emit('removeNode', {
			x : x, y : y, z : z
		});
	};

/**
 * Modify every chunk nodes in a single pass.
 * 
 * @param {TITANIA.StoreBehavior.Store3D} store 3D store containing block types.
 * 
 * @fires TITANIA.Chunk#event:refreshNodes
 */

TITANIA.Chunk.prototype.buffer =
	function (store) {
		var thatStore = this.store('nodes');
		store.forEach(function (x, y, z, type) {
			thatStore.add(x, y, z, type);
		});
		
		/**
		 * @event TITANIA.Chunk#refreshNodes
		 * 
		 * @param {Object}                        data       Event data.
		 * @param {TITANIA.StoreBehavior.Store3D} data.store Node store.
		 */
		
		this.emit('refreshNodes', {
			store : thatStore
		});
	};

/**
 * Set every chunk nodes to a unique block type.
 * 
 * @param {TITANIA.Block} type Block type.
 * 
 * @fires TITANIA.Chunk#event:refreshNodes
 */

TITANIA.Chunk.prototype.fill =
	function (type) {
		var thatStore = this.store('nodes');
		thatStore.forEach(function (x, y, z) {
			thatStore.add(x, y, z, type);
		});
		
		/**
		 * @event TITANIA.Chunk#refreshNodes
		 * 
		 * @param {Object}                        data       Event data.
		 * @param {TITANIA.StoreBehavior.Store3D} data.store Node store.
		 */
		
		this.emit('refreshNodes', {
			store : thatStore
		});
	};
