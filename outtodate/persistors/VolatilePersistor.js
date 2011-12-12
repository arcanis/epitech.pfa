//!provides:VolatilePersistor
//
//!requires:JS.Class
//!requires:Persistor

global.VolatilePersistor = new JS.Class(Persistor, {
    save: function (hash, logic) {
	return false;
    },

    load: function (hash, logic) {
	return false;
    },

    has: function (hash) {
	return false;
    }
});