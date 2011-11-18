//!requires:Helpers
//!provides:Helpers.generateBlockGeometries
// 
//!uses:Helpers.getFacesIdentifier

Helpers.generateBlockGeometries = (function () {
	
	var getMaterialsList = function (materialsArray) {
		
		var materialsList = [];
		
		for (var t = 0; t < 6; ++t) {
			
			var material = materialsArray[t];
			
			if ( ! (material instanceof Array) ) {
				
				material = [ material ];
				
			}
			
			for (var n = 0, l = material.length; n < l; ++n) {
					
				if (materialsList.length <= n) {
					
					materialsList.push(new Array(6));
					
				}
				
				materialsList[n][t] = material[n];
				
			}
			
		}
		
		return materialsList;
		
	};
	
	var forEachFaceCombination = function (callback) {
		
		var faces = { px: 0, nx: 0, py: 0, ny: 0, pz: 0, nz: 0 };
		
		for (faces.px = 0; faces.px <= 1; ++faces.px) {
			
			for (faces.nx = 0; faces.nx <= 1; ++faces.nx) {
				
				for (faces.py = 0; faces.py <= 1; ++faces.py) {
					
					for (faces.ny = 0; faces.ny <= 1; ++faces.ny) {
						
						for (faces.pz = 0; faces.pz <= 1; ++faces.pz) {
							
							for (faces.nz = 0; faces.nz <= 1; ++faces.nz) {
								
								callback(faces);
								
							}
							
						}
						
					}
					
				}
				
			}
			
		}
		
	};
	
	return function ( materialsArray ) {
		
		var materialsList = getMaterialsList(materialsArray);
		
		var geometriesPacks = { };
		
		var materialGeometries = { };
		
		for ( var t = 0, l = materialsList.length; t < l; ++t ) {
			
			materialGeometries[t] = { };
			
		}
		
		forEachFaceCombination(function ( faces ) {
			var identifier = Helpers.getFacesIdentifier(faces);
			
			var pack = geometriesPacks[identifier] = [  ];
			for ( var t = 0, l = materialsList.length; t < l; ++t ) {
				
				var materials = materialsList[t];
				
				faces = {
					px: Boolean(faces.px && materials[0]),
					nx: Boolean(faces.nx && materials[1]),
					py: Boolean(faces.py && materials[2]),
					ny: Boolean(faces.ny && materials[3]),
					pz: Boolean(faces.pz && materials[4]),
					nz: Boolean(faces.nz && materials[5])
				};
				
				identifier = Helpers.getFacesIdentifier(faces);
				
				if ( identifier > 0 ) {
					
					if ( ! materialGeometries[t].hasOwnProperty(identifier) ) {
						
						materialGeometries[t][identifier] = new THREE.CubeGeometry(10, 10, 10, 1, 1, 1, materials, faces);
						
					}
					
					pack.push(materialGeometries[t][identifier]);
					
				}
				
			}
			
		});
		
		return geometriesPacks;
		
	};
	
}());
