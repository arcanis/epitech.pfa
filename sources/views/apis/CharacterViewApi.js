//!provides:CharacterViewApi
// 
//!requires:JS.Module

global.CharacterViewApi = new JS.Module({
	
	createCharacter: function (characterType) {
		
		var character = new characterType();
		
		this.scene.add(character.mesh);
		
		return character;
		
	},
	
	removeCharacter: function (character) {
		
		this.scene.remove(character.mesh);
		
	},
	
	setCharacterPosition: function (character, x, y, z) {
		
		character.mesh.position.set(x, y, z);
		
	},
	
	getCharacterPosition: function (character) {
		
		var copy = new THREE.Vector3();
		
		copy.copy(character.mesh.position);
		
		return copy;
		
	},
	
	setCharacterOrientation: function (character, orientation) {
		
		character.mesh.rotation.y = orientation;
		
	},
	
	getCharacterOrientation: function (character) {
		
		return character.mesh.rotation.y;
		
	},
	
	moveCharacterFront: function (character, distance) {
		
		var mesh = character.mesh;
		
		mesh.matrixAutoUpdate && mesh.updateMatrix();
		
		mesh.translateZ(distance);
		
	},
	
	moveCharacterBack: function (character, distance) {
		
		this.moveCharacterFront(character, - distance);
		
	},
	
	strafeCharacterLeft: function (character, distance) {
		
		var mesh = character.mesh;
		
		mesh.matrixAutoUpdate && mesh.updateMatrix();
		
		mesh.translateX(distance);
		
	},
	
	strafeCharacterRight: function (character, distance) {
		
		this.strafeCharacterLeft(character, - distance);
		
	},
	
	turnCharacterLeft: function (character, rotation) {
		
		character.mesh.rotation.y += rotation;
		
	},
	
	turnCharacterRight: function (character, rotation) {
		
		this.turnCharacterLeft(character, - rotation);
		
	}
	
});
