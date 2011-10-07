/**
 * @author Maël Nison
 */

/**
 * @class TITANIA.Node
 * @mixes TITANIA.EventBehavior
 */

TITANIA.Node =
	function (type) {
		this.type = type;
	};

TITANIA.ClassUtils.mix(TITANIA.Node, TITANIA.EventBehavior);

/**
 * Node type.
 * 
 * @readonly
 */

TITANIA.Node.prototype.type = null;
