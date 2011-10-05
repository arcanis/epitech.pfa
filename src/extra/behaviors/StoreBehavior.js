/**
 * @author Maël Nison
 */

/**
 * @mixin TITANIA.StoreBehavior
 */

TITANIA.StoreBehavior = /** @lends TITANIA.StoreBehavior# */ {
	
	/**
	 * Create a new store.
	 * 
	 * @param {String} name Requested store name.
	 * 
	 * @throws {Error} When the name is already used.
	 */
	
	createStore : function (name) {
		if (!this.stores)
			this.stores = new Object();
		
		if (name in this.stores)
			throw new Error();
		
		this.stores[name] = new TITANIA.StoreBehavior.Store();
	},
	
	/**
	 * Create a new 3D store.
	 * 
	 * @param {String} name   Requested store name.
	 * @param {Number} width  Store width.
	 * @param {Number} height Store height.
	 * @param {Number} depth  Store depth.
	 * 
	 * @throws {Error} When the name is already used.
	 * 
	 * @returns {TITANIA.StoreBehavior.Store3D}
	 */
	
	createStore3D : function (name, width, height, depth) {
		if (!this.stores)
			this.stores = new Object();
		
		if (name in this.stores)
			throw new Error();
		
		this.stores[name] = new TITANIA.StoreBehavior.Store3D(width, height, depth);
	},
	
	/**
	 * Store access.
	 * 
	 * @param {String} name Store name.
	 * 
	 * @throws {Error} If no store is defined with this name.
	 * 
	 * @returns {TITANIA.StoreBehavior.Store|TITANIA.StoreBehavior.Store3D}
	 */
	
	store : function (name) {
		if (!this.stores)
			throw new Error();
		
		if (!(name in this.stores))
			throw new Error();
		
		return this.stores[name];
	}
	
};

/**
 * @class TITANIA.StoreBehavior.Store
 * @mixes TITANIA.EventBehavior
 */

TITANIA.StoreBehavior.Store =
	function () {
		this.EventBehavior();
		this.reset();
	};

TITANIA.ClassUtils.mix
(TITANIA.StoreBehavior.Store, TITANIA.EventBehavior);

/** 
 * Clear store.
 * 
 * After calling this method, store will be empty.
 * 
 * A 'reset' event will always be fired.
 * 
 * @fires TITANIA.StoreBehavior.Store#event:reset
 */

TITANIA.StoreBehavior.Store.prototype.reset =
	function () {
		this.data = new Object();
		
		/**
		 * @event TITANIA.StoreBehavior.Store#reset
		 */
		
		this.emit('reset');
	};

/**
 * Add a node to the store, and set its value.
 * 
 * If this method succeed, an 'add' event will be emitted.
 * 
 * @param {String}   key          Node key.
 * @param {*}        value        Node value.
 * @param {Boolean} [force=false] If true, force item definition.
 * 
 * @fires  TITANIA.StoreBehavior.Store#event:add
 * @throws {Error} When node is already defined and force is set to false.
 */

TITANIA.StoreBehavior.Store.prototype.add =
	function (key, value, force) {
		if (force === undefined)
			force = false;
		
		if (key in this.data && !force)
			throw new Error();
		
		this.data[key] = value;
		
		/**
		 * @event TITANIA.StoreBehavior.Store#add
		 * 
		 * @param {Object} data       Event data.
		 * @param {String} data.key   Item key.
		 * @param {*}      data.value Item value.
		 */
		
		this.emit('add', {
			key:   key,
			value: value
		});
	};

/**
 * Remove an item from the store.
 * 
 * If this method succeed, a 'remove' event will be emitted.
 * 
 * @param {String}   key          Item key.
 * @param {Boolean} [force=false] If true, force item deletion.
 * 
 * @fires TITANIA.StoreBehavior.Store#event:remove
 * @throws {Error} When node is not set and force is set to false.
 */

TITANIA.StoreBehavior.Store.prototype.remove =
	function (key, force) {
		if (force === undefined)
			force = false;
		
		if (!(key in this.data) && !force)
			throw new Error();
		
		/**
		 * @event TITANIA.StoreBehavior.Store#remove
		 * 
		 * @param {Object} data     Event data.
		 * @param {String} data.key Item key.
		 */
		
		delete this.data[key];
		this.emit('remove', {
			key: key
		});
	};

/**
 * Get an item value from the store.
 * 
 * @param {String} key      Item key.
 * @param {*}      fallback Default value returned.
 * 
 * @throws {Error} When the node is not set and no fallback is providen.
 * 
 * @returns The node value or the fallback.
 */

TITANIA.StoreBehavior.Store.prototype.get =
	function (key, fallback) {
		if (key in this.data)
			return this.data[key];
		
		if (fallback !== undefined)
			return fallback;
		
		throw new Error();
	};

/**
 * Call a function for each node.
 * 
 * @param {Function} callback       Function callback.
 * @param {String}   callback.key   Node key.
 * @param {*}        callback.value Node value.
 */

TITANIA.StoreBehavior.Store.prototype.forEach =
	function (callback) {
		for (var key in this.data)
			callback(key, this.data[key]);
		
		return this;
	};

/**
 * @class TITANIA.StoreBehavior.Store3D
 * @mixes TITANIA.EventBehavior
 * 
 * @param {Number} width  Store width.
 * @param {Number} height Store height.
 * @param {Number} depth  Store depth.
 */

TITANIA.StoreBehavior.Store3D =
	function (width, height, depth) {
		this.reset(width, height, depth);
	};

TITANIA.ClassUtils.mix
(TITANIA.StoreBehavior.Store3D, TITANIA.EventBehavior);

/**
 * Store width.
 * 
 * @readonly
 */

TITANIA.StoreBehavior.Store3D.prototype.width = null;

/**
 * Store height.
 * 
 * @readonly
 */

TITANIA.StoreBehavior.Store3D.prototype.height = null;

/**
 * Store depth.
 * 
 * @readonly
 */

TITANIA.StoreBehavior.Store3D.prototype.depth = null;

/**
 * Reset the store.
 * 
 * Could be used to dynamically change store size (but data will be lost).
 * 
 * @param {Number} width  Store width.
 * @param {Number} height Store height.
 * @param {Number} depth  Store depth.
 * 
 * @fires TITANIA.StoreBehavior.Store3D#event:reset
 */

TITANIA.StoreBehavior.Store3D.prototype.reset =
	function (width, height, depth) {
		this.width = width;
		this.height = height;
		this.depth = depth;
		
		this.data = new Array(width);
		for (var x = 0; x < width; ++x) {
			this.data[x] = new Array(height);
			for (var y = 0; y < height; ++y) {
				this.data[x][y] = new Array(depth);
				for (var z = 0; z < depth; ++z) {
					this.data[x][y][z] = null;
				}
			}
		}
		
		/**
		 * @event TITANIA.StoreBehavior.Store3D#reset
		 * 
		 * @param {Object} data        Event data.
		 * @param {Number} data.width  Store width.
		 * @param {Number} data.height Store height.
		 * @param {Number} data.depth  Store depth.
		 */
		
		this.emit('reset', {
			width: width, height: height, depth: depth
		});
	};

/**
 * Set an node value in the store.
 * 
 * @param {Number}   x            Node X position.
 * @param {Number}   y            Node Y position.
 * @param {Number}   z            Node Z position.
 * @param {*}        value        Node value.
 * @param {Boolean} [force=false] If true, force node assignation.
 * 
 * @fires TITANIA.StoreBehavior.Store3D#event:add
 * @throws {Error} When node is already defined and force is set to false.
 */

TITANIA.StoreBehavior.Store3D.prototype.add =
	function (x, y, z, value, force) {
		if (this.data[x][y][z] !== null && !force)
			throw new Error();
		
		this.data[x][y][z] = value;
		
		/**
		 * @event TITANIA.StoreBehavior.Store3D#add
		 * 
		 * @param {Object} data       Event data.
		 * @param {Number} data.x     Node X position.
		 * @param {Number} data.y     Node Y position.
		 * @param {Number} data.z     Node Z position.
		 * @param {*}      data.value Node value.
		 */
		
		this.emit('add', {
			x: x, y: y, z: z,
			value: value
		});
	};

/**
 * Unset the value of a node.
 * 
 * @param {Number}   x            Node X position.
 * @param {Number}   y            Node Y position.
 * @param {Number}   z            Node Z position.
 * @param {Boolean} [force=false] If true, force node deletion.
 * 
 * @fires TITANIA.StoreBehavior.Store3D#event:remove
 * @throws {Error} When node does not have value and force is set to false.
 */

TITANIA.StoreBehavior.Store3D.prototype.remove =
	function (x, y, z, force) {
		if (this.data[x][y][z] === null && !force)
			throw new Error();
		
		this.data[x][y][z] = null;
		
		/**
		 * @event TITANIA.StoreBehavior.Store3D#remove
		 * 
		 * @param {Object} data   Event data.
		 * @param {Number} data.x Node X position.
		 * @param {Number} data.y Node Y position.
		 * @param {Number} data.z Node Z position.
		 */
		
		this.emit('remove', {
			x: x, y: y, z: z
		});
	};

/**
 * Get a node value.
 * 
 * @param {Number}  x         Node X position.
 * @param {Number}  y         Node Y position.
 * @param {Number}  z         Node Z position.
 * @param {*}      [fallback] If set, this value is returned if the node is not
 *                            set.
 * 
 * @throws {Error} When the node is not set and no fallback is providen.
 * 
 * @returns The node value or the fallback.
 */

TITANIA.StoreBehavior.Store3D.prototype.get =
	function (x, y, z, fallback) {
		var value = this.data[x][y][z];
		if (value !== null)
			return value;
		
		if (fallback === undefined)
			throw new Error();
		
		return fallback;
	};

/**
 * Call a function for each node.
 * 
 * @param {Function} callback       Function callback.
 * @param {Number}   callback.x     Node X position.
 * @param {Number}   callback.y     Node Y position.
 * @param {Number}   callback.z     Node Z position.
 * @param {*}        callback.value Node value.
 */

TITANIA.StoreBehavior.Store3D.prototype.forEach =
	function (callback) {
		for (var x = 0; x < this.width; ++x)
			for (var y = 0; y < this.height; ++y)
				for (var z = 0; z < this.depth; ++z)
					callback(x, y, z, this.data[x][y][z]);
		
		return this;
	};

