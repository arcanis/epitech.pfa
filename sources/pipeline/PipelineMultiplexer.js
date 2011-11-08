//!provides:PipelineMultiplexer
//
//!requires:JS.Class
//!requires:Pipeline
//
//!uses:JS.Hash

/*
 * @class
 */
var PipelineMultiplexer = new JS.Class(Pipeline, {
		/*
		 * @constructor
		 * 
		 * @param {Number} port Le numero du port a ecouter
		 */
		initialize: function (port) {
			this.callSuper();
			this.sockets = JS.Hash();
			this.connectedClient = 0;
			this.pipeIDs = 0;
			var PipelineMultiplexer = this;
			var pipeIDs = this.pipeIDs;
			var sockets = this.sockets;
			var connectedClient = this.connectedClient;
			this.io = require('socket.io').listen(port);
			this.io.sockets.on('connection', function (socket) {
				                   ++connectedClient;
				                   PipelineMultiplexer.sockets.store(pipeIDs, socket);
				                   socket.on('messages', function (obj) {
					                             alert(obj);
				                             });
				                   socket.on('disconnect', function () {
					                             --PipelineMultiplexer.connectedClient;
					                             PipelineMultiplexer.sockets.remove(pipeIDs);
				                             });
				                   ++PipelineMultiplexer.pipeIDs;
			                   });
		},

		/*
		 * @function
		 * 
		 * @param {Number} pipeID L'ID du pipe
		 * @param {String} command La command a envoyer
		 * @param {Object} message Data a envoyer
		 */
		sendCommand: function (pipeID, command, message) {
			if (this.sockets.hasKey(pipeID)) {
				var socket = this.sockets.get(pipeID);
				socket.emit(command, message);
			}
		}
});
