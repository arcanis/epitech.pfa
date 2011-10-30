//!provides:Helpers.getStandardPersistor
// 
//!requires:Helpers
// 
//!uses:HardDrivePersistore
//!uses:WebStoragePersistore
//!uses:VolatilePersistor

global.Helpers.getStandardPersistor = function () {
	if (typeof(require) === 'function' && require('fs'))
		return HardDrivePersistor;
	if (typeof(window) !== 'undefined' && window.localStorage)
		return WebStoragePersistor;
	return VolatilePersistor;
};
