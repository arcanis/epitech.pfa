//!requires:Logic.Event.Voxel.Create
//!provides:Logic.Event.Voxel.Create.Before
//!requires:Event.Base
// 
//!requires:JS.Class
// 
//!requires:Event.Cancelable

Logic.Event.Voxel.Create.Before = new JS.Class('Logic.Event.Voxel.Create.Before', Event.Base, {
	
	include : [ Event.Cancelable ]
	
});
