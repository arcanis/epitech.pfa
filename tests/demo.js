window.onload = function () {
	var universe = new TITANIA.Universe();
	universe.setWorld(new TITANIA.FlatWorld(TITANIA.TestBlock));
	
	var visualUniverse = new TITANIA.VisualUniverse(universe);
	
	// Full screen mode.
	visualUniverse.renderer.domElement.style.position = 'absolute';
	document.body.appendChild(visualUniverse.renderer.domElement);
	
	// Debug controls.
	new THREE.FirstPersonControls(visualUniverse.camera);
	
	// Debug axis.
	visualUniverse.scene.addObject(new THREE.Axes());
	
	// Resize handler.
	var resize = function () {
		visualUniverse.renderer.setSize(window.innerWidth, window.innerHeight);
		visualUniverse.camera.aspect = window.innerWidth / window.innerHeight;
	};
	
	// Rendering loop
	var render = function () {
		window.webkitRequestAnimationFrame(render);
		visualUniverse.render();
	};
	
	// Listen the window resize event.
	window.onresize = resize;
	
	// Boot !
	resize();
	render();
};
