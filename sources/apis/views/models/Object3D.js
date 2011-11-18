//!requires:View
//!provides:View.Object
// 
//!requires:JS.Class
// 
//!uses:Value3

View.Object = new JS.Class('View.Object3D', {
	
	setPosition: function (position) {
		
		this.object3D.position.copy(position);
		
	},
	
	getPosition: function ( ) {
		
		return new Value3().copy(this.object3D.position);
		
	},
	
	setXPosition: function ( x ) {
		
		this.object3D.position.x = x;
		
	},
	
	getXPosition: function ( ) {
		
		return this.object3D.position.x;
		
	},
	
	setYPosition: function ( y ) {
		
		this.object3D.position.y = y;
		
	},
	
	getYPosition: function ( ) {
		
		return this.object3D.position.y;
		
	},
	
	setZPosition: function ( z ) {
		
		this.object3D.position.z = z;
		
	},
	
	getZPosition: function ( ) {
		
		return this.object3D.position.z;
		
	},
	
	setOrientation: function ( orientation ) {
		
		this.object3D.rotation.copy( orientation );
		
	},
	
	getOrientation: function ( ) {
		
		return new Value3( ).copy( this.object3D.rotation );
		
	},
	
	setRollOrientation: function ( x ) {
		
		this.object3D.rotation.x = x;
		
	},
	
	getRollOrientation: function ( ) {
		
		return this.object3D.rotation.x;
		
	},
	
	setPitchOrientation: function ( y ) {
		
		this.object3D.rotation.y = y;
		
	},
	
	getPitchOrientation: function ( ) {
		
		return this.object3D.rotation.z;
		
	},
	
	setYawOrientation: function ( z ) {
		
		this.object3D.rotation.z = z;
		
	},
	
	getYawOrientation: function ( ) {
		
		return this.object3D.rotation.z;
		
	},
	
	move: function ( distance, axis ) {
		
		var object3D = this.object3D;
		
		object3D.matrixAutoUpdate && object3D.updateMatrix( );
		
		object3D.translate( distance, axis );
		
	},
	
	moveFront: function ( distance ) {
		
		this.move( distance, new THREE.Vector3( 0, 0, 1 ) );
		
	},
	
	moveBack: function ( distance ) {
		
		this.moveFront( - distance );
		
	},
	
	moveLeft: function ( distance ) {
		
		this.move( distance, new THREE.Vector3( 1, 0, 0 ) );
		
	},
	
	moveRight: function ( distance ) {
		
		this.moveLeft( - distance );
		
	},
	
	lookAt: function ( position ) {
		
		this.object3D.lookAt( new THREE.Vector3( ).copy( position ) );
		
	}
	
});
