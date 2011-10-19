//!provides:APP.Universe
//!requires:JS.Class
//!requires:JS.Hash

// //!requires:JS.Observable
// //!provides:APP.Issue
// //!provides:APP.Publisher


// global.APP.Issue = new JS.Class({
// 
//   initialize: function(publisher) {
//     this.publisher = publisher;
//   }
// 
// });
// 
// global.APP.Publisher = new JS.Class({
// 
//   include: JS.Observable,
// 
//   initialize: function(name) {
//     this.name = name;
//     this.issues = [];
//   },
// 
//   publishIssue: function() {
//     var issue = new Issue(this);
//     this.issues.push(issue);
//     this.notifyObservers(issue);
//   }
// 
// });

global.APP.Universe = JS.Class({

  initialize : function () {
    this.chunks = new JS.Hash();
//     this.events = new TITANIA.Publisher();
  },

  addChunk : function (key, value) {
    this.chunks.store(key, value);
//     this.events.publishIssue("lol");
  },

  removeChunk : function (key) {
    return this.chunks.remove(key);
  }

});
