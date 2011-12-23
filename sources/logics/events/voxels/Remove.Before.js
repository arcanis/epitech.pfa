//!requires:Logic.Event.Voxel.Remove
//!provides:Logic.Event.Voxel.Remove.Before
//!requires:Event.Base
// 
//!requires:JS.Class
// 
//!requires:Event.Cancelable

Logic.Event.Voxel.Remove.Before = new JS.Class('Logic.Event.Voxel.Remove.Before', Logic.Event.Voxel.Base, {
	
	include : [ Event.Cancelable ]
	
});
