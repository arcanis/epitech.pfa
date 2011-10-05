/**
 * @author Maël Nison
 */

/**
 * @mixin TITANIA.EventBehavior
 */

TITANIA.EventBehavior = /** @lends TITANIA.EventBehavior# */ {
	
	/**
	 * Bind a listener on an event.
	 * 
	 * When the event will be triggered, every binded listeners will be called,
	 * with a parameter containing event datas.
	 * 
	 * @param {String}   event    Event name.
	 * @param {Function} callback Listener callback.
	 */
	
	on : function (event, callback) {
		if (!this.events)
			this.events = new Object();
		
		if (!(event in this.events))
			this.events[event] = new Array();
		
		this.events[event].push(callback);
	},
	
	/**
	 * Emit an event.
	 * 
	 * Call every listeners binded to this event, passing data as parameter.
	 * 
	 * @param {String} event Event name.
	 * @param {*}      data  Event data.
	 */
	
	emit : function (event, data) {
		if (!this.events)
			return ;
		
		if (!(event in this.events))
			return ;
		
		var callbacks = this.events[event];
		for (var u = 0, l = callbacks.length; u < l; ++u)
			callbacks[u](data);
	},
	
	/**
	 * Remove a binded listener.
	 * 
	 * If a listener is binded multiple time, only the first
	 * will be removed.
	 * 
	 * If the listener is not binded, nothing happens.
	 * 
	 * @todo Do not make bullshit if removeListener() is called during an emit
	 * @param {String}   event    Event name.
	 * @param {Function} callback Listener binded.
	 */
	
	removeListener : function (event, callback) {
		if (!this.events)
			return ;
		
		if (!(event in this.events))
			return ;
		
		var indexOf = this.events[event].indexOf(callback);
		if (indexOf === -1)
			return ;
		
		this.events[event].splice(indexOf, 1);
	}
	
};
