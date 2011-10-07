/**
 * @author Maël Nison
 */

TITANIA.TestBlock = TITANIA.TestBlock || {};

(function () {
	
	TITANIA.ClassUtils.merge(TITANIA.TestBlock, {
		px : {
			opaque : true,
			material : new THREE.MeshBasicMaterial({ color : 0xff0000 })
		},
		nx : {
			opaque : true,
			material : new THREE.MeshBasicMaterial({ color : 0x00ff00 })
		},
		py : {
			opaque : true,
			material : new THREE.MeshBasicMaterial({ color : 0x0000ff })
		},
		ny : {
			opaque : true,
			material : new THREE.MeshBasicMaterial({ color : 0xffff00 })
		},
		pz : {
			opaque : true,
			material : new THREE.MeshBasicMaterial({ color : 0x00ffff })
		},
		nz : {
			opaque : true,
			material : new THREE.MeshBasicMaterial({ color : 0xff00ff })
		}
	});
	
}());
