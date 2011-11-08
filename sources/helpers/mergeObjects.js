//!provides:Helpers.mergeObjects
// 
//!requires:Helpers

global.Helpers.mergeObjects = function (target, source) {
	
	for (var x in source) {
		
		if (source.hasOwnProperty(x)) {
			
			target[x] = source[x];
			
		}
		
	}
	
	return Helpers;
	
};
