module.exports = {
    reporter: function (results) {
        var len = results.length;
	    if (len > 0) {
		    console.log(len + ' error' + (len !== 1 ? 's' : '') + ' found :');
		    results.forEach(function (result) {
			    var file = result.file;
			    var error = result.error;
			    console.log(file  + ': line ' + error.line + ', col ' + error.character + ', ' + error.reason);
		    });
	    }
    }
};
