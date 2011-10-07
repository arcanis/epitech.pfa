/**
 * @author Maël Nison
 */

/**
 * @class TITANIA.VisualWorld
 * 
 * @mixes FUULIB.StoreBehavior
 * @mixes FUULIB.UpdateBehavior
 * 
 * @param {TITANIA.World} world World to represents.
 */

TITANIA.VisualWorld =
	function (parent, world) {
		this.parent = parent;
		this.world = world;
		
		this.createStore('chunks');
		
		this.addChunkEvent = this.addChunkEvent.bind(this);
		this.removeChunkEvent = this.removeChunkEvent(this);
		
		this.world.on('addChunk', this.addChunkEvent);
		this.world.on('removeChunk', this.removeChunkEvent);
	};

FUULIB.ClassUtils.mix
(TITANIA.VisualWorld, FUULIB.UpdateBehavior);

/**
 * Generated world mesh.
 * 
 * @readonly
 */

TITANIA.VisualWorld.prototype.mesh = null;

/**
 * Generate the world mesh.
 */

TITANIA.VisualWorld.prototype.update =
	function () {
		var geometry = new THREE.Geometry();
		
		// We merge every visual chunks in a single geometry
		this.store('visualChunks').forEach(function (hash, visualChunk) {
			visualChunk.upToDate || visualChunk.update();
			THREE.GeometryUtils.merge(geometry, visualChunk.mesh);
		});
		
		// Then we replace the old mesh by the new one.
		this.mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial());
		
		// Finaly, we reset the up-to-date flag.
		this.upToDate = true;
	};

/**
 * Remove any reference to external resources.
 * 
 * Object instance should not be used after this.
 */

TITANIA.VisualWorld.prototype.free =
	function () {
		// No reference on the world, NOTHING !
		this.world = null;
		
		// No reference on the generated mesh, NOTHING !
		this.mesh = null;
		
		// Reset store.
		this.store('visualChunks').forEach(function (hash, visualChunk) { visualChunk.free(); });
		this.store('visualChunks').reset();
		
		// Drop event listeners.
		this.world.removeListener('addChunk', this.addChunkEvent);
		this.world.removeListener('removeChunk', this.removeChunkEvent);
		
		/// I won't notify that the instance has changed, because
		/// maybe markAsUpdated() will trigger an event, later.
	};

/**
 * This function is meant to be binded to the addChunk event of the World class.
 * 
 * @private
 * 
 * @param {Object}        addChunkData       Event data.
 * @param {Number}        addChunkData.x     Chunk X position.
 * @param {Number}        addChunkData.y     Chunk Y position.
 * @param {Number}        addChunkData.z     Chunk Z position.
 * @param {TITANIA.Chunk} addChunkData.chunk Chunk object.
 */

TITANIA.VisualWorld.prototype.addChunkEvent =
	function (addChunkData) {
		var hash = TITANIA.World.getHash(addChunkData.x, addChunkData.y, addChunkData.z);
		
		// Creating the object.
		var visualChunk = new TITANIA.VisualChunk(this, addChunkData.chunk);
		visualChunk.setPosition(addChunkData.x, addChunkData.y, addChunkData.z);
		
		// Adding the visual chunk in the store with its metadatas.
		this.store('visualChunks').add(hash, {
			x : x, y : y, z : z,
			visualChunk : visualChunk
		});
		
		// Mark visual world as modified.
		this.markAsUpdated();
	};

/**
 * This function is meant to be binded to the removeChunk event of the World
 * class.
 * 
 * @private
 * 
 * @param {Object}        addChunkData       Event data.
 * @param {Number}        addChunkData.x     Chunk X position.
 * @param {Number}        addChunkData.y     Chunk Y position.
 * @param {Number}        addChunkData.z     Chunk Z position.
 * @param {TITANIA.Chunk} addChunkData.chunk Chunk object.
 */

TITANIA.VisualWorld.prototype.removeChunkEvent =
	function (removeChunkData) {
		var hash = TITANIA.World.getHash(removeChunkData.x, removeChunkData.y, removeChunkData.z);
		
		// Free the visual chunk resources.
		this.store('visualChunks').get(hash).visualChunk.free();
		
		// Remove the visual chunk from the store.
		this.store('visualChunks').remove(hash);
		
		// Mark visual world as modified.
		this.markAsUpdated();
	};
