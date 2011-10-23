//!provides:APP.DirtBlock.client
// 
//!requires:APP.Block.Client
//!requires:APP.DirtBlock
//!requires:JS.Singleton

global.APP.DirtBlock.client = new JS.Singleton(APP.Block.Client, {
	initialize: function () {
		var topData = 'data:image/png;base64,/9j/4AAQSkZJRgABAQIAJgAmAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/wAALCAAQABABAREA/8QAFgABAQEAAAAAAAAAAAAAAAAAAwAB/8QAHxAAAgICAgMBAAAAAAAAAAAAAQIDEQQSISIAEzEy/9oACAEBAAA/AGkUyaQ4+LCZJKVUBZHlKk7E185+ta7de32pRNnYZGPL61OisYwC2zNrGFJUko1c7UbN3YrzJVnglESrOquAsski9vW24C8jlQH54NEAc9QHCrj5T4MUE+PNGrFQWPeQAW7NqCeu1Cq/QoADz//Z';
		
		var top = new THREE.MeshBasicMaterial({ color: 0xff0000, map: THREE.ImageUtils.loadTexture(topData) });
		var bottom = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture(topData) });
		var sides = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture(topData) });
		
		this.materials = [
			sides,
			sides,
			top,
			bottom,
			sides,
			sides
		];
	}
});
