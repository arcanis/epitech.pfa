/**
 * @author Maël Nison
 */

/**
 * @class TITANIA.Universe
 * @mixes TITANIA.EventBehavior
 */

TITANIA.Universe =
	function () {
	};

TITANIA.ClassUtils.mix
(TITANIA.Universe, TITANIA.EventBehavior);

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
