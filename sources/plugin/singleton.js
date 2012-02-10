//!provides:Plugin
// 
//!requires:JS.Singleton

global.Plugin = new JS.Singleton( 'Plugin', {
	
	initialize : function ( ) {
		
		this.store = { };
		
	},
	
	load : function ( name ) {
		
		if ( Plugin.hasOwnProperty( name ) ) {
			
			Plugin[ name ].load( this );
			
		} else {
			
			throw new Error( 'Plugin not found : ' + name + '.' );
			
		}
		
	},
	
	plug : function ( object ) {
		
		var store = this.store;
		
		for ( var klassName in store ) {
			
			if ( store.hasOwnProperty( klassName ) ) {
				
				var klassInfos = store[ klassName ];
				
				if ( object instanceof klassInfos.klass ) {
					
					var klassPlugins = klassInfos.plugins;
					
					for ( var t = 0, l = klassPlugins.length; t < l; ++ t ) {
						
						new klassPlugins[ t ]( object );
						
					}
					
				}
				
			}
			
		}
		
	},
	
	register : function ( klass, plugin ) {
		
		if ( ! this.store.hasOwnProperty( klass ) ) {
			
			this.store[ klass ] = {
				klass : klass,
				plugins : [ ]
			};
			
		}
		
		this.store[ klass ].plugins.push( plugin );
		
	}
	
} );
