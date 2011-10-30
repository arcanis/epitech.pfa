//!provides:Game
// 
//!requires:JS.Class

global.Game = new JS.Class({
	include: Pluggable,
	
	setup: function () {
		this.client = null;
		this.server = null;
	}
});
