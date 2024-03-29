/**
 * @author Florian 'Champii' Greiner
 */

/**
 * @class
 *
 * The LevelGenerator represent the Perlin Noise implementation.
 *
 * @toc Generator.LevelGenerator
 *
 */

//!requires:Generator
//!provides:Generator.LevelGenerator
//
//!requires:JS.Class

Generator.LevelGenerator = new JS.Class ({

  initialize: function (table) {
	this._table = table || this.makeTable( 255 );

	this.octaves = 20;
	this.frequency = 0.01;
	this.persistence = 0.45;
  },

  random: function () {
	return Math.random( );
  },

  makeTable: function ( size ) {
	var result = [ ];

	for ( var n = 0; n < size; ++ n )
		result[ n ] = this.random( );

	return result;
  },

  cosineInterpolate: function ( a, b, t ) {
	var c = ( 1 - Math.cos( t * Math.PI ) ) * 0.5;

	return ( 1 - c ) * a + c * b;
  },

  _randify : function ( n ) {
    return this._table[ Math.floor( n % this._table.length ) ];
  },

  _noise : function ( point ) {
    var value = 0;
    
    var dimensions = point.length;
    for (var dimension = 0; dimension < dimensions; ++ dimension )
      value = this._randify( Math.floor( value * 85000 ) + point[ dimension ] );
    
    return value;
  },

  _smooth : function ( point, dimension ) {
    if ( dimension < 0 )
      return this._noise( point );
    
    var value = point[ dimension ];
    var integer = Math.floor( value );
    var fractional = value - integer;
    
    point[ dimension ] = integer;
    var a = this._smooth( point, dimension - 1 );
    
    point[ dimension ] = integer + 1;
    var b = this._smooth( point, dimension - 1 );
    
    point[ dimension ] = value;
    
    return this.cosineInterpolate( a, b, fractional );
  },

  _perlin : function ( point ) {
    var value = 0;
    var amplitude = 1;
    
    var octaves = this.octaves;
    var frequency = this.frequency;
    var persistence = this.persistence;
    
    var copy = point.slice( );
    var dimensions = copy.length;
    
    for ( var i = 0; i < octaves; ++ i )
    {
      var t = i * 4096;
      
      for ( var dimension = 0; dimension < dimensions; ++ dimension )
	copy[ dimension ] = point[ dimension ] * frequency + t;
      
      value += this._smooth( copy, dimensions - 1 ) * amplitude;
      
      amplitude *= persistence;
      frequency *= 2;
    }
    
    var limiter = ( 1 - persistence ) / ( 1 - amplitude );
    return value * limiter;
  },

  _generate : function ( start, size, callback, dimension ) {
    if ( dimension < 0 )
      return callback( start, this._perlin( start ) );
    
    for ( var end = start[ dimension ] + size[ dimension ]; start[ dimension ] < end; ++ start[ dimension ] )
      this._generate( start, size, callback, dimension - 1 );
    
    start[ dimension ] -= size[ dimension ];
    return null;
  },

  /**
   * Generate a perlin noise in the given range and apply a callback
   *
   * @memberof Generator.LevelGenerator#
   *
   * @param {Array} start Start Array pos
   * @param {Array} size Array that contain size of generated noise
   * @param {Callback} callback Callback to apply on each point
   */
  
  generate : function ( start, size, callback ) {
    this._generate( start, size, callback, start.length - 1 );
  }

});

//if ( typeof ( exports ) !== 'undefined' )
//exports.LevelGenerator = Generator.LevelGenerator;
