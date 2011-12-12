//!requires:Helper
//!provides:Helper.getStandardPersistor
// 
//!uses:HardDrivePersistor
//!uses:VolatilePersistor
// uses:WebStoragePersistore

Helper.getStandardPersistor = function ( ) {
	if ( typeof ( require ) === 'function' && require( 'fs' ) )
		return HardDrivePersistor;
//	if (typeof(window) !== 'undefined' && window.localStorage)
//		return WebStoragePersistore;
	return VolatilePersistor;
};
