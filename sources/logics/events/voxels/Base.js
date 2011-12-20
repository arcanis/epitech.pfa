//!requires:Logic.Event.Voxel
//!provides:Logic.Event.Voxel.Base
//!requires:Logic.Event.Base

Logic.Event.Voxel.Base = new JS.Class('Logic.Event.Voxel.Base', Logic.Event.Base, {
	
	initialize : function ( point ) {
		
		this._point = point;
		
	},
	
	coord : function ( ) {
		
		return this._point;
		
	}
	
});
