/**
 * @author Maël Nison
 */

TITANIA.DirtBlock = TITANIA.DirtBlock || new Object();

(function () {
	
	var top    = new THREE.MeshBasicMaterial({ map : THREE.ImageUtils.loadTexture('assets/blocks/dirt.top.jpg') });
	var bottom = new THREE.MeshBasicMaterial({ map : THREE.ImageUtils.loadTexture('assets/blocks/dirt.bottom.jpg') });
	var faces  = new THREE.MeshBasicMaterial({ map : THREE.ImageUtils.loadTexture('assets/blocks/dirt.faces.jpg') });
	
	TITANIA.ClassUtils.merge(TITANIA.DirtBlock, {
		px : {
			opaque : true,
			material : faces
		},
		nx : {
			opaque : true,
			material : faces
		},
		py : {
			opaque : true,
			material : top
		},
		ny : {
			opaque : true,
			material : bottom
		},
		pz : {
			opaque : true,
			material : faces
		},
		nz : {
			opaque : true,
			material : faces
		}
	});
	
}());
