//!provides:APP.PlayerManager
//!requires:JS.Class
//!requires:JS.Hash

global.APP.PlayerManager = JS.Class({

  initialize : function () {
    this.store = new JS.Hash();
    this.nbPlayers = 0;
  },

  addPlayer : function (socket) {
    this.store.put(socket, new Player(socket));
    this.nbPlayers++;
  },
  
  getPlayer : function (socket) {
    this.store.get(socket);
  },

  removePlayer : function (socket) {
    this.store.remove(socket);
    this.nbPlayers--;
  }
  
});
