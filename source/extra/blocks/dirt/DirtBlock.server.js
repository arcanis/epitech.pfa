//!provides:APP.DirtBlock.server
// 
//!requires:APP.Block.Server
//!requires:APP.DirtBlock
//!requires:JS.Singleton

global.APP.DirtBlock.server = new JS.Singleton(APP.Block.Server, {
	initialize: function () {
		this.resistance = 1;
	}
});
