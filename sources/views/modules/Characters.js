//!requires:View.Module
//!provides:View.Module.Characters
// 
//!requires:JS.Module

View.Module.Characters = new JS.Module({
	
	createCharacter : function ( characterType ) {
		
		var character = new characterType( );
		
		this.scene.add( character.object3D );
		
		return character;
		
	},
	
	removeCharacter : function ( character ) {
		
		this.scene.remove( character.object3D );
		
	}
	
});
