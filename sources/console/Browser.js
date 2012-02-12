//!requires:Console
//!provides:Console.Browser
// 
//!requires:JS.Class

Console.Browser = new JS.Class( 'Console.Browser', Console, {
	
	initialize : function ( ) {
		
		this.domElement = document.createElement( 'div' );
		
	},
	
	setSource : function ( source ) {
		
		if ( source != this._source ) {
			
			if ( this._source ) {
				
				this._source.removeObserver( this.method( '_observer' ) );
				
				this._source = null;
				
			}
			
			this._clear( );
			
			this._source = source;
			
			if ( this._source ) {
				
				this._fill( );
				
				this._source.addObserver( this.method( '_observer' ) );
				
			}
			
		}
		
	},
	
	_observer : function ( event ) {
		
		if ( event instanceof Output.Event.Clear ) {
			
			this._clear( );
			
		} else if ( event instanceof Output.Event.Drop ) {
			
			this._drop( );
			
		} else if ( event instanceof Output.Event.Append ) {
			
			this._append( event.message );
			
		}
		
	},
	
	_clear : function ( ) {
		
		var domElement = this.domElement;
		
		var childNodes = domElement.childNodes;
		
		while ( childNodes.length ) {
			
			domElement.removeChild( childNodes[ 0 ] );
			
		}
		
	},
	
	_drop : function ( ) {
		
		var domElement = this.domElement;
		
		if ( domElement.firstChild ) {
			
			domElement.removeChild( domElement.firstChild );
			
		}
		
	},
	
	_append : function ( message ) {
		
		var element = document.createElement( 'div' );
		element.appendChild( document.createTextNode( message.text ) );
		
		element.style.color = message.parameters.color;
		element.style.fontFamily = 'Lucida Console, Monaco, monospace';
		element.style.fontSize = '1.5em';
		element.style.fontWeight = 'bold';
		element.style.textShadow = 'black 1px 1px';
		
		this.domElement.appendChild( element );
		
	},
	
	_fill : function ( ) {
		
		var messages = this._source.messages;
		
		for ( var t = 0, l = messages.length; t < l; ++ t ) {
			
			this._append( messages[ t ] );
			
		}
		
	}
	
} );
