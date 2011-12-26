//!requires:Logic
//!provides:Logic.Apis
// 
//!requires:JS.Class
//!requires:JS.Observable
// 
//!requires:Logic.Module.Voxels

Logic.Apis = new JS.Class('Logic.Apis', {
	
	include : [
		
		JS.Observable,
		
		Logic.Module.Voxels
		
	]
	
});
