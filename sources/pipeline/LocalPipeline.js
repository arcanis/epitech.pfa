//!provides:LocalPipeline
//
//!requires:JS.Class
//!requires:Pipeline

/*
 * @class
 */
var LocalPipeline = new JS.Class(Pipeline, {
		/*
		 * @constructor
		 */
		initialize: function () {
			this.callSuper();			
		},

		/*
		 * @function
		 * 
		 * @param {Pipeline} referent Pipeline referent avec lequel communiquer
		 */
		setReferent: function (referent) {
			this.referent = referent;
		}
});
