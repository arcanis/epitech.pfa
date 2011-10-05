var block = function () {
	return {
		px : {
			opaque : true,
			material : new THREE.MeshBasicMaterial({ color : 0xff0000 })
		},
		nx : {
			opaque : true,
			material : new THREE.MeshBasicMaterial({ color : 0xffff00 })
		},
		py : {
			opaque : true,
			material : new THREE.MeshBasicMaterial({ color : 0xff00ff })
		},
		ny : {
			opaque : true,
			material : new THREE.MeshBasicMaterial({ color : 0x00ff00 })
		},
		pz : {
			opaque : true,
			material : new THREE.MeshBasicMaterial({ color : 0x00ffff })
		},
		nz : {
			opaque : true,
			material : new THREE.MeshBasicMaterial({ color : 0x0000ff })
		}
	};
};

var flycam = function () {
	return {
		fov           : 60,
		aspect        : window.innerWidth / window.innerHeight,
		near          : 1,
		far           : 20000,
		movementSpeed : 1000,
		lookSpeed     : 0.125,
		noFly         : false,
		lookVertical  : true
	};
};
	  
window.onload = function () {
	var chunk = new TITANIA.Chunk();
	var client = new TITANIA.ChunkClient();
	client.attach(chunk);
	
	// Génération d'un chunk, doté d'un seul type de bloc.
	var type = block();
	var nodes = new TITANIA.StoreBehavior.Store3D(TITANIA.Config.CHUNK_WIDTH, TITANIA.Config.CHUNK_HEIGHT, TITANIA.Config.CHUNK_DEPTH);
	chunk.buffer(nodes.forEach(function (x, y, z) {
		if (x && y && z) return ;
		nodes.add(x, y, z, type);
	}));
	chunk.remove(0, 0, 0);
	
	var renderer = new THREE.WebGLRenderer();
	var scene = new THREE.Scene();
	var camera = null;
	
	renderer.domElement.style.position = 'absolute';
	document.body.appendChild(renderer.domElement);
	
	scene.addObject(new THREE.Trident());
	scene.addObject(client.mesh);
	
	var resize = function () {
		camera = new THREE.FirstPersonCamera(flycam());
		renderer.setSize(window.innerWidth, window.innerHeight);
	};
	
	var render = function () {
		window.webkitRequestAnimationFrame(render);
		renderer.render(scene, camera);
	};
	
	window.onresize = resize;
	
	resize();
	render();
};
