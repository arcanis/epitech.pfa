//!requires:Logic.Event.Voxel.AlterLife
//!provides:Logic.Event.Voxel.AlterLife.Before
//!requires:Event.Base
// 
//!requires:JS.Class
// 
//!requires:Event.Cancelable

Logic.Event.Voxel.AlterLife.Before = new JS.Class('Logic.Event.Voxel.AlterLife.Before', Event.Base, {
	
	include : [ Event.Cancelable ]
	
});
