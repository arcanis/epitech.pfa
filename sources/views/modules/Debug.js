//!requires:View.Module
//!provides:View.Module.Debug
// 
//!requires:JS.Module

View.Module.Debug = new JS.Module({
	
	activateAxes : function ( ) {
		
		this.scene.add( new THREE.Axes( ) );
		
	},
	
	activateLights : function ( ) {
		
		this.scene.add( new THREE.AmbientLight( 0xbbbbbb ) );
		this.scene.add( new THREE.PointLight( 0xffffff ) );
		
	}
	
});
