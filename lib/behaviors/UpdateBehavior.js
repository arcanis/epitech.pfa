/**
 * @author Maël Nison
 */

/**
 * @mixin FUULIB.UpdateBehavior
 */

FUULIB.UpdateBehavior = /** @lends FUULIB.UpdateBehavior# */ {
	
	/**
	 * Parent object.
	 * 
	 * If the current instance is mark as updated, its parent as well.
	 */
	
	parent : null,
	
	/**
	 * Flag indicating if the current instance is up-to-date.
	 */
	
	upToDate : false,
	
	/**
	 * Mark recursively as updated.
	 */
	
	markAsUpdated : function () {
		this.parent && this.parent.markAsUpdated();
		this.upToDate = false;
	}
	
};