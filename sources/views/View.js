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
		this.camera = new THREE.PerspectiveCamera(60, 1, .1, 10000);
		this.scene = new THREE.Scene();
		
		this.domElement = this.renderer.domElement;
	},
	
	setSize: function (width, height) {
		this.renderer.setSize(width, height);
		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
	},
	
	fillConsole: function (text) {
	},
	
	clearConsole: function () {
	},
	
	createPlayer: function () {
		var id = this.playersID++;
		this.players[id] = new View.Player(this);
		return id;
	},
	
	createCamera: function () {
		var id = this.camerasID++;
		
		this.cameras.unshift({
			cameraID: id,
			object: new THREE.PerspectiveCamera(60, 1, .1, 1000)
		});
		
		return id;
	},
	
	setVoxelProperties: function (position, properties) {
		var voxelID = Helpers.pointToString(position);
		this.voxels[voxelID] = this.voxels[voxelID] || {};
		this.applyVoxelProperties(voxelID, properties);
	},
	
	setPlayerProperties: function (playerID, properties) {
		playerID = parseInt(playerID, 10);
		this.applyPlayerProperties(playerID, properties);
	},
	
	setCameraProperties: function (cameraID, properties) {
		cameraID = parseInt(cameraID, 10);
		var camerasList = this.cameras;
		if (camerasList.length >= 1 && camerasList[0].cameraID === cameraID) {
			Helpers.mergeObjects(camerasList[0].properties, properties);
			this.applyCameraProperties(properties);
		} else if (camerasList.length > 1) {
			for (var x = camerasList.length; --x > 0;) {
				if (camerasList[x].cameraID === cameraID) {
					Helpers.mergeObjects(camerasList[x].properties, properties);
					return ;
				}
			}
		}
	},
	
	removeVoxel: function (position) {
		var voxelID = Helpers.pointToString(position);
		if (this.voxels.hasOwnProperty(voxelID)) {
			this.voxels[voxelID].terminate();
			this.voxels[voxelID] = null;
			delete this.voxels[voxelID];
		}
	},
	
	removePlayer: function (playerID) {
		playerID = parseInt(playerID, 10);
		if (this.players.hasOwnProperty(playerID)) {
			this.players[playerID].terminate();
			this.players[playerID] = null;
			delete this.players[playerID];
		}
	},
	
	removeCamera: function (cameraID) {
		cameraID = parseInt(cameraID, 10);
		var camerasList = this.cameras;
		if (camerasList.length >= 1 && camerasList[0].cameraID === cameraID) {
			camerasList.shift();
			camerasList.length && this.applyCameraProperties(camerasList[0].properties);
		} else if (camerasList.length > 1) {
			for (var x = camerasList.length; --x > 0;) {
				if (camerasList[x].cameraID === cameraID) {
					camerasList.splice(x, 1);
					return ;
				}
			}
		}
	},
	
	applyCameraProperties: function (properties) {
	},
	
	applyVoxelProperties: function (voxelID, properties) {
	},
	
	applyPlayerProperties: function (playerID, properties) {
	}
});
