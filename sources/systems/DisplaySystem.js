//!provides:DisplaySystem
// 
//!requires:JS.Class

global.DisplaySystem = new JS.Class({
	
	initialize: function () {
		
		this.renderer = new THREE.WebGLRenderer();
		
		var domElement = this.renderer.domElement;
		domElement.style.position = 'absolute';
		domElement.style.top = domElement.style.left = '0';

		var updateSize = function () {
			
			this.size = [ window.innerWidth, window.innerHeight ];
			
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			
		}.bind(this);
		
		window.addEventListener('resize', updateSize, false);
		window.document.body.appendChild(this.renderer.domElement);
		
		updateSize();
	},
	
	render: function (view) {
		
		var size = this.size;
		view.renderOn(this.renderer, size[0], size[1]);
		
	}
	
});
