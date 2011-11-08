//!provides:CameraApi
// 
//!requires:JS.Module

global.CameraApi = new JS.Module({
	
	createCamera: function () {
		
		var camera = new THREE.PerspectiveCamera(60, 1, .1, 20000);
		
		this.cameras = this.cameras || [];
		this.cameras.push(camera);
		this.scene.add(camera);
		
		return camera;
		
	},
	
	removeCamera: function (camera) {
		
		var index = this.cameras.indexOf(camera);
		
		if (index === -1) {
			
			this.cameras.slice(index, 1);
			this.scene.remove(camera);
			
		}
		
	},
	
	setCameraAngles: function (camera, pitch, yaw, roll) {
		
		camera.rotation.x = roll;
		camera.rotation.y = pitch;
		camera.rotation.z = yaw;
		
	},
	
	setCameraRoll: function (camera, roll) {
		
		camera.rotation.x = roll;
		
	},
	
	setCameraPitch: function (camera, pitch) {
		
		camera.rotation.y = pitch;
		
	},
	
	setCameraYaw: function (camera, yaw) {
		
		camera.rotation.z = yaw;
		
	},
	
	setCameraPosition: function (camera, x, y, z) {
		
		camera.position.x = x;
		camera.position.y = y;
		camera.position.z = z;
		
	},
	
	setCameraTarget: function (camera, x, y, z) {
		
		camera.lookAt(new THREE.Vector3(x, y, z));
		
	}
	
});
