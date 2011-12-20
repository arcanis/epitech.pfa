//!requires:Server.Core.Loader
//!provides:Server.Core.Loader.Plugin
// 
//!requires:JS.Singleton
// 
//!uses:Server.Core.Loader.Event.Generated
//!uses:Server.Core.Loader.Event.Loaded
// 
//!uses:Logic.Event.Voxel.Access

Server.Core.Loader.Plugin = new JS.Class('Server.Core.Loader.Plugin', {
	
	extend : {
		
		attachServer : function ( server ) {
			
			new this( server );
			
		}
		
	},
	
	initialize : function ( server ) {
		
		this.server = server;
		
		this.server.logic.addObserver( this.method( 'observer' ) );
		
	},
	
	observer : function ( e ) {
		
		if ( e.klass == Logic.Event.Voxel.Access ) {
			
			var server = this.server;
			
			var logic = server.logic;
			
			var coord = e.coord( );
			
			if ( ! logic.voxels.hasOwnProperty( coord ) ) {
				
				var data;
				
				var chunkCoord = coord.clone( ).substractSelf( coord.clone( ).moduloScalar( 20 ) );
				
				var persistor = server.persistor;
				
				if ( persistor.has( coord ) ) {
					
					data = persistor.load( coord );
					
					var loadedEvent = new Server.Core.Loader.Event.Loaded( coord, data );
					server.notifyObservers( generatedEvent );
					
				} else {
					
					data = server.generator.generate( coord, 20 );
					persistor.save( coord, data );
					
					var generatedEvent = new Server.Core.Loader.Event.Generated( coord, data );
					server.notifyObservers( generatedEvent );
					
				}
				
				logic.injectVoxelChunk( chunkCoord, data );
				
			}
			
		}
		
	}
	
});
