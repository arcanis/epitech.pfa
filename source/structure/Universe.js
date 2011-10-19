//!provides:APP.Universe
//!requires:JS.Class
//!requires:JS.Hash
//!requires:JS.Observable

global.APP.Universe = new JS.Class({
	include: JS.Observable,
	
	initialize : function () {
		this.chunks = new JS.Hash();
	},
	
	// todo : should addChunk throws when the chunk already exists ?
	addChunk : function (point, chunk) {
		if (this.chunks.hasKey(point)) {
			this.chunks.store(point, chunk);
			this.notifyObservers('addChunk', {
				point: point,
				chunk: chunk
			});
		}
	},
	
	// todo : should removeChunk throws when the chunk does not exists ?
	removeChunk : function (point) {
		if (this.chunks.hasKey(point)) {
			var chunk = this.chunks.get(point);
			this.chunks.remove(point);
			this.notifyObservers('removeChunk', {
				point: point,
				chunk: chunk
			});
		}
	}
	
});
