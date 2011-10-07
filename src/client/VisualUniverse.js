/**
 * @author Maël Nison
 */

/**
 * @class TITANIA.VisualUniverse
 * @mixes TITANIA.UpdateBehavior
 */

TITANIA.VisualUniverse =
	function (universe) {
		this.universe = universe;
		
		// Creating three.js objects.
		this.renderer = new THREE.WebGLRenderer();
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera();
		
		// Creating the mesh representation of the world.
		this.visualWorld = new TITANIA.VisualWorld(this, universe.world);
		
		// Activating first person camera control.
		new THREE.FirstPersonControls(this.camera);
	};

TITANIA.ClassUtils.mix(TITANIA.VisualUniverse, TITANIA.UpdateBehavior);

/**
 * Update the visual universe.
 */

TITANIA.VisualUniverse.prototype.update =
	function () {
		// Cascading updating.
		this.visualWorld.upToDate || this.visualWorld.update();
		
		// Replacing old world mesh.
		this.scene.remove(this.worldMesh);
		this.worldMesh = this.visualWorld.mesh;
		this.scene.add(this.worldMesh);
		
		// Finaly, we reset the up-to-date flag.
		this.upToDate = true;
	};

/**
 * Update if necessary, then render the world.
 */

TITANIA.VisualUniverse.prototype.render =
	function () {
		this.upToDate || this.update();
		
		// Rendering scene
		this.renderer.render(this.scene, this.camera);
	};

/**
 * Remove any reference to external resources.
 * 
 * Object instance should not be used after this.
 * 
 * @todo implementation
 */

TITANIA.VisualUniverse.prototype.free =
	function () {
		throw new Error();
	};
