//!provides:RemotePipeline
//
//!requires:JS.Class
//!requires:Pipeline

/*
 * @class
 */
var RemotePipeline = new JS.Class(Pipeline, {
		/*
		 * @constructor
		 * 
		 * @param {String} host IP ou nom de domaine du serveur a ce connecter
		 * 
		 * @todo Ajouter le protocol créé
		 * 
		 */
		initialize: function (host) {
			this.callSuper();
			this.socket = io.connect(host);
			var remote = this;
			this.socket.on('message', function (data) {
				               var object = JSON.parse(data);
				               remote.receiveCommand(object.command, object.message);
			               });
		},

		/*
		* @function
		* 
		* @param {String} command La command a envoyer
		* @param {Object} message Data a envoyer
		*/
		sendCommand: function (command, message) {
			this.socket.send(JSON.stringify({command: command, message: message}));
			this.callSuper(command, message);
		}
});
