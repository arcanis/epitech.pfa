//!provides:APP.TestBlock.server
// 
//!requires:APP.Block.Server
//!requires:APP.TestBlock
//!requires:JS.Singleton

global.APP.TestBlock.server = new JS.Singleton(APP.Block.Server, {
});
