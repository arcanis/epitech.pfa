//!requires:Game
//!provides:Game.Base
// 
//!requires:JS.Class

Game.Base = new JS.Class('Game.Base', {
	
	initialize: function () {
		
		this.client = null;
		
		this.server = null;
		
	}
	
});
