window.onload = function () {
	var universe = new TITANIA.Universe();
	universe.setWorld(new TITANIA.FlatWorld(TITANIA.TestBlock));
	
	var visualUniverse = new TITANIA.VisualUniverse(universe);
	visualUniverse.universe.world.requestChunk(0, 0, 0);
	
	// Full screen mode.
	visualUniverse.renderer.domElement.style.position = 'absolute';
	document.body.appendChild(visualUniverse.renderer.domElement);
	
	// Debug controls.
	var controls = new THREE.FirstPersonControls(visualUniverse.camera);
	controls.movementSpeed = 1000;
	controls.lookSpeed = 0.125;
	controls.lookVertical = true;
	
	// Debug axis.
	visualUniverse.scene.add(new THREE.Axes());
	
	// Resize handler.
	var resize = function () {
		visualUniverse.renderer.setSize(window.innerWidth, window.innerHeight);
		visualUniverse.camera.aspect = window.innerWidth / window.innerHeight;
	};
	
	// Rendering loop
	var render = function () {
		window.webkitRequestAnimationFrame(render);
		controls.update();
		visualUniverse.render();
	};
	
	// Listen the window resize event.
	window.onresize = resize;
	
	// Boot !
	resize();
	render();
};
