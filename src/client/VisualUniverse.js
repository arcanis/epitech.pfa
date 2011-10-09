/**
 * @author Maël Nison
 */

/**
 * @class TITANIA.VisualUniverse
 * 
 * @mixes FUULIB.UpdateBehavior
 */

TITANIA.VisualUniverse =
	function (universe) {
		this.universe = universe;
		
		// Creating three.js objects.
		this.renderer = new THREE.WebGLRenderer();
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(60, undefined, 1, 20000);
		
		// Create a visual world if the world is set in the universe.
		if (universe.world)
			this.visualWorld = new TITANIA.VisualWorld(this, universe.world);
		else
			this.visualWorld = null;
	};

FUULIB.ClassUtils.mix
(TITANIA.VisualUniverse, FUULIB.UpdateBehavior);

/**
 * Renderer object.
 * 
 * @readonly
 */

TITANIA.VisualUniverse.prototype.renderer = null;

/**
 * Scene object.
 * 
 * @readonly
 */

TITANIA.VisualUniverse.prototype.scene = null;

/**
 * Camera object.
 * 
 * Be happy : that's one of the few instances that you can actualy edit !
 * 
 * If you set it to null, calls to render() will be ignored.
 */

TITANIA.VisualUniverse.prototype.camera = null;

/**
 * @readonly
 */

TITANIA.VisualUniverse.prototype.visualWorld = null;

/**
 * Update the visual universe.
 */

TITANIA.VisualUniverse.prototype.update =
	function () {
		// Cascading updating.
		this.visualWorld.upToDate || this.visualWorld.update();
		
		// Replacing old world mesh.
		this.worldMesh && this.scene.remove(this.worldMesh);
		this.worldMesh = this.visualWorld.mesh;
		this.worldMesh && this.scene.add(this.worldMesh);
		
		// Finaly, we reset the up-to-date flag.
		this.upToDate = true;
	};

/**
 * Update if necessary, then render the world.
 */

TITANIA.VisualUniverse.prototype.render =
	function () {
		if (this.camera) {
			this.upToDate || this.update();
			
			// Rendering scene
			this.renderer.render(this.scene, this.camera);
		}
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

/**
 * This function is meant to be binded to the worldSet event of the Universe
 * class.
 * 
 * @private
 * 
 * @param {Object}        worldSetData       Event data.
 * @param {TITANIA.World} worldSetData.world Universe world.
 */

TITANIA.VisualUniverse.prototype.worldSetEvent =
	function (worldSetData) {
		// Canceling the old world.
		this.visualWorld && this.visualWorld.free();
		this.visualWorld = null;
		
		// Creating the mesh representation of the world.
		this.visualWorld = new TITANIA.VisualWorld(this, worldSetData.world);
	};
