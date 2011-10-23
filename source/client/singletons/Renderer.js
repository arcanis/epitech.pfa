//!provides:APP.Renderer
//!requires:JS.Singleton

global.APP.Renderer = new JS.Singleton({
	initialize: function () {
		this.renderer = new THREE.WebGLRenderer();
		this.camera = new THREE.PerspectiveCamera(APP.Config.get('Field of view'));
		this.scene = new THREE.Scene();
		
		this.scene.add(new THREE.Axes());
		
		this.renderer.domElement.style.position = 'absolute';
		this.renderer.domElement.style.top = '0px';
		this.renderer.domElement.style.left = '0px';
		
		window.addEventListener('load', this.method('onWindowLoad'), false);
		window.addEventListener('load', this.method('onWindowResize'), false);
		window.addEventListener('resize', this.method('onWindowResize'), false);
		
		this.controls = new THREE.FirstPersonControls(this.camera);
		this.controls.movementSpeed = 1000;
		this.controls.lookSpeed = 0.125;
		this.lookVertical = true;
	},
	
	render: function () {
		this.controls.update();
		this.renderer.render(this.scene, this.camera);
	},
	
	onWindowLoad: function () {
		document.body.appendChild(this.renderer.domElement);
	},
	
	onWindowResize: function () {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
	}
});
