//!requires:Helpers
//!provides:Helpers.getFacesIdentifier

Helpers.getFacesIdentifier = function (faces) {
	
	return faces.px * 1 + faces.nx * 2 + faces.py * 4 + faces.ny * 8 + faces.pz * 16 + faces.nz * 32;
	
};
