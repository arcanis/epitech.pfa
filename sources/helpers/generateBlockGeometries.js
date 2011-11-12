//!requires:Helpers
//!provides:Helpers.generateBlockGeometries
// 
//!uses:Helpers.getFacesIdentifier

Helpers.generateBlockGeometries = function (materials) {
	
	var geometries = {};
	
	var faces = { px: 0, nx: 0, py: 0, ny: 0, pz: 0, nz: 0 };
	
	for (faces.px = 0; faces.px <= 1; ++faces.px) {
		
		for (faces.nx = 0; faces.nx <= 1; ++faces.nx) {
			
			for (faces.py = 0; faces.py <= 1; ++faces.py) {
				
				for (faces.ny = 0; faces.ny <= 1; ++faces.ny) {
					
					for (faces.pz = 0; faces.pz <= 1; ++faces.pz) {
						
						for (faces.nz = 0; faces.nz <= 1; ++faces.nz) {
							
							var identifier = Helpers.getFacesIdentifier(faces);
							
							geometries[identifier] = new THREE.CubeGeometry(10, 10, 10, 1, 1, 1, materials, faces);
							
						}
						
					}
					
				}
				
			}
			
		}
		
	}
	
	return geometries;
	
};

