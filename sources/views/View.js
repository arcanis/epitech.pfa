//!provides:View
// 
//!requires:JS.class
// 
//!uses:View.Player
//!uses:View.Voxel
//!uses:Helpers.pointToString
//!uses:Helpers.mergeObjects

global.View = new JS.Class({
	initialize: function () {
		this.renderer = new THREE.WebGLRenderer();
		this.scene = new THREE.Scene();
		
		this.domElement = this.renderer.domElement;
		
		this.players = [];
		this.cameras = { hash: {}, stack: [] };
		this.voxels = {};
	},
	
	setSize: function (width, height) {
		this.renderer.setSize(width, height);
		
		var cameras = this.cameras;
		for (var i =  0, l = cameras.length; i < l; ++i) {
			var camera = cameras[i].object;
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
		}
	},
	
	fillConsole: function (text) {
	},
	
	clearConsole: function () {
	},
	
	createPlayer: function () {
		var players = this.players;
		
		var id = players.indexOf(null);
		if (id === -1) {
			id = players.length;
		}
		
		var geometry = GeometryManager.getPlayerGeometry();
		players[id] = new THREE.Mesh(geometry);
		
		return id;
	},
	
	createCamera: function () {
		var cameras = this.cameras;
		
		var id = cameras.indexOf(null);
		if (id === -1) {
			id = cameras.length;
		}
		
		var object = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
		cameras.store[id] = object;
		cameras.stack.unshift(id);
		
		this.scene.add(object);
		
		return id;
	},
	
	setVoxelProperties: function (position, properties) {
		var voxelID = position.toString();
		
		var voxels = this.voxels;
		if (!voxels.hasOwnProperty(voxelID) && !properties.hasOwnProperty('blockTypeID')) {
			voxels[voxelID] = BlockTypeManager.createBlockTypeMesh();
			this.outdated = true;
		}
		
		this.applyVoxelProperties(voxelID, properties);
	},
	
	setPlayerProperties: function (playerID, properties) {
		playerID = parseInt(playerID, 10);
		
		this.applyPlayerProperties(playerID, properties);
	},
	
	setCameraProperties: function (cameraID, properties) {
		cameraID = parseInt(cameraID, 10);
		
		this.applyCameraProperties(cameraID, properties);
	},
	
	removeVoxel: function (position) {
		var voxelID = position.toString();
		
		var voxels = this.voxels;
		if (voxels.hasOwnProperty(voxelID)) {
			voxels[voxelID] = null;
			delete this.voxels[voxelID];
			this.outdated = true;
		}
	},
	
	removePlayer: function (playerID) {
		playerID = parseInt(playerID, 10);
		
		var players = this.players;
		if (players.hasOwnProperty(playerID) && players[playerID] !== null) {
			this.players[playerID] = null;
			this.outdated = true;
		}
	},
	
	removeCamera: function (cameraID) {
		cameraID = parseInt(cameraID, 10);
		
		var cameras = this.cameras;
		var hash = cameras.hash, stack = cameras.stack;
		
		if (hash.hasOwnProperty(cameraID)) {
			this.scene.remove(hash[cameraID]);
			
			hash[cameraID] = null;
			delete cameras.hash[cameraID];
			
			stack.splice(stack.indexOf(cameraID), 1);
		}
	},
	
	applyCameraProperties: function (cameraID, properties) {
		var object = this.cameras.hash[cameraID];
		
		if (properties.hasOwnProperty('position')) {
			var position = properties.position;
			object.position = new THREE.Vector3(position.x, position.y, position.z);
		}
		
		if (properties.hasOwnProperty('rotation')) {
			var rotation = properties.rotation;
			object.rotation = new THREE.Vector3(rotation.x, rotation.y, rotation.z);
		}
	},
	
	applyVoxelProperties: function (voxelID, properties) {
		
	},
	
	applyPlayerProperties: function (playerID, properties) {
	}
});
