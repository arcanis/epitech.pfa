//!provides:APP.TestBlock.client
// 
//!requires:APP.Block.Client
//!requires:APP.TestBlock
//!requires:JS.Singleton

global.APP.TestBlock.client = new JS.Singleton(APP.Block.Client, {
});
