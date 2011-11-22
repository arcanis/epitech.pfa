//!requires:Pipeline
//!provides:Pipeline.Base
// 
//!requires:JS.Class

Pipeline.Broadcast = new JS.Class('Pipeline.Broadcast', Pipeline.Object, {

	initialize: function ( pipeline ) {
		
		this.pipeline = pipeline;

	},


    /**
	 * @todo faire
	 */
    send: function ( command, message ) {

	    this.pipeline(command, message);

    }
});