//!provides:JS.Updatable
//!requires:JS.Module

JS.Updatable = new JS.Module('Updatable', {
	setUpdatableParent: function (parent) {
		this.__updatableParent__ = parent;
	},
	
	addOutdatedChild: function (child) {
		this.__outdatedChildren__ = this.__outdatedChildren__ || [];
		this.__outdatedChildren__.push(child);
		
		this.markAsOutdated();
	},
	
	markAsOutdated: function () {
		if (this.__updatableParent__)
			this.__updatableParent__.addOutdatedChild(this);
		
		this.__isOutdated__ = true;
	},
	
	revalidate: function () {
		if (this.__isOutdated__) {
			var outdatedChildren = this.__outdatedChildren__;
			
			if (outdatedChildren) {
				for (var n = outdatedChildren.length; n--;)
					outdatedChildren[n].revalidate();
				this.__outdatedChildren__ = undefined;
			}
			
			this.update();
			this.__isOutdated__ = false;
		}
		
		return this;
	},
	
	update: function () {
	}
});
