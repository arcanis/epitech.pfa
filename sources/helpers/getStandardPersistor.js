//!provides:Helpers.getStandardPersistor
// 
//!requires:Helpers
// 
//!uses:HardDrivePersistor
//!uses:VolatilePersistor
//uses:WebStoragePersistore

global.Helpers.getStandardPersistor = function () {
	if (typeof(require) === 'function' && require('fs'))
		return HardDrivePersistor;
//	if (typeof(window) !== 'undefined' && window.localStorage)
//		return WebStoragePersistore;
	return VolatilePersistor;
};
