//!requires:View.Modules
//!provides:View.Modules.Cameras
// 
//!requires:JS.Module
// 
//!uses:View.Camera

View.Modules.Cameras = new JS.Module({
	
	createCamera: function () {
		
		var camera = new View.Camera();
		
		this.cameras.push(camera.object3D);
		this.scene.add(camera.object3D);
		
		return camera;
		
	},
	
	removeCamera: function (camera) {
		
		var index = this.cameras.indexOf(camera);
		
		if (index === -1) {
			
			this.cameras.slice(index, 1);
			this.scene.remove(camera);
			
		}
		
	}
	
});
