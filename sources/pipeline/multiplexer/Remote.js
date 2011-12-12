//!requires:Pipeline.Multiplexer
//!provides:Pipeline.Multiplexer.Remote
//
//!requires:JS.Class
//!requires:Pipeline.Multiplexer.Base

/*
 * @class
 */

Pipeline.Multiplexer.Remote = new JS.Class(Pipeline.Multiplexer.Base, {

		/*
		 * @constructor
		 * 
		 * @param {String} port port ou le server doit ecouter
		 */

		initialize: function ( port) {

			this.callSuper();

			this.sockets = JS.Hash( );

			this.connectedClient = 0;

			this.pipeIDs = 0;

			var PipelineMultiplexer = this;

			var sockets = this.sockets;

			var connectedClient = this.connectedClient;

			this.io = require('socket.io').listen(port);

			this.io.sockets.on('connection', function (socket) {

				                   ++connectedClient;

				                   PipelineMultiplexer.sockets.store(pipeIDs, socket);

				                   socket.on('messages', function (obj) {
					                             var object = JSON.parse(obj);
					                             this.trigger(obj.command, obj.message);
				                             });

				                   socket.on('disconnect', function () {
					                             --PipelineMultiplexer.connectedClient;
					                             PipelineMultiplexer.sockets.remove(pipeIDs);
				                             });

				                   ++PipelineMultiplexer.pipeIDs;

			                   });

		}

});
