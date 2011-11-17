//!provides:CameraViewApi
// 
//!requires:JS.Module

global.CameraViewApi = new JS.Module({
	
	createCamera: function () {
		
		var camera = new THREE.PerspectiveCamera(60, 0, .1, 20000);
		
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
	
	setCameraAngles: function (camera, roll, pitch, yaw) {
		
		if (typeof (roll) === 'object') {
			
			this.setCameraAngles(camera, roll.roll, roll.pitch, roll.yaw);
			
		} else {
			
			camera.rotation.x = roll;
			camera.rotation.y = pitch;
			camera.rotation.z = yaw;
			
		}
		
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
		
		if (typeof (x) === 'object') {
			
			this.setCameraPosition(camera, x.x, x.y, x.z);
			
		} else {
			
			camera.position.x = x;
			camera.position.y = y;
			camera.position.z = z;
			
		}
		
	},
	
	setCameraTarget: function (camera, x, y, z) {
		
		if (typeof (x) === 'object') {
			
			this.setCameraTarget(camera, x.x, x.y, x.z);
			
		} else {
			
			camera.matrixAutoUpdate && camera.updateMatrix();
			
			camera.lookAt(new THREE.Vector3(x, y, z));
			
		}
		
	},
	
	moveCameraFront: function (camera, distance) {
		
		camera.matrixAutoUpdate && camera.updateMatrix();
		
		camera.translateZ(- distance);
		
	},
	
	moveCameraBack: function (camera, distance) {
		
		this.moveCameraFront(camera, - distance);
		
	}
	
});
