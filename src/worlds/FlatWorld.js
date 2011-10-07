/**
 * @author Maël Nison
 */

/**
 * @class TITANIA.FlatWorld
 * @extends TITANIA.World
 * 
 * @param {TITANIA.Block} type Block type.
 */

TITANIA.FlatWorld =
	function (type) {
		TITANIA.World.apply(this);
		
		this.type = type;
	};

TITANIA.ClassUtils.extend(TITANIA.FlatWorld, TITANIA.World);

/**
 * Request a chunk.
 * 
 * On a flat world, the chunk is loaded synchroneously.
 * 
 * @param {Number} x Chunk X position.
 * @param {Number} y Chunk Y position.
 * @param {Number} z Chunk Z position.
 */

TITANIA.FlatWorld.prototype.requestChunk =
	function (x, y, z) {
		var chunk = new TITANIA.Chunk();
		
		if (y === 0) {
			var store = new TITANIA.StoreBehavior.Store3D(TITANIA.Config.CHUNK_WIDTH, TITANIA.Config.CHUNK_HEIGHT, TITANIA.Config.CHUNK_DEPTH);
			store.forEach(function (x, y, z) { store.add(x, y, z, new TITANIA.Node(this.type)); });
		}
		
		this.addChunk(x, y, z, chunk);
	};
