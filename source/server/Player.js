//!provides:APP.Player
//!requires:JS.Class

global.APP.Player = new JS.Class({
  
  initialize : function (socket) {
    this.socket = socket;
  }
  
});
