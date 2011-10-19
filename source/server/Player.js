//!provides:APP.Player
//!requires:JS.Class

global.APP.Player = JS.Class({
  
  initialize : function (socket) {
    this.socket = socket;
  }
  
});
