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
		},

		/*
		* @function
		* 
		* @param {String} command La command a envoyer
		* @param {Object} message Data a envoyer
		*/
	    sendCommand: function (command, message) {
		    if (typeof(this.referent) !== 'undefined') {
			    this.referent.receiveCommand(command, message);
		    }
		    else
			    throw "LocalPipeline Class: sendCommand method: referent doesn't set";
		}
});
