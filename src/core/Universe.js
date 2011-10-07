/**
 * @author Maël Nison
 */

/**
 * @class TITANIA.Universe
 * 
 * @mixes FUULIB.EventBehavior
 */

TITANIA.Universe =
	function () {
	};

FUULIB.ClassUtils.mix
(TITANIA.Universe, FUULIB.EventBehavior);

/**
 * Related world.
 * 
 * @readonly
 */

TITANIA.Universe.prototype.world = null;

/**
 * Set the universe world.
 */

TITANIA.Universe.prototype.setWorld =
	function (world) {
		this.world = world;
		
		/**
		 * @event TITANIA.Universe#worldSet
		 * 
		 * @param {Object}        data       Event data.
		 * @param {TITANIA.World} data.world World object.
		 */
		
		this.emit('worldSet', {
			world : world
		});
	};
