//!requires:Storage
//!provides:Storage.adaptater
// 
//!uses:Storage.Volatile

Storage.adaptater = function ( ) {
	
	return new Storage.Volatile( );
	
};
