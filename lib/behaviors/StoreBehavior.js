/**
 * @author Maël Nison
 */

/**
 * @mixin FUULIB.StoreBehavior
 */

FUULIB.StoreBehavior = /** @lends FUULIB.StoreBehavior# */ {
	
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
		
		this.stores[name] = new FUULIB.StoreBehavior.Store();
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
	 * @returns {FUULIB.StoreBehavior.Store3D}
	 */
	
	createStore3D : function (name, width, height, depth) {
		if (!this.stores)
			this.stores = new Object();
		
		if (name in this.stores)
			throw new Error();
		
		this.stores[name] = new FUULIB.StoreBehavior.Store3D(width, height, depth);
	},
	
	/**
	 * Store access.
	 * 
	 * @param {String} name Store name.
	 * 
	 * @throws {Error} If no store is defined with this name.
	 * 
	 * @returns {FUULIB.StoreBehavior.Store|FUULIB.StoreBehavior.Store3D}
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
 * @class FUULIB.StoreBehavior.Store
 * @mixes FUULIB.EventBehavior
 */

FUULIB.StoreBehavior.Store =
	function () {
		this.reset();
	};

FUULIB.ClassUtils.mix
(FUULIB.StoreBehavior.Store, FUULIB.EventBehavior);

/** 
 * Clear store.
 * 
 * After calling this method, store will be empty.
 * 
 * A 'reset' event will always be fired.
 * 
 * @fires FUULIB.StoreBehavior.Store#event:reset
 */

FUULIB.StoreBehavior.Store.prototype.reset =
	function () {
		this.data = new Object();
		
		/**
		 * @event FUULIB.StoreBehavior.Store#reset
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
 * @fires  FUULIB.StoreBehavior.Store#event:add
 * @throws {Error} When node is already defined and force is set to false.
 */

FUULIB.StoreBehavior.Store.prototype.add =
	function (key, value, force) {
		if (force === undefined)
			force = false;
		
		if (this.data.hasOwnProperty(key) && !force)
			throw new Error();
		
		this.data[key] = value;
		
		/**
		 * @event FUULIB.StoreBehavior.Store#add
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
 * @fires FUULIB.StoreBehavior.Store#event:remove
 * @throws {Error} When node is not set and force is set to false.
 */

FUULIB.StoreBehavior.Store.prototype.remove =
	function (key, force) {
		if (force === undefined)
			force = false;
		
		if (!this.data.hasOwnProperty(key) && !force)
			throw new Error();
		
		this.data[key] = null;
		delete this.data[key];
		
		/**
		 * @event FUULIB.StoreBehavior.Store#remove
		 * 
		 * @param {Object} data     Event data.
		 * @param {String} data.key Item key.
		 */
		
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

FUULIB.StoreBehavior.Store.prototype.get =
	function (key, fallback) {
		if (this.data.hasOwnProperty(key))
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

FUULIB.StoreBehavior.Store.prototype.forEach =
	function (callback) {
		for (var key in this.data)
			callback(key, this.data[key]);
		
		return this;
	};

/**
 * @class FUULIB.StoreBehavior.Store3D
 * @mixes FUULIB.EventBehavior
 * 
 * @param {Number} width  Store width.
 * @param {Number} height Store height.
 * @param {Number} depth  Store depth.
 */

FUULIB.StoreBehavior.Store3D =
	function (width, height, depth) {
		this.reset(width, height, depth);
	};

FUULIB.ClassUtils.mix
(FUULIB.StoreBehavior.Store3D, FUULIB.EventBehavior);

/**
 * Store width.
 * 
 * @readonly
 */

FUULIB.StoreBehavior.Store3D.prototype.width = null;

/**
 * Store height.
 * 
 * @readonly
 */

FUULIB.StoreBehavior.Store3D.prototype.height = null;

/**
 * Store depth.
 * 
 * @readonly
 */

FUULIB.StoreBehavior.Store3D.prototype.depth = null;

/**
 * Reset the store.
 * 
 * Could be used to dynamically change store size (but data will be lost).
 * 
 * @param {Number} width  Store width.
 * @param {Number} height Store height.
 * @param {Number} depth  Store depth.
 * 
 * @fires FUULIB.StoreBehavior.Store3D#event:reset
 */

FUULIB.StoreBehavior.Store3D.prototype.reset =
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
		 * @event FUULIB.StoreBehavior.Store3D#reset
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
 * @fires FUULIB.StoreBehavior.Store3D#event:add
 * @throws {Error} When node is already defined and force is set to false.
 */

FUULIB.StoreBehavior.Store3D.prototype.add =
	function (x, y, z, value, force) {
		if (this.data[x][y][z] !== null && !force)
			throw new Error();
		
		this.data[x][y][z] = value;
		
		/**
		 * @event FUULIB.StoreBehavior.Store3D#add
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
 * @fires FUULIB.StoreBehavior.Store3D#event:remove
 * @throws {Error} When node does not have value and force is set to false.
 */

FUULIB.StoreBehavior.Store3D.prototype.remove =
	function (x, y, z, force) {
		if (this.data[x][y][z] === null && !force)
			throw new Error();
		
		this.data[x][y][z] = null;
		
		/**
		 * @event FUULIB.StoreBehavior.Store3D#remove
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

FUULIB.StoreBehavior.Store3D.prototype.get =
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

FUULIB.StoreBehavior.Store3D.prototype.forEach =
	function (callback) {
		for (var x = 0; x < this.width; ++x)
			for (var y = 0; y < this.height; ++y)
				for (var z = 0; z < this.depth; ++z)
					callback(x, y, z, this.data[x][y][z]);
		
		return this;
	};

