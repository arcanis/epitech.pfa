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
					                             var object = JSON.parse(obj);
					                             this.receiveCommand(obj.command, obj.message);
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
		},

		/*
		 * @function
		 * 
		 * @param {String} command La command qui est renvoyé
		 * @param {Object} message Data recue
		 * @param {Number} pipeID L'ID du pipe
		 */
		receiveCommand: function (command, message, pipeID) {
			if (this.commands.hasKey(command)) {
				var listCommands = this.commands.get(command);
				for (var i in listCommands) {
					if (typeof(listCommands[i]) !== 'undefined')
						listCommands[i](pipeID, message);
				}
			}
		},
});
