/**
 * @author Maël Nison
 */

//!provides:APP.VisualUniverse
// 
//!requires:APP
//!requires:APP.Visual
//!requires:JS.Class
// 
//!uses:APP.VisualChunk
//!uses:JS.Hash

/**
 * Représentation graphique d'un Universe.
 * 
 * @class APP.VisualUniverse
 * @extends APP.Visual
 */

global.APP.VisualUniverse = new JS.Class(APP.Visual, {
	
	/**
	 * @constructor
	 */
	
	initialize: function (universe) {
		this.callSuper(null);
		
		this.universe = universe;
		this.visualChunks = new JS.Hash();
		
		this.universe.addObserver(this.method('universeObserver'));
		this.onUniverseInitializing();
	},
	
	/**
	 * Créer un nouveau VisualChunk basé sur les paramètres indiqués.
	 * 
	 * Le VisualChunk créé ne sera pris en compte dans le mesh du VisualUniverse
	 * qu'après mise à jour de ce dernier.
	 * 
	 * @param {JS.Point}  point        Position du chunk.
	 * @param {APP.Chunk} relatedChunk Structure de données du chunk.
	 * 
	 * @todo Lancer une exception si un chunk existe déjà à la position
	 *       indiquée.
	 */
	
	createVisualChunk: function (point, relatedChunk) {
		var visualChunk = new APP.VisualChunk(this, relatedChunk);
		visualChunk.setPosition(point);
		this.visualChunks.store(point, visualChunk);
	},
	
	/**
	 * Retire un VisualChunk de la position indiquée.
	 * 
	 * Le VisualNode retiré ne sera réellement retiré du mesh du VisualUniverse
	 * qu'après mise à jour de ce dernier.
	 * 
	 * @param {JS.Point} point Position du chunk.
	 * 
	 * @todo Lancer une exception si aucun chunk n'existe à la position
	 *       indiquée.
	 */
	
	removeVisualChunk: function (point) {
		this.visualChunks.remove(point);
		this.markAsOutdated();
	},
	
	/**
	 * Fonction agissant comme intermédiaire entre la structure de données
	 * de l'univers et les gestionnaires d'évènement du VisualUniverse.
	 * 
	 * @private
	 * 
	 * @param {String} event Nom de l'évènement originel.
	 * @param {Object} data  Paramètres de l'évènement.
	 */
	
	universeObserver: function (event, data) {
		var methodName = 'onUniverse' + event.charAt(0).toUpperCase() + event.substr(1);
		this.method(methodName)(data);
	},
	
	/**
	 * Déclenché lors de la création du VisualUniverse, ou lorsque la structure
	 * de données de l'universe est totalement mise à jour.
	 * 
	 * @private
	 */
	
	onUniverseInitializing: function () {
		this.universe.chunks.forEachPair(function (point, chunk) {
			this.createVisualChunk(point, chunk);
		}, this);
	},
	
	/**
	 * Déclenché lorsqu'un unique chunk est rajouté dans la structure de données
	 * de l'univers.
	 * 
	 * @private
	 * 
	 * @param {Object}    data Paramètres de l'évènement.
	 * @param {JS.Point}  data.point Position du nouveau chunk.
	 * @param {APP.Chunk} data.chunk Structure de données du chunk.
	 */
	
	onUniverseAddChunk: function (data) {
		this.createVisualChunk(data.point, data.chunk);
	},
	
	/**
	 * Déclenché lorsqu'un unique chunk est retiré de la structure de données de
	 * l'univers.
	 * 
	 * @private
	 * 
	 * @param {Object} data Paramètres de l'évènement.
	 * @param {JS.Point} data.point Position du chunk avant retrait.
	 */
	
	onUniverseRemoveChunk: function (data) {
		this.removeVisualChunk(data.point);
	},
	
	/**
	 * Implémentation de JS.Updatable#update(). Il créer un nouveau mesh en
	 * tenant compte des modifications effectuées sur les VisualChunk enfants,
	 * puis génère un évènement `update'.
	 * 
	 * @private
	 */
	
	update: function () {
		var threeGeometry = new THREE.Geometry();
		this.visualChunks.forEachValue(function (chunk) {
			THREE.GeometryUtils.merge(threeGeometry, chunk.threeMesh);
		});
		
		this.threeMesh = new THREE.Mesh(threeGeometry, new THREE.MeshFaceMaterial());
		
		this.callSuper();
	}
});
