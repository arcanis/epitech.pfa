//!provides:APP.Chunk
//!requires:JS.Class
//!requires:JS.Hash
//!requires:JS.Observable

global.APP.Chunk = new JS.Class({
	include: JS.Observable,
	
	initialize: function () {
		this.nodes = new JS.Hash();
	},
	
	// todo : what should be the addNode() behavior when the node already exists ?
	addNode: function (point, node) {
		if (this.nodes.hasKey(point) === true) {
			this.nodes.store(point, node);
			this.notifyObservers('addNode', {
				point: point,
				node: node
			});
		} else {
			throw new Error();
		}
	},
	
	// todo : what should be the removeNode() behavior when the node does not exists ?
	removeNode: function (point) {
		if (this.nodes.hasKey(point) === false) {
			var node = this.nodes.get(point);
			this.nodes.remove(point);
			this.notifyObservers('removeNode', {
				point: point,
				node: node
			});
		} else {
			throw new Error();
		}
	}
});
