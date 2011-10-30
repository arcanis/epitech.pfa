//!provides:View.Voxel
// 
//!requires:View

global.View.Voxel = new JS.Class({
	initialize: function (parent, position) {
		this.position = position;
	},
	
	setProperties: function (properties) {
		Helpers.mergeObjects(this.properties, properties);
		this.refreshMesh();
	},
	
	refreshMesh: function () {
		var blockType = BlockTypeManager.getBlockTypeByRealID(this.position.blockTypeRealID);
		var mesh = blockType.generate
	}
});
