/**
 * @author Maël Nison
 */

//!provides:APP.VisualChunk
// 
//!requires:APP
//!requires:APP.Visual
//!requires:JS.Class
// 
//!uses:APP.VisualNode
//!uses:JS.Hash

/**
 * Représentation graphique d'un Chunk.
 * 
 * @class APP.VisualChunk
 * @extends APP.Visual
 */

global.APP.VisualChunk = new JS.Class(APP.Visual, {
	
	/**
	 * @constructor
	 */
	
	initialize: function (parent, chunk) {
		this.callSuper(parent);
		
		this.chunk = chunk;
		this.visualNodes = new JS.Hash();
		
		chunk.addObserver(this.method('chunkObserver'));
		this.onChunkInitializing();
	},
	
	/**
	 * Change la position du mesh (l'unité étant les dimensions d'un chunk).
	 * 
	 * Cette fonction marque l'objet comme devant être mis à jour.
	 * 
	 * @param {JS.Point} point Position du chunk.
	 */
	
	setPosition: function (point) {
		this.position = point;
		this.markAsOutdated();
	},
	
	/**
	 * Créer un nouveau VisualNode basé sur les paramètres indiqués.
	 * 
	 * Le VisualNode créé ne sera pris en compte dans le mesh du VisualChunk
	 * qu'après mise à jour de ce dernier.
	 * 
	 * Notez que cette fonction ne configure pas le noeud. Voir
	 * configurateVisualNode() pour cela.
	 * 
	 * @param {JS.Point} point       Position du node.
	 * @param {APP.Node} relatedNode Structure de données du node.
	 * 
	 * @todo Lancer une exception si un node existe déjà à la position indiquée.
	 */
	
	createVisualNode: function (point, relatedNode) {
		var visualNode = new APP.VisualNode(this, relatedNode);
		visualNode.setPosition(point);
		this.visualNodes.store(point, visualNode);
	},
	
	/**
	 * Active ou non les faces situées aux abords de la position indiquée en
	 * paramètre.
	 * 
	 * @param {JS.Point} point Position du node où les faces doivent être
	 *                         recalculées.
	 * 
	 * @todo Trouver une façon intelligente d'inliner ça ?
	 */
	
	configurateVisualNode: function (point) {
		var configurateFaces = function (n1, n2, f1, f2) {
			if (n1 && n1.faces[f1] !== (n2 === null))
				n1.faces[f1] = (n2 === null), n1.markAsOutdated();
			if (n2 && n2.faces[f2] !== (n1 === null))
				n2.faces[f2] = (n1 === null), n2.markAsOutdated();
		};
		
		var current = this.visualNodes.get(point);
		configurateFaces(current, this.visualNodes.get(point.px()), 'px', 'nx');
		configurateFaces(current, this.visualNodes.get(point.nx()), 'nx', 'px');
		configurateFaces(current, this.visualNodes.get(point.py()), 'py', 'ny');
		configurateFaces(current, this.visualNodes.get(point.ny()), 'ny', 'py');
		configurateFaces(current, this.visualNodes.get(point.pz()), 'pz', 'nz');
		configurateFaces(current, this.visualNodes.get(point.nz()), 'nz', 'pz');
	},
	
	/**
	 * Retire un VisualNode de la position indiquée.
	 * 
	 * Le VisualNode retiré ne sera réellement retiré du mesh du VisualChunk
	 * qu'après mise à jour de ce dernier.
	 * 
	 * @param {JS.Point} point Position du node.
	 * 
	 * @todo Lancer une exception si aucun chunk n'existe à la position
	 *       indiquée.
	 */
	
	removeVisualNode: function (point) {
		this.visualNodes.remove(point);
		this.markAsOutdated();
	},
	
	/**
	 * Fonction agissant comme intermédiaire entre la structure de données du
	 * chunk et les gestionnaires d'évènement de l'instance.
	 * 
	 * @private
	 * 
	 * @param {String} event Nom de l'évènement originel.
	 * @param {Object} data  Paramètres de l'évènement.
	 */
	
	chunkObserver: function (event, data) {
		var methodName = 'onChunk' + event.charAt(0).toUpperCase() + event.substr(1);
		this.method(methodName)(data);
	},
	
	/**
	 * Déclenché lors de la création du VisualChunk, ou lorsque la structure de
	 * données du chunk est totalement mise à jour.
	 * 
	 * @private
	 */
	
	onChunkInitializing: function () {
		this.visualNodes.clear();
		
		this.chunk.nodes.forEachPair(function (point, node) {
			this.createVisualNode(point, node);
		}, this);
		
		this.visualNodes.forEachKey(function (point) {
			this.configurateVisualNode(point);
		}, this);
	},
	
	/**
	 * Déclenché lorsqu'un unique node est rajouté dans la structure de données
	 * du chunk.
	 * 
	 * @private
	 * 
	 * @param {Object} data Paramètres de l'évènement.
	 * @param {JS.Point} data.point Position du nouveau node.
	 * @param {APP.Node} data.node Structure de données du node.
	 */
	
	onChunkAddNode: function (data) {
		this.createVisualNode(data.point, data.node);
		this.configurateVisualNode(data.point);
	},
	
	/**
	 * Déclenché lorsqu'un unique node est retiré de la structure de données du
	 * chunk.
	 * 
	 * @private
	 */
	
	onChunkRemoveNode: function (data) {
		this.removeVisualNode(data.point);
	},
	
	/**
	 * Implémentation de JS.Updatable#update(). Il créer un nouveau mesh en
	 * tenant compte des modifications effectuées sur les VisualNode enfants
	 * puis génère un évènement `update'.
	 * 
	 * @private
	 */
	
	update: function () {
		var threeGeometry = new THREE.Geometry();
		this.visualNodes.forEachValue(function (node) {
			THREE.GeometryUtils.merge(threeGeometry, node.threeMesh);
		});
		
		this.threeMesh = new THREE.Mesh(threeGeometry, new THREE.MeshFaceMaterial());
		this.threeMesh.matrix.setPosition(new THREE.Vector3(this.position.x, this.position.y, this.position.z).multiplySelf(new THREE.Vector3(APP.Config.get('Chunk width'), APP.Config.get('Chunk height'), APP.Config.get('Chunk depth'))).multiplyScalar(APP.Config.get('Cube size')));
		this.threeMesh.matrixAutoUpdate = false;
		
		this.callSuper();
	}
});
