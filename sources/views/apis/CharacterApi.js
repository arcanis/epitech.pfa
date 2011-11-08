//!provides:CharacterApi
// 
//!requires:JS.Module

global.CharacterApi = new JS.Module({
	
	createCharacter: function (characterType) {
		
		var character = new characterType();
		
		this.scene.add(character.mesh);
		
		return character;
		
	},
	
	removeCharacter: function (character) {
		
		this.scene.remove(character.mesh);
		
	},
	
	setCharacterPosition: function (character, x, y, z) {
		
		character.setPosition(x, y, z);
		
	},
	
	getCharacterPosition: function (character) {
		
		return {
			x: character.position.x,
			y: character.position.y,
			z: character.position.z
		};
		
	},
	
	setCharacterOrientation: function (character, orientation) {
		
		character.setOrientation(orientation);
		character.orientation = orientation;
		
	},
	
	getCharacterOrientation: function (character) {
		
		return character.orientation;
		
	},
	
	moveCharacterFront: function (character, distance) {
		
		var position = character.getPosition();
		var orientation = character.getOrientation();
		
		var x = position.x + Math.sin(orientation) * distance;
		var y = position.y;
		var z = position.z + Math.cos(orientation) * distance;
		
		character.setPosition(x, y, z);
		
	},
	
	moveCharacterBack: function (character, distance) {
		
		this.moveCharacterFront(character, - distance);
		
	},
	
	strafeCharacterRight: function (character, distance) {
		
		var position = character.getPosition();
		var orientation = character.getOrientation();
		
		var x = position.x + Math.cos(orientation) * distance;
		var y = position.y;
		var z = position.z + Math.sin(orientation) * distance;
		
		character.setPosition(x, y, z);
		
	},
	
	strafeCharacterLeft: function (character, distance) {
		
		this.strafeCharacterRight(character, - distance);
		
	},
	
	turnCharacterLeft: function (character, rotation) {
		
		var orientation = character.getOrientation();
		
		character.setOrientation(orientation + rotation);
		
	},
	
	turnCharacterRight: function (character, rotation) {
		
		this.turnCharacterLeft(character, - rotation);
		
	}
	
});
