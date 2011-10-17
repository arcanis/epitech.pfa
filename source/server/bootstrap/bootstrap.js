(function() {
    var $ = (typeof global === 'object') ? global : this;
    $.JSCLASS_PATH = __dirname + '/JSClass/';
	
	if (typeof require === 'function')
		require($.JSCLASS_PATH + '/loader');
	else if (typeof load === 'function')
		load($.JSCLASS_PATH + '/loader.js');
})();
