/**
 * @author Maël Nison
 */

//!provides:APP.VisualNode
// 
//!requires:APP
//!requires:APP.Visual
//!requires:JS.Class
// 
//!uses:APP.Config

/**
 * Représentation graphique d'un Node.
 * 
 * @class APP.VisualNode
 * @extends APP.Visual
 */

global.APP.VisualNode = new JS.Class(APP.Visual, {
	
	/**
	 * @constructor
	 */
	
	initialize: function (parent, node) {
		this.callSuper(parent);
		
		this.node = node;
		this.faces = { px: true, nx: true, py: true, ny: true, pz: true, nz: true };
		
		this.node.addObserver(this.method('nodeObserver'));
	},
	
	/**
	 * Change la position du mesh (l'unité étant les dimensions d'un node).
	 * 
	 * Cette fonction marque l'objet comme devant être mis à jour.
	 * 
	 * @param {JS.Point} point Position du node.
	 */
	
	setPosition: function (point) {
		this.position = point;
		this.markAsOutdated();
	},
	
	/**
	 * Fonction agissant comme intermédiaire entre la structure de données du
	 * node et les gestionnaires d'évènement de l'instance.
	 * 
	 * @private
	 * 
	 * @param {String} event Nom de l'évènement originel.
	 * @param {Object} data  Paramètres de l'évènement.
	 */
	
	nodeObserver: function (event, data) {
		var methodName = 'onNode' + event.charAt(0).toUpperCase() + event.substr(1);
		this.method(methodName)(data);
	},
	
	/**
	 * Implémentation de JS.Updatable#update(). Il créer un nouveau mesh en
	 * tenant compte des modifications effectuées sur les faces visibles du
	 * node, puis génère un évènement `update'.
	 */
	
	update: function () {
		this.threeMesh = this.node.type.client.createVisualNodeMesh(this);
		this.threeMesh.matrix.setPosition(new THREE.Vector3(this.position.x, this.position.y, this.position.z).multiplyScalar(APP.Config.get('Cube size')));
		this.threeMesh.matrixAutoUpdate = false;

		this.callSuper();
	}
});
