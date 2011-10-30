//!provides:HardDrivePersistor
// 
//!requires:JS.Class
//!requires:Persistor

global.HardDrivePersistor = new JS.Class(Persistor, {
    save: function (hash, logic) {
	var fs = require('fs');
	buffer = JSON.stringify(logic);
	fd = fs.openSync(hash + '.sav.js', 'w', 0666);
	fs.writeSync(fd, buffer);
	fs.closeSync(fd);
    },

    load: function (hash, logic) {
    },

    has: function (hash) {
    }    
});

// dont forget return true or false