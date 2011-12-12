//!provides:Main
// 
//!requires:JS.Singleton
// 
//!requires:Server.Local
// 
//!requires:Helpers.requestAnimationLoop
//!requires:Helpers.ifBrowserContext
//!requires:Helpers.ifNodeContext
//!requires:Value3
//!requires:View.Apis
//!requires:Pipeline.Multiplexer.Remote
// 
//!requires:Systems.Keyboard
//!requires:Systems.Display
// 
//!requires:TestMap
//!requires:View.Characters.Cube
//!requires:View.Voxels.Grass
//!requires:View.Voxels.Dirt

var Main = new JS.Singleton('Main', {
	node: function () {
	    var net = new Pipeline.Multiplexer.Remote(1234);
		console.log("Node code running.");
		
		var server = new Server.Local( );
		server.bootstrap( );
	},
	
	browser: function () {
		
		// var view = new View.Apis();
		// view.activateAxes();
		// view.activateLights();
		
		// var camera = view.createCamera();
		// var character = view.createCharacter(View.Characters.Cube);
		
		// var S = 100;
		// for (var x = 0; x < S; ++x) {
		// 	for (var z = 0; z < S; ++z) {
		// 		var Y = Math.floor( TestMap[ x ][ z ] * 8 );
		// 		for ( var y = 0; y < Y; ++y ) {
		// 			var type = y === Y - 1 ? View.Voxels.Grass : View.Voxels.Dirt;
		// 			view.setVoxelType(new Value3(x, y, z), type);
		// 		}
		// 	}
		// }
		
		// function updateCamera() {
		// 	var position = character.getPosition( );
		// 	var orientation = character.getPitchOrientation( );
			
		// 	///////////////////////////////
		// 	// Camera
		// 	///////////////////////////////
		// 	// 
		// 	// touch:
		// 	// 
		// 	// front       z
		// 	// back        s
		// 	// right       d
		// 	// left        q
		// 	// 
		// 	// turn right  e
		// 	// turn left   a
		// 	// 
		// 	// up          r
		// 	// down        f
		// 	// 
		// 	///////////////////////////////

		// 	// 3rd Person
		// 	//*
			
		// 	var cameraPosition = new Value3( ).copy( position );
		// 	cameraPosition.x -= ( Math.sin( orientation ) * 50 );
		// 	cameraPosition.y += 50;
		// 	cameraPosition.z -= ( Math.cos( orientation ) * 50 );
			
		// 	camera.setPosition( cameraPosition );
		// 	camera.lookAt( position );
			
		// 	//*/
			
		// 	// 1st Person
		// 	/*
		// 	view.setCameraPosition(camera, position);
		// 	view.setCameraPitch(camera, orientation);
		// 	//*/
		// 	//camera.setPosition({ x: 125, y: 125, z: 125 });
		// 	//camera.lookAt({ x: 0, y: 0, z: 0 });
		// }
		
		// var translationSpeed = 100;
		// var rotationSpeed = Math.PI / 2;
		
		// var commands = [
		// 	[ Systems.Keyboard.KEY_Z, function ( delta ) { character.moveFront( delta * translationSpeed ); } ],
		// 	[ Systems.Keyboard.KEY_S, function ( delta ) { character.moveBack( delta * translationSpeed ); } ],
		// 	[ Systems.Keyboard.KEY_Q, function ( delta ) { character.moveLeft( delta * translationSpeed ); } ],
		// 	[ Systems.Keyboard.KEY_D, function ( delta ) { character.moveRight( delta * translationSpeed ); } ],
		// 	[ Systems.Keyboard.KEY_A, function ( delta ) { character.setPitchOrientation( character.getPitchOrientation( ) + delta * rotationSpeed ); } ],
		// 	[ Systems.Keyboard.KEY_E, function ( delta ) { character.setPitchOrientation( character.getPitchOrientation( ) - delta * rotationSpeed ); } ],
		// 	[ Systems.Keyboard.KEY_R, function ( delta ) { character.moveUp( delta * translationSpeed ); } ],
		// 	[ Systems.Keyboard.KEY_F, function ( delta ) { character.moveDown( delta * translationSpeed ); } ]
		// ];
		
		// Helpers.requestAnimationLoop(function (delta) {

		// 	for ( var x = 0, l = commands.length; x < l; ++ x )
		// 	{
		// 		if ( Systems.Keyboard.check( commands[ x ][ 0 ] ) )
		// 		{
		// 			commands[ x ][ 1 ]( delta );
		// 		}
		// 	}
			
		// 	updateCamera( );
			
		// 	Systems.Display.render(view);
			
		// });
		    alert("test ?");
	    var net = new Pipeline.Remote("localhost");
		    alert("test ?2");
		console.log( "Browser code running." );
	},
	
	initialize: function ( ) {
		var that = this;
		
		Helpers.ifNodeContext(function ( ) {
			that.node( );
		});
		
		Helpers.ifBrowserContext(function () {
			window.addEventListener('load', function ( ) {
				that.browser( );
			}, false);
		});
	}
});
