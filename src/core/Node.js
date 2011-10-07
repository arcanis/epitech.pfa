/**
 * @author Maël Nison
 */

/**
 * @class TITANIA.Node
 * 
 * @mixes FUULIB.EventBehavior
 */

TITANIA.Node =
	function (type) {
		this.type = type;
	};

FUULIB.ClassUtils.mix
(TITANIA.Node, FUULIB.EventBehavior);

/**
 * Node type.
 * 
 * @readonly
 */

TITANIA.Node.prototype.type = null;
