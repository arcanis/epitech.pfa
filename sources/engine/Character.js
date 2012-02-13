//!requires:Engine
//!provides:Engine.Character
// 
//!requires:JS.Class

Engine.Character = new JS.Class( 'Engine.Character', {
	
	extend : {
		
		defaultGeometry : function ( ) {
			
			var geometry = new THREE.SphereGeometry( 10, 100, 100 );
			
			this.defaultGeometry = function ( ) {
				
				return geometry;
				
			};
			
			return geometry;
			
		},
		
		defaultMaterial : function ( ) {
			
			var material = new THREE.MeshBasicMaterial( { color : 0xffffff } );
			
			this.defaultMaterial = function ( ) {
				
				return material;
				
			};
			
			return material;
			
		}
		
	},
	
	initialize : function ( ) {
		
		this.threeElement = new THREE.Mesh( Engine.Character.defaultGeometry( ), Engine.Character.defaultMaterial( ) );
		
	},
	
	setProperties : function ( properties ) {
		
		for ( var x in properties ) {
			
			if ( properties.hasOwnProperty( x ) ) {
				
				this.setProperty( x, properties[ x ] );
				
			}
			
		}
		
	},
	
	setProperty : function ( name, value ) {
		
		if ( name === 'position' ) {
			
			this.threeElement.position.set( value[ 0 ], value[ 1 ], value[ 2 ] );
			
		}
		
	}
	
} );
