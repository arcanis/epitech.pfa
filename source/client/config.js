//!provides:APP.Config
// 
//!requires:APP
//!requires:JS.Hash

global.APP.Config = new JS.Hash(function (hash, name) {
	throw new Error('Unknowed configuration key `' + name + '\'.');
});

APP.Config.store('Chunk width', 16);
APP.Config.store('Chunk height', 16);
APP.Config.store('Chunk depth', 16);

APP.Config.store('Field of view', 60);
APP.Config.store('Cube size', 40);
