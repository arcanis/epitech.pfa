/**
 * @author Maël Nison
 */

/**
 * @class TITANIA.PlainWorld
 * @extends TITANIA.World
 */

TITANIA.PlainWorld =
	function () {
		TITANIA.World.apply(this);
	};

TITANIA.ClassUtils.extend(TITANIA.PlainWorld, TITANIA.World);

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

TITANIA.PlainWorld.prototype.request =
	function (x, y, z) {
		var chunk = new TITANIA.Chunk();
		if (y === 0)
			chunk.fill(TITANIA.DirtBlock);
		this.load(x, y, z, chunk);
	};
