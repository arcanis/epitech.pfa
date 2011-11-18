//!requires:View.Modules
//!provides:View.Modules.Debug
// 
//!requires:JS.Module

View.Modules.Debug = new JS.Module({
	
	activateAxes: function ( ) {
		
		this.scene.add( new THREE.Axes( ) );
		
	},
	
	activateLights: function ( ) {
		
		this.scene.add( new THREE.AmbientLight( 0xbbbbbb ) );
		this.scene.add( new THREE.PointLight( 0xffffff ) );
		
	}
	
});
