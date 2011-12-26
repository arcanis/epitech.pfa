//!requires:Logic.Module
//!provides:Logic.Module.Voxels
// 
//!requires:JS.Module
// 
//!uses:Value3
// 
//!uses:Logic.Event.Voxel.Create.Before
//!uses:Logic.Event.Voxel.Create
//!uses:Logic.Event.Voxel.Remove.Before
//!uses:Logic.Event.Voxel.Remove
//!uses:Logic.Event.Voxel.AlterLife.Before
//!uses:Logic.Event.Voxel.AlterLife

Logic.Module.Voxels = new JS.Module({
	
	voxels : function ( ) {
		
		return ( this._voxels = this._voxels || [ ] );
		
	},
	
	injectVoxelChunk : function ( origin, chunk ) {
		
		var point = new Value3( );
		
		var lX = chunk.length;
		var lY = chunk[0].length;
		var lZ = chunk[0][0].length;
		
		var voxels = this.voxels( );
		
		for ( point.x = origin.x; point.x < lX; ++point.x ) {
			
			for ( point.y = origin.y; point.y < lY; ++point.y ) {
				
				for ( point.z = origin.z; point.z < lZ; ++point.z ) {
					
					voxels[ point ] = chunk[ point.x ][ point.y ][ point.z ];
					
				}
				
			}
			
		}
		
	},
	
	setVoxelType : function ( point, type ) {
		
		var voxelAccessEvent = new Logic.Event.Voxel.Access( point );
		this.notifyObservers( voxelAccessEvent );
		
		var voxels = this.voxels( );
		
		if ( voxels.hasOwnProperty( point ) )
			return false;
		
		var voxel = new type( );
		
		var beforeVoxelCreateEvent = new Logic.Event.Voxel.Create.Before( point, voxel );
		this.notifyObservers( beforeVoxelCreateEvent );
		
		if ( beforeVoxelCreationEvent.isCanceled( ) )
			return false;
		
		voxels[ point ] = voxel;
		
		var voxelCreateEvent = new Logic.Event.Voxel.Create( point, voxel );
		this.notifyObservers( voxelCreateEvent );
		
		return true;
		
	},
	
	removeVoxel : function ( point ) {
		
		var voxelAccessEvent = new Logic.Event.Voxel.Access( point );
		this.notifyObservers( voxelAccessEvent );
		
		var voxels = this.voxels( );
		
		if ( ! voxels.hasOwnProperty( point ) )
			return true;
		
		var voxel = voxels[ point ];
		
		var beforeVoxelRemoveEvent = new Logic.Event.Voxel.Remove.Before( point, voxel );
		this.notifyObservers( beforeVoxelRemoveEvent );
		
		if ( beforeVoxelRemoveEvent.isCanceled( ) )
			return false;
		
		voxels[ point ] = null;
		delete voxels[ point ];
		
		var voxelRemoveEvent = new Logic.Event.Voxel.Remove( point, voxel );
		this.notifyObservers( voxelRemoveEvent );
		
		return true;
		
	},
	
	alterVoxelLife : function ( point, amount ) {
		
		var voxelAccessEvent = new Logic.Event.Voxel.Access( point );
		this.notifyObservers( voxelAccessEvent );
		
		var voxels = this.voxels( );
		
		if ( ! voxels.hasOwnProperty( point ) )
			return false;
		
		if ( ! amount )
			return true;
		
		var voxel = voxels[ point ];
		
		var beforeVoxelAlterLifeEvent = new Logic.Event.Voxel.AlterLife.Before( point, voxel, amount );
		this.notifyObservers( beforeVoxelAlterLifeEvent );
		
		if ( beforeVoxelAlterLifeEvent.isCanceled( ) )
			return false;
		
		voxel.setLife( voxel.life( ) - amount );
		
		var voxelAlterLifeEvent = new Logic.Event.Voxel.AlterLife( point, voxel, amount );
		this.notifyObservers( voxelAlterLifeEvent );
		
		return true;
		
	}
	
});
