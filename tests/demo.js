window.onload = function () {
	var universe = new TITANIA.Universe();
	var world = new TITANIA.FlatWorld(TITANIA.TestBlock);
	universe.setWorld(world);
	
	var visualUniverse = new TITANIA.VisualUniverse(universe);
	
	visualUniverse.universe.world.requestChunk(0, 0, 0);
	console.log(visualUniverse.visualWorld.stores.visualChunks.data['0,0,0'].visualChunk.stores.visualNodes);
	
	// Full screen mode.
	visualUniverse.renderer.domElement.style.position = 'absolute';
	document.body.appendChild(visualUniverse.renderer.domElement);
	
	// FPS widget
	var fps = new Stats();
	fps.domElement.style.position = 'absolute';
	fps.domElement.style.top = '0px';
	fps.domElement.style.left = '0px';
	document.body.appendChild(fps.domElement);
	
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
		visualUniverse.camera.updateProjectionMatrix();
	};
	
	// Rendering loop
	var render = function () {
		window.webkitRequestAnimationFrame(render);
		controls.update();
		visualUniverse.render();
		fps.update();
	};
	
	// Listen the window resize event.
	window.onresize = resize;
	
	// Boot !
	resize();
	render();
};
