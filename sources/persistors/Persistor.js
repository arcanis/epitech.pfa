//!provides:Persistor
// 
//!requires:JS.Class

global.Persistor = new JS.Class({
    save: function () {
	throw new Error("Persistor Error : Must be overloaded");
    },

    load: function () {
	throw new Error("Persistor Error : Must be overloaded");
    },

    has: function () {
	throw new Error("Persistor Error : Must be overloaded");
    }
});