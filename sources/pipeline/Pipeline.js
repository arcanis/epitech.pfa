//!provides:Pipeline
//
//!requires:JS.Class
//
//!uses:JS.Hash

/*
 * @class
 */
var Pipeline = new JS.Class({
	/*
	 * @constructor
	 */
	initialize: function () {
		this.commands = new JS.Hash();
	},

	/*
	 * @function
	 * 
	 * @param {String} command La command a envoyer
	 * @param {Object} message Data a envoyer
	 */
	sendCommand: function (command, message) {
	},

	/*
	 * @function
	 * 
	 * @param {String} command La command qui est renvoyé
	 * @param {Object} message Data recue
	 */
	receiveCommand: function (command, message) {
		if (this.commands.hasKey(command)) {
			var listCommands = this.commands.get(command);
			for (var i in listCommands) {
				if (typeof(listCommands[i]) !== 'undefined')
					listCommands[i](message);
			}
		}
	},

	/*
	 * @function
	 * 
	 * @param {String} command La command sur laquel il faut s'enregistrer
	 * @param {Function} func La fonction a executer a l'execution de la commande
	 */
	suscribeCommand: function (command, func) {
		if (!this.commands.hasKey(command))
			this.commands.store(command, new Array(func));
		else
			this.commands.get(command).push(func);
	},

	/*
	 * @function
	 * 
	 * @param {String} command La command sur laquel il faut s'enregistrer
	 * @param {Function} func La fonction a executer a l'execution de la commande
	 */
	unsuscribeCommand: function (command, func) {
		if (this.commands.hasKey(command)) {	
			var listCommands = this.commands.get(command);
			for (var i in listCommands) {
				if (listCommands[i] === func) {
					listCommands = listCommands.splice(i, i);
					break;
				}
			}
			if (!listCommands.length)
				this.commands.remove(command);
		}
	}
});
